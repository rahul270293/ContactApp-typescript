"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const user_1 = require("../model/user");
const sign_1 = require("../api/sign");
let sign = new sign_1.default();
const contacts_1 = require("../api/contacts");
let contact = new contacts_1.default();
//jwtToken verification
const jwt = require("jsonwebtoken");
let JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
var verifyTokenAPI = ((req, res, next) => {
    try {
        // console.log('skkskks--====skl', req.headers.authorization)
        const decode = jwt.verify(req.headers.authorization, JWTSECRET);
        // console.log(decode.id, "jsjsjsjsjsjsjsj======");
        if (decode) {
            user_1.default.findById(decode.id).then((user) => {
                // console.log(user,'ghapaghap')
                if (user) {
                    req.currentUser = user;
                    next();
                }
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: 'authentication failed'
        });
    }
});
router.post('/addContact', verifyTokenAPI, contact.addContact);
router.post('/deleteContact', verifyTokenAPI, contact.deleteContact);
router.post('/update', verifyTokenAPI, contact.updateContact);
router.post('/fetchContact', verifyTokenAPI, contact.fetchContact);
router.get('/profile', verifyTokenAPI, sign.profile);
router.post('/signup', sign.signup);
router.post('/signin', sign.signin);
router.post('/signout', verifyTokenAPI, sign.signout);
exports.default = router;
//# sourceMappingURL=api.js.map