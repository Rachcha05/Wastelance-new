const mongoose = require("mongoose");
const {v4:uuidv4 } =require ('uuid');

//Generate a new UUID
const ID = uuidv4();
//const ID = require("nodejs-unique-numeric-id-generator");

const orderSchema = new mongoose.Schema(
  {
    /* _id: {
      type: String,
      default: ID.generate(new Date().toJSON()),
    }, */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress.address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        payablePrice: {
          type: Number,
          required: true,
        },
        offer: {
          type: Number,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cod", "card", "online"],
      required: true,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["Requested", "Recieved", "Accepted", "Collected"],
          default: "Requested",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
