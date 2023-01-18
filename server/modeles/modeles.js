const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {   //модель данных для пользователя
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, dafaultValue : 'USER'}
})
const Basket = sequelize.define('basket', {   //модель данных для карзины
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})
const BasketDevice = sequelize.define('basketdevice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})
const Device = sequelize.define('device', {  //модель данных для устройства
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true , allowNull : false},
    price: { type: DataTypes.INTEGER, allowNull : false},
    rating: { type: DataTypes.INTEGER, defaultValue : 0},
    img: { type: DataTypes.STRING, allowNull : false}
})
const Type = sequelize.define('type', { //модель данных для типа устройства
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    name: { type: DataTypes.STRING, unique: true , allowNull : false}
})
const Brand = sequelize.define('brand', { //модель данных для бренда устройства
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true , allowNull : false}
})
const Rating = sequelize.define('rating', { //модель данных для рейтинга
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull : false}
})
const DeviceInfo = sequelize.define('rating', { //модель данных для описания утройства
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull : false},
    description: { type: DataTypes.STRING, allowNull : false},
})
const TypeBrand = sequelize.define('type_brand', { //модель данных для типа устройства
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

//описание того как модели связаны друг с другом
User.hasOne(Basket) //одна запись пользователя содержит одну запись корзины
Basket.belongsTo(User) //сообщаем что карзина принадлежит пользователю

User.hasMany(Rating) //одна пользователя может иметь много оценок
Rating.belongsTo(User) //сообщаем что оценка принадлежит пользователю

Basket.hasMany(BasketDevice) //одна корзина может иметь много устройств
BasketDevice.belongsTo(Basket) //сообщаем что устройство принадлежит корзине

Type.hasMany(Device) //одному типу  может принадлежать много устройств
Device.belongsTo(Type) //сообщаем что устройство принадлежит к этому типу

Brand.hasMany(Device) //одному бренду может принадлежать много устройств
Device.belongsTo(Brand) //сообщаем что устройство принадлежит к этому бренду

Device.hasMany(Rating) 
Rating.belongsTo(Device) 

Device.hasMany(DeviceInfo) 
DeviceInfo.belongsTo(Device) 

Type.belongsToMany(Brand,{through : TypeBrand})  // у одного типа может быть много брендов
Brand.belongsToMany(Type,{through : TypeBrand}) // у одного бренда может быть много типов


module.exports ={
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo,
    TypeBrand
}