const mongoose = require("mongoose");

const productSchema = new mongoose.Schema ({

    name: {
    type: String,
    required: true,
},
category: {
    type: String,
    enum: ["Men", "Women", "Kids"],
    required: true,
},
subCategory: {
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true,
},
image: {
    type: String,
    required: true,
},
colors: {
    type: [String],
    required: true,
},
sizes: {
    type: [String],
    required: true,
},
description: {
    type: String,
    required: true,
},

})

module.exports = mongoose.model("product", productSchema);