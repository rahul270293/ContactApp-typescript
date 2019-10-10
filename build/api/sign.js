"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const jwt = require("jsonwebtoken");
let JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
// import { NextFunction } from 'connect';
class Sign {
    constructor() {
        this.signup = ((req, res, next) => {
            //  console.log(req.body ,'=========anana hai');
            let log = new user_1.default({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.password
            });
            user_1.default.findOne({ email: log.email }).then((resp) => {
                // console.log(resp,'ckkakkckakakkca')
                if (!resp) {
                    if (log.password === log.cpassword) {
                        log.save().then((doc) => {
                            if (doc) {
                                res.send({ status: true, message: "user saved" });
                            }
                            else {
                                res.send({ status: false, message: 'user not saved' });
                            }
                        });
                    }
                    else {
                        res.send({ status: false, message: "password not match" });
                    }
                }
                else {
                    res.send({ status: false, mesaage: "email already exist" });
                }
            });
        });
        this.signin = ((req, res, next) => {
            //    console.log('sgggsgsggsgsgs',req.body);
            let nop = {
                email: req.body.email,
                password: req.body.password
            };
            //    console.log('kkskkksksk====',nop.email)
            user_1.default.findOne({ email: nop.email }).then((resp) => {
                //    console.log(resp._id, 'kkskskkskskksksksk');
                if (resp != null) {
                    // console.log(resp.password)
                    if (resp.password === nop.password) {
                        let token = jwt.sign({ id: resp._id }, JWTSECRET);
                        //  console.log("=====================",token);
                        res.cookie("jwtToken", token);
                        return res.json({
                            status: true,
                            message: 'login successfull',
                            token: token
                        });
                    }
                    else {
                        res.send({ status: false, message: "incorrect password" });
                    }
                }
                else {
                    res.send({ status: false, message: "please signup" });
                }
            });
        });
        this.signout = ((req, res, next) => {
            var token = jwt.sign({ id: '' }, JWTSECRET);
            //console.log('signoutMethod',token);
            res.cookie('jwtToken', '', false);
            return res.json({
                status: true,
                message: 'logout successfull!',
                token: token,
            });
        });
        this.profile = ((req, res, next) => {
            res.send({ username: req.currentUser.name, useremail: req.currentUser.email });
        });
    }
}
exports.default = Sign;
//# sourceMappingURL=sign.js.map