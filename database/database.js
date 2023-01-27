const sequelize= require ('sequelize');
const connection = new sequelize('guiaperguntas','root','lnp22765',{
    host:'localhost',
    dialect:'mysql'
});


module.exports= connection;