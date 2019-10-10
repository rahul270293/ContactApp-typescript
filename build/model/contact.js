"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    number: {
        type: Number,
        required: true,
        minlength: 10
    },
    admin: {
        type: String
    }
});
let contact = mongoose.model('contact', contactSchema);
exports.default = contact;
//# sourceMappingURL=contact.js.map