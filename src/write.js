import json2csv from 'json2csv';
import fs from 'fs';

const createCsv = (arr) => {
    var fields = ['First Name', 'Last Name', 'UBC Student Number']
    var myCars = [
        {
          "First Name": "Audi",
          "Last Name": 40000,
          "UBC Student Number": "blue"
        }, {
          "First Name": "BMW",
          "Last Name": 35000,
          "UBC Student Number": "black"
        }
      ];
      var csv = json2csv({ data: myCars, fields: fields });
      
      fs.writeFile('file.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
      });
}

const write = (arr) => {
    createCsv(arr)
}

export {
    write
}