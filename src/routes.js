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

const upload = multer({ storage });

const routes = Router();

routes.get('/api/login', (req, res) => {
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
  // if file exists, writes to to 
  console.log(req.file)
  writeFile(req.file)

  console.log(req.body)
  const profile = { cwl: 'unreg', id: 5434373 };

  fillForm(req.body, profile, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})

export default routes;