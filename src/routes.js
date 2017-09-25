import { Router } from 'express';
import { findApp, fillForm } from './database'

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

routes.post('/api/form', (req, res) => {

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
