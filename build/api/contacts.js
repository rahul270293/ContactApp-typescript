"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("../model/contact");
class Contacts {
    constructor() {
        this.addContact = ((req, res, next) => {
            let detail = new contact_1.default({
                email: req.body.email,
                name: req.body.name,
                number: req.body.number,
                admin: req.currentUser.email
            });
            contact_1.default.findOne({ email: detail.email, admin: detail.admin }).then((resp) => {
                //   console.log(resp,'kakakkakkakakkakak')
                if (!resp) {
                    detail.save().then((doc) => {
                        //  console.log(doc,'======lqllqlq')
                        res.send({ status: true, message: "data saved" });
                    }, (e) => {
                        res.send({ status: false, message: "data not saved" });
                    });
                }
                else {
                    res.send({ status: false, message: 'data exists' });
                }
            });
        });
        this.deleteContact = ((req, res, next) => {
            contact_1.default.findOneAndRemove({ email: req.body.email, admin: req.currentUser.email }).then((resp) => {
                if (resp) {
                    res.send({ status: true, message: "contact deleted" });
                }
                else {
                    res.send({ status: false, message: "not deleted" });
                }
            }, (e) => {
                res.send({ status: false, message: "contact not found" });
            });
        });
        this.updateContact = ((req, res, next) => {
            let detail = {
                email: req.body.email,
                name: req.body.name,
                number: req.body.number
            };
            let oldemail = req.body.email;
            contact_1.default.findOneAndUpdate({ email: oldemail, admin: req.currentUser.email }, detail).then((doc) => {
                if (doc) {
                    res.send({ status: true, message: "contact updated" });
                }
                else {
                    res.send({ status: false, message: "contact not found" });
                }
            }, (e) => {
                res.send({ status: false, message: "contact not updated" });
            });
        });
        this.fetchContact = ((req, res, next) => {
            let admin = req.currentUser.email;
            // console.log(admin);
            contact_1.default.find({ admin }).then((contact) => {
                //console.log(contact);
                res.status(200).send({ contact });
            }, (e) => {
                res.status(404).send(e);
            });
        });
    }
}
exports.default = Contacts;
//# sourceMappingURL=contacts.js.map