import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(express.static(path.join(__dirname, '../public/build')))
app.disable('x-powered-by')

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/', routes)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    // .render('error', {
    //   message: err.message
    // });
})

export default app
