const sequelize=require('sequelize');
const db=require('../config/database');
const Admin=db.define('Admins',{
  username:{
    type:sequelize.STRING
  },
  password:{
    type:sequelize.STRING
  }
});
module.exports=Admin;
