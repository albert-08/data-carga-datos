const csv = require('csv-parser')
const fs = require('fs')
const { SesionCliente } = require('./database')

const results = []
// 1.- Abrir el archivo.
fs.createReadStream('v.csv') // Lee un archivo y lo vuelve una linea de datos que se puede leer.
    .pipe(csv()) // Pipe transforma datos de un stream a algo. (Ese algo yo lo puedo crear)
    // 2.- Leer cada row del archivo.
    .on('data', (data) => { // Escuchadores de los eventos que detonan el pipe y que a su vez detona cvs(), data = row de csv
        // 3.- Procesar / Limpiar los datos.
        //Crear el objeto para mongo.
        const day = parseInt(data.day_tz)
        const dayString = day > 9 ? `${day}` : `0${day}`

        const hour = parseInt(data.hour_tz)
        const hourString = hour > 9 ? `${hour}` : `0${hour}`

        const sessionClient = {
            device_mac: data.device_mac,
            branch_office: parseInt(data.branch_office),
            month_tz: parseInt(data.month_tz),
            day_tz: day,
            day_of_week_tz: data.day_of_week_tz,
            hour_tz: hour,
            conection_date: new Date(`2016-${data.month_tz}-${dayString}T${hourString}:00:00Z`),
            visitor: data.visitor == 'true',
            tiempodeses: parseInt(data.tiempodeses)
        }
        results.push(sessionClient)
    })
    .on('end', async () => {
        for(let i=0; i<results.length; i++){
            console.log(results[i])
            //4.- Insertar en la base de datos.
            await SesionCliente.create(results[i])
                /* .then((result) => {
                    console.log('Insertado id: ', result._id)
                }).catch((err) => {
                    console.log('error: ', err, results[i])
                }) */
        }
    })