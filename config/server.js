//Importar o módulo do framework express
const express = require('express')

//Importar o módulo do consign
const consign = require('consign')

//Importar o módulo body-parser
const bodyParser = require('body-parser')

//Importar o módulo do express-validator
const expressValidator = require('express-validator')

//Iniciar o objeto do express
const app = express()

//Setar as variáveis que a "view engine" e views do express
app.set('view engine', 'ejs')
app.set('views', './app/views')

//configurando os middlewares
app.use(express.static('./app/public'))

//Configurando o middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//configurar o middleware express-validator
app.use(expressValidator())

//Efetua o auto-load das rotas, dos models e dos controllers para o objeto app
consign().include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app)

//exportando o objeto app
module.exports = app