const sequelize=require('sequelize');
const db=require('../config/database');
const Product=db.define('Products',{
  Productname:{
    type:sequelize.STRING
  },
  Productcost:{
    type:sequelize.INTEGER
  },
  Productcategory:{
    type:sequelize.STRING
  },
  Productpicture:{
    type:sequelize.STRING
  }
});
module.exports=Product;
