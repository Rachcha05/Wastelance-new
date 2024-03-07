const Cart = require("../models/cart");
const Order = require("../models/order");
const Address = require("../models/address");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


/* const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, 
  },
}); */
//send email
const sendEmail= (toEmail, order, totalAmount, paymentType, paymentStatus) => {
/* exports.sendEmail=(req,res) =>{ */
  /*  const {totalAmount,paymentType,paymentStatus,msg} =req.body; */
   const msgObj ={
   to: 'kracshan05@gmail.com',
   from: 'kracshan05@gmail.com',
   subject: "Request Placed Successfully - CleanTech",
   html: `<div style="text-align: center; 
  /* background-image: url('https://images.pexels.com/photos/3272281/pexels-photo-3272281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') ; */ 
   background-size: auto; background-position: center center; background-repeat: no-repeat; color: black;">
   <h1>Thank You & We Recieved Your Request!</h1>
   <br>
    <h2>Grand Total : ${totalAmount}</h2>
    <h2>Payment Type : ${paymentType}</h2>
    <h2>Payment Status : ${paymentStatus}</h2>
   <h1>For More Information Please Visit Your CleanTech Account Profile!</h1>
   </div>`,
 };
 sgMail
 .send(msgObj)
 .then(() => /* res.status(200).json({res:'Email Success!', order}) */ console.log("OK"))
 .catch((err) =>/* res.status(200).json({ error: err.message, order }) */ console.log(err.message));
};


exports.addOrder = (req, res) => {
  //after adding the order we have to delete that items from cart
  Cart.deleteOne({ user: req.user._id }).exec((err, result) => {
    if (err) return res.status(400).json({ err });
    if (result) {
      const usrObj = req.body.user;
      req.body.user = req.user._id;

      req.body.orderStatus = [
        {
          type: "Requested",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "Recieved",
          isCompleted: false,
        },
        {
          type: "Accepted",
          isCompleted: false,
        },
        {
          type: "Collected",
          isCompleted: false,
        },
      ];
      

      
    {/* <br>
    <h2>Grand Total : ${req.body.totalAmount}</h2>
    <h2>Payment Type : ${req.body.paymentType}</h2>
    <h2>Payment Status : ${req.body.paymentStatus}</h2>
      */}
      const order = new Order(req.body);
      order.save((err, savedOrder) => {
        if (err) return res.status(400).json({ error:err.message });
        if (savedOrder) {
          /* // Sending email after saving the order
          sendEmail(req.user.email)
          .then(() => {
          res.status(201).json({ order:savedOrder });
        
      })
      .catch((err) => {
        console.log('Email Error:' ,err);
        res.status(200).json({ order: savedOrder });// Even if email sending fails, still return the order
      }); */
      console.log(savedOrder);
      sendEmail(req.user.email, savedOrder, req.body.totalAmount, req.body.paymentType, req.body.paymentStatus);
      res.status(200).json({ order: savedOrder });
      }
    });
  }
});
};
exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productImages")
    .exec((err, orders) => {
      if (err) return res.status(400).json({ err });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

exports.searchOrders = (req, res) => {
  Order.find({ _id: req.body._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productImages")
    .exec((err, orders) => {
      if (err) return res.status(200).json({ err });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

exports.getOrder = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productImages")
    .lean()
    .exec((err, order) => {
      if (err) return res.status(400).json({ err });
      if (order) {
        Address.findOne({ user: req.user._id }).exec((err, address) => {
          if (err) return res.status(400).json({ err });

          if (address) {
            order.address = address.addressNew.find(
              (adr) => adr._id.toString() == order.addressId.toString()
            );
            res.status(200).json({ order });
          }
        });
      }
    });
};
