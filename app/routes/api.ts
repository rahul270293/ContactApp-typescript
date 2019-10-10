import * as express from 'express';
const router = express.Router();
import User from '../model/user'

import Sign from '../api/sign';
let sign = new Sign();

import Contacts from '../api/contacts'
let contact = new Contacts()

//jwtToken verification
import * as jwt from 'jsonwebtoken';
let JWTSECRET:string = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';


var verifyTokenAPI = ((req:any, res:any, next:any) => {
    try {
        // console.log('skkskks--====skl', req.headers.authorization)
        const decode:any = jwt.verify(req.headers.authorization, JWTSECRET);
        // console.log(decode.id, "jsjsjsjsjsjsjsj======");
        if (decode) {
            User.findById(decode.id).then((user) => {
                // console.log(user,'ghapaghap')
                if (user) {
                    req.currentUser = user;
                    next();
                }
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: 'authentication failed'
        });
    }
})



router.post('/addContact', verifyTokenAPI,contact.addContact);
router.post('/deleteContact',verifyTokenAPI,contact.deleteContact);
router.post('/update',verifyTokenAPI,contact.updateContact);
router.post('/fetchContact',verifyTokenAPI,contact.fetchContact);

router.get('/profile',verifyTokenAPI,sign.profile);
router.post('/signup',sign.signup);
router.post('/signin', sign.signin);
router.post('/signout',verifyTokenAPI, sign.signout)










export default router;