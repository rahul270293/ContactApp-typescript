"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
const user_1 = require("../model/user");
const jwt = require("jsonwebtoken");
let JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
var verifyToken = ((req, res, next) => {
    // console.log('llallalalallalalal',req.headers.cookie.slice(9))
    if (req.headers.cookie.slice(9) !== undefined) {
        var token = req.headers.cookie.slice(9);
        // console.log(token,"00000x,,mxmxmmx")
        if (token) {
            const decode = jwt.verify(token, JWTSECRET);
            //   console.log(decode,'000=====00000');
            if (decode) {
                user_1.default.findById(decode.id).then((user) => {
                    //   console.log(user,'ghapaaghappp')
                    req.currentUser = user;
                    return next();
                });
            }
            else {
                res.send({ message: "authentication failed" });
            }
        }
    }
    else {
        res.redirect('/');
    }
});
router.get('/', function (req, res, next) {
    res.render('signin');
});
router.get('/signup', function (req, res, next) {
    res.render('signup');
});
router.get('/home', verifyToken, function (req, res, next) {
    res.render('contacts');
});
router.get('/profile', function (req, res, next) {
    res.render('profile');
});
exports.default = router;
//# sourceMappingURL=view.js.map