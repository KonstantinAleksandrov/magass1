require('dotenv').config() // импортируем конфиг из модуля dotenv чтобы пользоваться переменными из файла .env
const express = require('express')
const sequelize = require('./db')
const modeles = require('./modeles/modeles')

const PORT = process.env.PORT || 5000 // получаем значение порта из переменной окружения или 5000

const app = express()

const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`Сервер запустился на порту ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()
