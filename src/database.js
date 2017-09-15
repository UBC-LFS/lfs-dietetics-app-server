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

const insertQuery = (arr) => {
    console.log(arr)
    const today = new Date();
    const getDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const query = `INSERT INTO ${table} VALUES ('${arr.firstName}', '${arr.lastName}', '${arr.id}', '${arr.phone}', '${arr.email}', '${arr.numOfApp}', '${arr.aboriginal}', '${arr.aborId}', null, '${getDate}');`
    console.log(query)
    c.query(query, function (err, rows) {
        if (err)
            throw err;
        console.dir(rows);
    });

    c.end(); 
}

export {
    insertQuery
}
