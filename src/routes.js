import { Router } from 'express';
import { findApp, fillForm } from './database'

const routes = Router();

routes.get('/api/login', (req, res) => {
  //get profile from shib
  const profile = { cwl: 'awoo94', id: 54355678 };
  findApp(profile, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

routes.post('/api/form', (req, res) => {

  const credentials = { cwl: 'awoo94', id: 54355678 };
  //if (credentials.cwl === '' || credentials.id === '') {
  //res.send({filledForm: false})
  //}

  fillForm(req.body, credentials, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

export default routes;
