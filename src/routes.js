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
  //const profile = { cwl: 'unreg', shibSN: 349274, shibFirstName: 'Patrck', shibLastName: 'Lin' }
  findApp(profile, (err, result) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(result)
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
      res.status(404).send({ type: 'error', msg: err })
    }
    else {
      fillForm(req.body, req.file, profile, (err, result) => {
        if (err)
          res.status(404).send(err)

        result.type === 'error' ? res.status(404).send(result) : res.status(200).send(result)
      })
    }
  })
})

export default routes;
