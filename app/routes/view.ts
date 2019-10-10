import * as express from 'express';
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
let router = express.Router();
import User from '../model/user'

import * as jwt from 'jsonwebtoken';
let JWTSECRET:string = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';

var verifyToken=((req:any,res:any,next:any)=>{
    // console.log('llallalalallalalal',req.headers.cookie.slice(9))
     if(req.headers.cookie.slice(9) !==undefined ){
    var token = req.headers.cookie.slice(9)
    // console.log(token,"00000x,,mxmxmmx")

    if(token){
      const decode:any = jwt.verify(token, JWTSECRET)
    //   console.log(decode,'000=====00000');
      
      if(decode){
        User.findById(decode.id).then((user)=>{

        //   console.log(user,'ghapaaghappp')
          req.currentUser =user;
          return next()
        })
        
      }else{
        res.send({message:"authentication failed"})
      }
  
    }  
  }else{
    res.redirect('/')
  }
  
   })





router.get('/',function(req:Request,res:Response,next:NextFunction){
    res.render('signin')
})

router.get('/signup',function(req:Request,res:Response,next:NextFunction){
    res.render('signup')
})

router.get('/home', verifyToken,function(req:Request,res:Response,next:NextFunction){
    res.render('contacts')
})

router.get('/profile',function(req:Request,res:Response,next:NextFunction){
    res.render('profile')
})









export default router;