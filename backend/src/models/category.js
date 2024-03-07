//category model (category table) is created using mongoose schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating new schema
const categorySchema = new Schema(
  {
    name: {
      //name attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true, //ignore white spaces
    },
    slug: {
      //unique slug attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      unique: true, //unique attribute
    },
    description: {
      //description attribute in the user table (single field in table)
      type: String, //data type
      required: true, //not null
      trim: true,
    },
    categoryImages: [
      //category images attribute in the user table (single field in table)
      {
        img: { type: String }, //data type
      },
    ],
    createdBy: {
      //getting the users user id from the User schema as a foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } //automatically stores date created/modified
);

const Category = mongoose.model("Category", categorySchema); //User mean model name. we can use any name like variable name

module.exports = Category;






































/* const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    categoryImage: { type: String },
    parentId: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema); */