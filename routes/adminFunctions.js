const express=require('express');
const router=express.Router();
const admin=require('../models/Admin');
const order=require('../models/Orders');
const user=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
router.post('/register',(req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const username=req.body.username;
    const password=hash;
    admin.create({
      username,
      password
    });
  }).then(()=>{
    res.status(200).json({
      message:'user created'
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      error:err
    });
  });
});
router.post('/login',(req,res)=>{
  const username=req.body.username;
  let fetchedUser;
  admin.findOne({where:{username}}).then((User)=>{
    if(!User)
    {
      res.status(401).json({
        message:'Authentication problem'
      });
    }
    fetchedUser=User;
    return bcrypt.compare(req.body.password,User.password);
  }).then(result=>{
    if(!result)
    {
      res.status(403).json({
        message:'Auth failed'
      });
    }
    const token=jwt.sign({username:fetchedUser.username},"Jackward",{expiresIn:"72h"});
    res.status(200).json({
      token:token,
      expiresIn:72000,
      username:fetchedUser.username
    });
  }).catch(err=>{
    res.status(402).json({
      message:'Oops error occured',
      error:err
    });
  });
});
router.get('/Orders',(req,res)=>{
   order.findAll().then(result=>{
     res.status(200).json({
        result
     });
   }).catch(err=>{
     res.status(403).json({
       message:'error occured',
       error:err
     });
   });
});
router.get('/Order/:id',(req,res)=>{
  const id=req.params.id;
    order.findOne({where:{id:id}}).then(result=>{
      res.status(200).json({
        result
      });
    }).catch(err=>{
      res.status(403).json({
        message:'error occured',
        error:err
      });
    });
});
router.delete('/Order/:id',(req,res)=>{
   const id=req.params.id;
   order.destroy({where:{id:id}}).then(result=>{
     if(result==1)
     {
       res.status(200).json({
         message:'Order deleted'
       });
     }
   }).catch(err=>{
       res.status(401).json({
         message:'Error occured',
         error:err
       });
   });
});
router.put('/Order/:id',(req,res)=>{
  const id =req.params.id;
  const Orderstatus=req.body.orderstatus;
     order.update({Orderstatus:Orderstatus},{where:{id}}).then(()=>{
       res.status(200).json({
         message:'Order status updated'
       });
     }).catch(err=>{
       res.status(403).json({
         message:'Error occrued',
         error:err
       });
     });
});
router.put('/User/:id',(req,res)=>{
  const id=req.params.id;
  const Name=req.body.name;
  const Email=req.body.email;
  const Phone=req.body.phone;
  user.update({
    Email:Email,
    Name:Name,
    Phone:Phone
  },{where:{id}}).then(()=>{
    res.status(200).json({
      message:'User updated'
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      error:err
    });
  });
});
router.get('/Users',(req,res)=>{
  user.findAll().then(users=>{
    res.status(200).json({
      users
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      error:err
    });
  });
});
router.get('/User/:id',(req,res)=>{
  const id=req.params.id;
  user.findOne({where:{id:id}}).then(user=>{
    res.status(200).json({
      user
    });
  }).catch(err=>{
    res.status(401).json({
      message:'error occured',
      error:err
    });
  });
});
router.delete('/User/:email',(req,res)=>{
   const email=req.params.email;
   user.destroy({where:{Email:email}}).then(deleteduser=>{
     if(deleteduser==1)
     {
       res.status(200).json({
         message:'User deleted'
       });
     }
     else {
       res.status(401).json({
         message:'Error not found'
       });
     }
   }).catch(err=>{
     res.status(401).json({
       message:'Error occured'
     });
   });
});
module.exports=router;
