const sequelize=require('sequelize');
module.exports=new sequelize('Pharmacy.sqlite',null,null,{
  dialect:'sqlite',
  storage:'Pharmacy.sqlite'
});
