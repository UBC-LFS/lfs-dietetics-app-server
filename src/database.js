import mysql from 'mysql';
require('dotenv').config()

const database = 'lfsDieteticsApp';
const table = 'Applicants';

const c = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : database
  });

c.connect();

const findApp = (profile, callback) => {
    const cwl = profile.cwl;
    const id = profile.id;
    const sql = `SELECT * FROM ${table} WHERE CWL='${cwl}' AND ID=${id};`;
    c.query(sql, (error, results) => {
        if (error) {
            callback(error);
        }
        console.log(results)
        console.log(results.length)
        if (results.length === 1) {
            callback(null, { filledForm: true, ApplicationNumber: (results[0].ApplicationNumber) });
        }
        else {
            callback(null, { filledForm: false, ApplicationNumber: '' });
        }
    });
}

const getPins = (callback) => {
    const query = `SELECT ApplicationNumber FROM ${table};`;
    c.query(query, (err, res) => {
        if (err) {
            callback(err);
            return;
        } else {
            callback(null, res);
        }
    })
}

const pinGen = () => (
    ("18" + Math.floor(1000 + Math.random() * 9000)).toString()
)

const validatePin = (pinArray) => {
    let uniquePin = pinGen()
    while (pinArray.some(num => num === uniquePin)) {
        uniquePin = pinGen()
    }
    return uniquePin;
}

const fillForm = (form, cred, callback) => {
    getPins((err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length >= 1) {
                const existPins = [];
                result.forEach(app => {
                    existPins.push(app.ApplicationNumber)
                })
                const pin = validatePin(existPins)
                const query = `INSERT INTO ${table} VALUES ('${cred.cwl}', '${form.firstName}', '${form.lastName}',
                                ${cred.id}, '${form.phone}', '${form.email}', '${form.numOfApp}', '${form.aboriginal}', 
                                '${form.aborId}', ${parseInt(pin)}, '${form.date}');`
                c.query(query, function (error, rows) {
                    if (error) {
                        callback(error);
                    }
                    if (rows.affectedRows === 1) {
                        callback(null, { filledForm: true });
                    }
                    else {
                        callback(null, { filledForm: false });
                    }
                });
            }
        }
    })
}

export {
    findApp,
    fillForm,
}
