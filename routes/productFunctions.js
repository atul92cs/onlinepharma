const express=require('express');
const router=express.Router();
const multer=require('multer');
const storage=multer.diskStorage({
  destination:'./pictures/',
  filename:function(req,file,cb){
    cb(null,file.originalname);
  }
});
const upload=multer({
  storage:storage
});
const product=require('../models/Product');
router.post('/addproduct',upload.single('picture'),(req,res)=>{
  const Productname=req.body.name;
  const Productcost=req.body.cost;
  const Productcategory=req.body.category;
  const Productpicture=req.protocol + "://" + req.get("host")+"/pictures/"+req.file.originalname;
   product.create({
     Productname,
     Productcost,
     Productcategory,
     Productpicture
   }).then(()=>{
     res.status(200).json({
       message:'Product saved'
     });
   }).catch(err=>{
     res.status(401).json({
       message:'Error occured',
       Error:err
     });
   });

});
router.put('/:id',(req,res)=>{
  const Productname=req.body.name;
  const Productcost=req.body.cost;
  const Productcategory=req.body.category;
  const id=req.params.id;
  product.update({Productname:Productname,Productcost:Productcost,Productcategory:Productcategory},{where:{id}}).then(()=>{
    res.status(200).json({
      message:'Product updated'
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      Error:err
    });
  });
});
router.delete('/:id',(req,res)=>{
  const id=req.params.id;
  product.destroy({where:{id}}).then(
    deletedProduct=>{
      if(deletedProduct==1)
      {
        res.status(200).json({
          message:'Product deleted'
        });
      }
      else
      {
        res.status(401).json({
          message:'Error occured product not found'
        });
      }
    }
  ).catch(err=>{
    res.status(402).json({
      message:'Error occured',
      Error:err
    });
  });
});
router.get('/getproduct',(req,res)=>{
  product.findAll().then(product=>{
    res.status(200).json({
      product
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      Error:err
    });
  });
});
router.get('/getproduct/:id',(req,res)=>{
  const id=req.params.id;
  product.findOne({where:{id}}).then(
    product=>{
      res.status(200).json({
        product
      });
    }
  ).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      Error:err
    });
  });
});
module.exports=router;
