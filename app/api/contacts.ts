import contact from '../model/contact'
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'

class Contacts {

    addContact = ((req:any,res:Response,next:NextFunction)=>{
        let detail:any = new contact({
            email:req.body.email,
            name:req.body.name,
            number:req.body.number,
            admin:req.currentUser.email
        })
      contact.findOne({email:detail.email,admin:detail.admin}).then((resp:any)=>{
        //   console.log(resp,'kakakkakkakakkakak')
        if(!resp){
            detail.save().then((doc:any)=>{
            //  console.log(doc,'======lqllqlq')
            res.send({status:true,message:"data saved"})
            },(e:any)=>{
                res.send({status:false,message:"data not saved"})
            })
        }else{
            res.send({status:false, message:'data exists'})
        }
      })  
    });

    deleteContact = ((req:any,res:Response, next:NextFunction)=>{
        contact.findOneAndRemove({email:req.body.email,admin:req.currentUser.email}).then((resp:any)=>{
            if(resp){
                res.send({status:true, message:"contact deleted"})
            }else{
                res.send({status:false,message:"not deleted"})
            }
        } ,(e:any)=>{
            res.send({status:false, message:"contact not found"});
        })
    })


    updateContact =((req:any,res:Response,next:NextFunction)=>{
        let detail = {
            email: req.body.email,
            name: req.body.name,
            number: req.body.number
        };
        let oldemail = req.body.email;
        contact.findOneAndUpdate({email:oldemail, admin:req.currentUser.email},detail).then((doc:any)=>{
            if(doc){
                res.send({status:true, message:"contact updated"})
            }else{
                res.send({status:false, message:"contact not found"})
            }
        },(e)=>{
            res.send({status:false, message:"contact not updated"})
        })
    })


     fetchContact= ((req:any,res:Response,next:NextFunction)=>{
        let admin:any = req.currentUser.email;
    
        // console.log(admin);
        contact.find({admin}).then((contact)=>{
        //console.log(contact);
        res.status(200).send({contact});
        },(e)=>{
        res.status(404).send(e);
        });
    });

}







export default Contacts;