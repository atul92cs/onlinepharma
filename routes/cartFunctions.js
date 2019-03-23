const express=require('express');
const router=express.Router();
const cart =require('../models/Cart');
const order=require('../models/Orders');
router.post('/addproduct',(req,res)=>{
  const Name=req.body.name;
  const Price=req.body.price;
  const Quantity=req.body.quantity;
  const Cost=req.body.cost;
  cart.create({
    Name,
    Price,
    Quantity,
    Cost
  }).then(result=>{
    res.status(200).json({
      message:'Product Added to cart'
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      Error:err
    });
  });
});
router.put('/updateproduct/:name',(req,res)=>{
  const Name=req.params.name;
  const Price=req.body.price;
  const Quantity=req.body.quantity;
  const Cost=req.body.cost;
  cart.update({Price:Price,Quantity:Quantity,Cost:Cost},{where:{Name}}).then(()=>{
    res.status(200).json({
      message:'Cart updated'
    });
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      error:err
    });
  });
});
router.delete('/deleteproduct/:id',(req,res)=>{
  const id=req.params.id;
  cart.destroy({where:{id:id}}).then(deletedProduct=>{
    if(deletedProduct==1)
    {
      res.status(200).json({
        message:'Product removed from the cart'
      });
    }
  }).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      Error:err
    });
  });
});
router.get('/',(req,res)=>{
  cart.findAll().then(cart=>{
    res.status(200).json({
      cart
    });
  }).catch(err=>{
    res.status(401).json({
      message:'error occured',
      error:err
    });
  });
});
router.get('/:name',(req,res)=>{
  const Name=req.params.name;
  cart.findOne({where:{Name:Name}}).then(
    result=>{
      res.status(200).json({
        result
      });
    }
  ).catch(err=>{
    res.status(401).json({
      message:'Error occured',
      error:err
    });
  });
});
router.post('/placeorder',(req,res)=>{
    const Name=req.body.name;
    const Phone=req.body.phone;
    const Email=req.body.email;
    const Address=req.body.address;
    const OrderSummary=req.body.ordersummary;
    const OrderCost=req.body.ordercost;
    const Orderdate=req.body.orderdate;
    const Orderstatus="placed";
    order.create({
      Name,
      Address,
      Phone,
      Email,
      OrderSummary,
      OrderCost,
      Orderstatus,
      Orderdate
    }).then(()=>{
      cart.destroy({where:{},truncate:true}).then(result=>{
        if(result!=null)
        {
          res.status(200).json({
            message:'Order placed'
          });
        }
      }).catch(err=>{
        res.status(403).json({
          message:'error occured',
          error:err
        });
      });

    }).catch(err=>{
      res.status(401).json({
        message:'Error occured',
        error:err
      });
    });

});
module.exports=router;
