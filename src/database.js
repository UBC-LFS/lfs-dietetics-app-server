const fs = require('fs');
const mysql = require('mysql2');

require('dotenv').config()

const table = 'Applicants'

const c = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync('./certs/ca-cert.pem')
  }
});

const findApp = (profile, callback) => {
  const cwl = profile.cwl
  let shibSN = profile.shibSN
  const sql = `SELECT * FROM ${table} WHERE CWL='${cwl}' AND ShibStudentNumber='${shibSN}';`
  c.getConnection((err, connection) => {
    if (err) throw err
    connection.query(sql, (error, results) => {
      if (error || typeof results === 'undefined') {
        callback(null, { type: 'sql-error', filledForm: false, ApplicationNumber: '' })
      } else {
        results.length === 1 ? callback(null, { type: 'render', filledForm: true, ApplicationNumber: (results[0].ApplicationNumber) }) : callback(null, { type: 'render', filledForm: false, ApplicationNumber: '' })
      }
    })
    connection.release()
  })
}

const getPins = (callback) => {
  const query = `SELECT ApplicationNumber FROM ${table};`
  c.getConnection((err, connection) => {
    if (err) throw err
    connection.query(query, (err, res) => {
      if (err) {
        callback(err)
      } else {
        callback(null, res)
      }
    })
    connection.release()
  })
}

const pinGen = () => (
    Number(('24' + Math.floor(1000 + Math.random() * 9000)))
)

const validatePin = (pinArray) => {
  let uniquePin = pinGen()
  while (pinArray.some(num => num === uniquePin)) {
    uniquePin = pinGen()
  }
  return uniquePin
}


const fillForm = (form, file, profile, callback) => {
  getPins((err, result) => {
    if (err) {
      callback(err, { type: 'error', filledForm: false, ApplicationNumber: '' })
    } else {
      const existPins = []
      if (typeof result.length !== 'undefined') {
        if (result.length >= 1) {
          result.forEach(app => {
            existPins.push(Number(app.ApplicationNumber))
          })
        }
      }
      const pathArray = []
      const pin = validatePin(existPins)
      typeof file !== 'undefined' ? pathArray.push(file.path) : pathArray.push('')

      const query = `INSERT INTO ${table} VALUES ('${profile.cwl}', '${profile.shibSN}', '${profile.shibFirstName}', '${profile.shibLastName}', '${form.firstName}', '${form.lastName}', '${form.id}', '${form.currentInstitution}', '${form.phone}', '${form.UBCEmail}', '${form.email}', '${form.birthday}', '${form.firstApp}', '${form.numOfApp}', '${form.aboriginal}', '${form.aborId}', '${pin}', '${pathArray[0]}', '${form.date}');`

      c.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, function (error, rows) {
          console.log(error, rows)
          if (error) { callback(null, { type: 'sql-error', filledForm: false, ApplicationNumber: '' }) }
          if (typeof rows.affectedRows === 'undefined') {
            callback(null, { type: 'sql-error', filledForm: false, ApplicationNumber: '' })
          }
          rows.affectedRows === 1 ? callback(null, { type: 'render', filledForm: true, ApplicationNumber: pin }) : callback(null, { type: 'error', filledForm: false, ApplicationNumber: '' })
        })
          connection.release();
      })
    }
  })
}


// Helper functions to validate inputs
function validateInputs(cwl, shibSN, shibFirstName, shibLastName, firstName, lastName, currentInstitution, date) {
  if (cwl == null || cwl.length == 0
      || shibSN == null || shibSN.length == 0
      || shibFirstName == null || shibFirstName.length == 0
      || shibLastName == null || shibLastName.length == 0
      || firstName == null || firstName.length == 0
      || lastName == null || lastName.length == 0
      || currentInstitution == null || currentInstitution.length == 0
      || date == null || date.length == 0) {
    return false;
  }
  return true;
}

function validateEmail(email) {
  if (email == null || email.length == 0) return true;

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export {
    findApp,
    fillForm
}
