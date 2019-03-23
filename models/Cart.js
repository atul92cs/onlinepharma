const sequelize=require('sequelize');
const db=require('../config/database');
const Cart=db.define('Carts',{
  Name:{
    type:sequelize.STRING
  },
  Price:{
    type:sequelize.INTEGER
  },
  Quantity:{
    type:sequelize.INTEGER
  },
  Cost:{
    type:sequelize.INTEGER
  }
});
module.exports=Cart;
