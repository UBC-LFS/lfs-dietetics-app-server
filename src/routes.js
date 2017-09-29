import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { findApp, fillForm } from './database';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    const timeStamp = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    cb(null, `${req.body.id}-${req.body.firstName}-${req.body.lastName}-${timeStamp}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 11000000 },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.pdf' && path.extname(file.originalname) !== '.docx' &&
      path.extname(file.originalname) !== '.doc' && path.extname !== '.jpeg' && path.extname(file.originalname) !== '.jpg') {
      return cb(new Error('Unsupported file format'))
    }
    return cb(null, true)
  }
});

const routes = Router();
const userUpload = upload.single('files')

routes.get('/api/login', (req, res) => {
  const profile = {
    cwl: req.headers.cwlloginname,
    shibSN: req.headers.studentnumber,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn
  };
  //const profile = { cwl: 'unreg', shibSN: 349274 }
  findApp(profile, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

routes.post('/api/form', (req, res) => {
  const profile = {
    cwl: req.headers.cwlloginname,
    shibSN: req.headers.studentnumber,
    shibFirstName: req.headers.givenname,
    shibLastName: req.headers.sn
  };
  //const profile = { cwl: 'unreg', shibSN: 349274, shibFirstName: 'Patrck', shibLastName: 'Lin' };
  userUpload(req, res, (err) => {
    if (err) {
      res.send({ type: 'error', msg: err })
    }
    else {
      fillForm(req.body, req.file.path, profile, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
          res.sendStatus(200)
        }
      })
    }
  })
})

export default routes;