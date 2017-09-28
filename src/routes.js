import { Router } from 'express';
import { findApp, fillForm } from './database';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    cb(null, `${req.body.firstName}-${req.body.lastName}-${req.body.id}-${timeStamp}` + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.minetype !== ('application/pdf' ||
      'application/mswordapplication/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      'image/jpeg')) {
      return cb(null, false, new Error('Unsupported file format'))
    }
  }
});

const routes = Router();

routes.get('/api/login', (req, res) => {
  const user = {
    cwl: req.headers.cwlloginname,
    employeeNumber: req.headers.studentnumber,
    name: req.headers.sn + " " + req.headers.givenname
  }
  console.log(user)
  
  console.log('hit api login')
  //get profile from shib
  const profile = { cwl: 'aLiu', id: 654 };
  findApp(profile, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

routes.post('/api/form', upload.single('files'), (req, res) => {
  const user = {
    cwl: req.headers.cwlloginname,
    employeeNumber: req.headers.studentnumber,
    name: req.headers.sn + " " + req.headers.givenname
  }
  console.log(user)
  const credentials = { cwl: 'unreg', id: 5434373 };

  fillForm(req.body, credentials, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.sendStatus(200)
    }
  })

  // check to see that file got written successfully
})

// routes.post('/api/file', (req, res) => {

//   const credentials = { cwl: 'unreg', id: 5434373 }
//   console.log(req.body)


export default routes;