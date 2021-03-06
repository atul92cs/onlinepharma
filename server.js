const express =require('express');
const PORT=process.env.PORT||8080;
const bodyParser=require('body-parser');
const user=require('./routes/userFunctions');
const admin=require('./routes/adminFunctions');
const product=require('./routes/productFunctions');
const cart=require('./routes/cartFunctions');
const path=require('path');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});*/
app.use('/',express.static(path.join(__dirname,'view')));
app.use('/admin',admin);
app.use('/user',user);
app.use('/product',product);
app.use('/cart',cart);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,'view','index.html'));
});
app.listen(PORT,()=>{
  console.log('server started on '+PORT);
});
