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
    const id = profile.shibSN;
    const sql = `SELECT * FROM ${table} WHERE CWL='${cwl}' AND ID=${id};`;
    c.query(sql, (error, results) => {
        if (error) {
            callback(null, { filledForm: false, ApplicationNumber: '' });
        }
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
    Number(("18" + Math.floor(1000 + Math.random() * 9000)))
)

const validatePin = (pinArray) => {
    let uniquePin = pinGen()
    while (pinArray.some(num => num === uniquePin)) {
        uniquePin = pinGen()
    }
    return uniquePin;
}

const fillForm = (form, filePath, profile, callback) => {
    getPins((err, result) => {
        if (err) {
            console.log(err)
        } else {
            const existPins = [];
            if (result.length >= 1) {
                result.forEach(app => {
                    existPins.push(Number(app.ApplicationNumber))
                })
            }
            const pin = validatePin(existPins)
            const query = `INSERT INTO ${table} VALUES ('${profile.cwl}', ${profile.shibSN}, '${profile.shibFirstName}', 
                                                        '${profile.shibLastName}', '${form.firstName}', '${form.lastName}',
                                                        ${form.id}, '${form.phone}', '${form.email}', '${form.numOfApp}', 
                                                        '${form.aboriginal}', '${form.aborId}', ${pin}, '${form.date}');`
            c.query(query, function (error, rows) {
                if (error) {
                    callback(null, { type: 'error', filledForm: false });
                } else if (rows.affectedRows === 1) {
                    callback(null, { type: 'render', filledForm: true });
                }
                else {
                    callback(null, { type: 'error', filledForm: false });
                }
            });
        }
    })
}

const fillFilePath = (file, cred, callback) => {

}

export {
    findApp,
    fillForm,
}
