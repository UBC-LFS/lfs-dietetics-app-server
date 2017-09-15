var Client = require('mariasql');

var c = new Client({
    host: '127.0.0.1',
    user: 'root',
    password: ''
});

c.on('connect', () => console.log('Client connected'))
    .on('error', (err) => console.log('Client error: ' + err))
    .on('close', (hadError) => console.log('Client closed'));

c.query('SHOW DATABASES', function (err, rows) {
    if (err)
        throw err;
    console.dir(rows);
});

c.end();