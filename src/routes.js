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
  // if file exists, writes to to 
  console.log(req.file)
  writeFile(req.file)

  const credentials = { cwl: 'unreg', id: 5434373 };
  //if (credentials.cwl === '' || credentials.id === '') {
  //res.send({filledForm: false})
  //}
  console.log(req.body)
  // fillForm(req.body, credentials, (err, result) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(result)
  //     res.send(result)
  //   }
  // })
})

// routes.post('/api/file', (req, res) => {

//   const credentials = { cwl: 'unreg', id: 5434373 }
//   console.log(req.body)


// })

export default routes;