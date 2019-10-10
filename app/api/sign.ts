import user from '../model/user';
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import * as jwt from 'jsonwebtoken';
let JWTSECRET:string = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
// import { NextFunction } from 'connect';

class Sign {
   signup = ((req:Request,res:Response,next:NextFunction)=>{
        //  console.log(req.body ,'=========anana hai');
        let log:any = new user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.password
        });
    user.findOne({email:log.email}).then((resp)=>{
        // console.log(resp,'ckkakkckakakkca')
        if(!resp){
            if(log.password === log.cpassword){
                log.save().then((doc:any)=>{
                    if(doc){
                        res.send({status:true, message:"user saved"});
                    }else{
                        res.send({status:false,message:'user not saved'})
                    }
                } )
            }else{
                res.send({status:false, message:"password not match"})
            }
        }else{
            res.send({status:false, mesaage:"email already exist"});
        }
    });
   });

   signin= ((req:Request,res:Response,next:NextFunction)=>{
    //    console.log('sgggsgsggsgsgs',req.body);
       let nop:any = {
           email:req.body.email,
           password:req.body.password
       }
    //    console.log('kkskkksksk====',nop.email)
       user.findOne({email:nop.email}).then((resp:any)=>{
        //    console.log(resp._id, 'kkskskkskskksksksk');
        if(resp!= null){
            // console.log(resp.password)
            if(resp.password === nop.password){
                 let token:string = jwt.sign({id:resp._id}, JWTSECRET);
                //  console.log("=====================",token);
                 res.cookie("jwtToken",token)
                 return res.json({
                     status:true,
                     message:'login successfull',
                     token:token
                 })
            }else{
                res.send({status:false, message:"incorrect password"})
            }

        }else{
            res.send({status:false, message:"please signup"})
        }
       })
   });



    signout=((req:any,res:any,next:any)=>{
    var token = jwt.sign({ id:'' }, JWTSECRET);
        //console.log('signoutMethod',token);
        res.cookie('jwtToken','',false);
        return res.json({
            status	:	true,
            message	:	'logout successfull!',
            token	:	token,
        });
    });


   profile = ((req:any,res:any,next:NextFunction)=>{
    res.send({username:req.currentUser.name,useremail:req.currentUser.email});
    })
}





export default Sign;