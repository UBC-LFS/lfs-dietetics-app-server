import { Router } from 'express';
import { findApp, fillForm } from './database'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) =>{
    cb(null, file.originalname)
  }
})

const upload = multer({ 
  storage,
  filterFilter: (req, file, cb) => {
    if (file.minetype !== ('application/pdf' || 
      'application/mswordapplication/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      'image/jpeg')) {
        return cb(null, false, new Error('Unsupported file format'))
      }
  }
 });

const routes = Router();

routes.get('/api/login', (req, res) => {
  //get profile from shib
  const profile = { cwl: 'reg', id: 12345678 };
  findApp(profile, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

routes.post('/api/form', upload.single('files'), (req, res) => {
  
  // check headers for CWL attributes

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


// })

export default routes;