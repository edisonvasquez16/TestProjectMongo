const express = require('express')
const app = express();
const swaggerUI = require('swagger-ui-express')
const maskRoutes = require('./routes/mask')
const pseRoutes = require('./routes/psePayment')
const cashRoutes = require('./routes/cashPayment')
const ccRoutes = require('./routes/creaditCardPayment')
const swaggerConfig = require('./config/swaggerConfig')
const morgan = require('morgan')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.set('view engine', 'ejs')
app.set("views", __dirname + "/views");

app.get("/index", (req, res) => {
    res.render('home', {title: 'HOME'})
});

app.use(express.json())
app.use('/', maskRoutes)
app.use('/api', cashRoutes)
app.use('/api', pseRoutes)
app.use('/api', ccRoutes)
app.use('/api-doc', swaggerUI.serve, swaggerConfig.swaggerSetup)
app.use((req, res) => {
    res.status(404).render('404', {title: 'Page not found'})
})

module.exports = app