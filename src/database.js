import Client from 'mariasql';

const database = 'lfsDieteticsApp';
const table = 'Applicants';

let c = new Client({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    db: database
});

c.on('connect', () => console.log('Client connected'))
    .on('error', (err) => console.log('Client error: ' + err))
    .on('close', (hadError) => console.log('Client closed'));

let form = {};
let cwl = '';
let ubcsn = '';

const queryApplicant = (user, callback) => {
    profileID = user.id
    const sql = `SELECT * FROM APPLICANTS WHERE ID=${profileID};`;
    c.query(sql, function (error, results) {
        if (error) {
            callback(error);
        }
        if (results.info.numRows === 1) {
            callback({ filledForm: true });
        }
        else {
            callback({ filledForm: false });
        }
    });
}

const getPin = (arr, callback) => {
    const sql = `SELECT * FROM APPLICANTS WHERE ID=${profileID};`;
    c.query(sql, function (error, results) {
        if (error) {
            callback(error);
        }
        if (results.info.numRows === 1) {
            callback({ filledForm: true });
        }
        else {
            callback({ filledForm: false });
        }
    });
}


const insertQuery = (arr) => {
    const today = new Date();
    const getDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    profile = arr;
    const query = `INSERT INTO ${table} VALUES ('${arr.firstName}', '${arr.lastName}', '${arr.id}', '${arr.phone}', '${arr.email}', '${arr.numOfApp}', '${arr.aboriginal}', '${arr.aborId}', null, '${getDate}');`
    console.log(query)
    c.query(query, function (err, rows) {
        if (err)
            throw err;
        console.dir(rows);
    });
}

const checkPin = (pin, callback) => {
    const query = `SELECT * FROM ${table} WHERE ID='${pin}'`;
    const updateQuery = `UPDATE Applicants SET ApplicationNumber = '${pin}' WHERE ID = '${profileID}';`
    console.log(profileID)
    console.log(pin)

    c.query(query, (err, res) => {
        if (err) {
            callback(err);
            return;
        }
        c.query(updateQuery, (err, res2) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, res2);
        })
    })
}

export {
    queryApplicant,
    getPin,
    insertQuery,
    checkPin,
}
