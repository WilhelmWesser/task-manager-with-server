const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const routes = require('./routes')

const app = express()
const PORT = config.get('port') ?? 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', routes)



// if (process.env.NODE_ENV === 'production') {
//     console.log('Production')
// } else if (process.env.NODE_ENV === 'development'){
//     console.log('Development')
// }


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.green(`MongoDB connected.`))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}....`))
        })
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }

}

start()