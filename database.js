const mongoose = require('mongoose')
const SesionCliente = require('./SesionCliente')

mongoose.connect('mongodb+srv://alberto:Prueba@cluster0.mgsau.mongodb.net/dataklustera?retryWrites=true&w=majority', {useNewUrlParser: true})

module.exports = {
    SesionCliente
}