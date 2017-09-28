import { Router } from 'express';
import { findApp, fillForm } from './database';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/../uploads/')
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
      return cb(new Error('Unsupported file format'))
    }
    return cb(null, true)
  }
});

const routes = Router();

routes.get('/api/login', (req, res) => {
  const profile = {
    cwl: req.headers.cwlloginname, shibSN: req.headers.studentnumber,
    shibFirstName: req.headers.givenname, shibLastName: req.headers.sn
  };
  //const profile = { cwl: 'unreg', id: 349274 }
  findApp(profile, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

const userUpload = upload.single('files')

routes.post('/api/form', (req, res) => {
  const credentials = { cwl: req.headers.cwlloginname, id: req.headers.studentnumber };
  userUpload(req, res, (err) => {
    if (err) {
      console.log(err)
    }
  })
  //const credentials = { cwl: 'unreg', id: 349274 };
  fillForm(req.body, credentials, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.sendStatus(200)
    }
  })
})

export default routes;