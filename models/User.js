const sequelize=require('sequelize');
const db=require('../config/database');
const User=db.define('Users',{
  Name:{
    type:sequelize.STRING
  },
  Email:{
    type:sequelize.STRING
  },
  Password:{
    type:sequelize.STRING
  },
  Phone:{
    type:sequelize.STRING
  }
});
module.exports=User;
