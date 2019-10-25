const express=require('express');
const user=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const order=require('../models/Orders');
const router=express.Router();

router.post('/register',(req,res)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const Name=req.body.name;
    const Email=req.body.email;
    const Password=hash;
    const Phone=req.body.phone;
    user.create({
      Name,
      Email,
      Password,
      Phone
    });
  }).then(result=>{
    res.status(200).json({
      message:'User created'
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      err:err
    });
  });
});
router.post('/login',(req,res)=>{
  const Email=req.body.email;
  let fetchedUser;
  user.findOne({where:{Email}}).then(User=>{
    if(!User)
    {
      res.status(401).json({
        message:'User not found'
      });
    }
    fetchedUser=User;
    return bcrypt.compare(req.body.password,User.Password);
  }).then(result=>{
    if(!result)
    {
      res.status(402).json({
        message:'Error occured'
      });
    }
    const token=jwt.sign({email:fetchedUser.Email},"Jackward",{expiresIn:"72h"});
     res.status(200).json({
       token:token,
       expiresIn:72000,
       email:fetchedUser.Email,
       phone:fetchedUser.Phone,
       name:fetchedUser.Name
     });
  }).catch(err=>{
      res.status(403).json({
        message:'Oops error occured',
        err:err      });
  });
});
router.get('/details/:email',(req,res)=>{
  const Email=req.params.email;
  user.findOne({where:{Email}}).then(user=>{
    res.status(200).json({user});
    }).catch(err=>{
     res.status(405).json({
       message:'Error occured',
       error:err
     });
  });
});
router.put('/:id',(req,res)=>{
  const id=req.params.id;
  const email=req.body.email;
  const phone=req.body.phone;
  const name=req.body.name;
  user.update({
    Email:email,
    Phone:phone,
    Name:name
  },{where:{id}}).then(result=>{
    res.status(200).json({
      message:'Profile updated'
    });
  }).catch(err=>{
      res.status(405).json({
        message:'Error occured',
        error:err
      });
    });
});
router.get('/order/:email',(req,res)=>{
  const Email=req.params.email;
  order.findAll({where:{Email}}).then(result=>{
    res.status(200).json({
      result
    });
  }).catch(err=>{
    res.status(405).json({
      message:'error occured',
      error:err
    });
  });
});
module.exports=router;
