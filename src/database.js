import mysql from 'mysql';
require('dotenv').config()

const table = 'Applicants';

const c = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

c.connect();

const findApp = (profile, callback) => {
    const cwl = profile.cwl;
    let shibSN = profile.shibSN;
    const sql = `SELECT * FROM ${table} WHERE CWL='${cwl}' AND ShibStudentNumber='${shibSN}';`;
    console.log(sql)
    c.query(sql, (error, results) => {
        if (error || typeof results === 'undefined') {
            callback(null, { type: 'error', filledForm: false, ApplicationNumber: '' });
        } else {
            results.length === 1 ? callback(null, { type: 'render', filledForm: true, ApplicationNumber: (results[0].ApplicationNumber) }) : callback(null, { type: 'render', filledForm: false, ApplicationNumber: '' });
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
    Number(("18" + Math.floor(1000 + Math.random() * 9000)))
)

const validatePin = (pinArray) => {
    let uniquePin = pinGen()
    while (pinArray.some(num => num === uniquePin)) {
        uniquePin = pinGen()
    }
    return uniquePin;
}

const fillForm = (form, file, profile, callback) => {
    getPins((err, result) => {
        if (err) {
            callback(err, { type: 'error', filledForm: false, ApplicationNumber: '' });
        } else {
            const existPins = [];
            if (typeof result.length === 'undefined') {
                if (result.length >= 1) {
                    result.forEach(app => {
                        existPins.push(Number(app.ApplicationNumber))
                    })
                }
            }
            const pathArray = []
            const pin = validatePin(existPins)
            typeof file !== 'undefined' ? pathArray.push(file.path) : pathArray.push('')
            const query = `INSERT INTO ${table} VALUES ('${profile.cwl}', '${profile.shibSN}', '${profile.shibFirstName}', 
                                                        '${profile.shibLastName}', '${form.firstName}', '${form.lastName}',
                                                        ${form.id}, '${form.phone}', '${form.email}', '${form.birthday}', 
                                                        '${form.numOfApp}', '${form.aboriginal}', '${form.aborId}', ${pin}, '${pathArray[0]}', '${form.date}');`
            c.query(query, function (error, rows) {
                if (typeof rows.affectedRows === 'undefined') {
                    callback(null, { type: 'error', filledForm: false, ApplicationNumber: '' });
                }
           
                rows.affectedRows === 1 ? callback(null, { type: 'render', filledForm: true, ApplicationNumber: pin }) : callback(null, { type: 'error', filledForm: false, ApplicationNumber: '' });
                
            });
        }
    })
}

export {
    findApp,
    fillForm,
}
