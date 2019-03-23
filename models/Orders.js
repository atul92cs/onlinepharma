const sequelize=require('sequelize');
const db=require('../config/database');
const Orders=db.define('Orders',{
  Name:{
    type:sequelize.STRING
  },
  Address:{
    type:sequelize.STRING
  },
  Phone:{
    type:sequelize.INTEGER
  },
  Email:{
    type:sequelize.STRING
  },
  OrderSummary:{
    type:sequelize.STRING
  },
  OrderCost:{
    type:sequelize.INTEGER
  },
  Orderdate:{
    type:sequelize.STRING
  },
  Orderstatus:{
    type:sequelize.STRING
  }
});
module.exports=Orders;
