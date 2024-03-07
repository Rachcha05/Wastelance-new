const Order = require("../../models/order");
const Address = require("../../models/address");

//update the order status
exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((err, order) => {
    if (err) return res.status(400).json({ err });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

//get all orders by customer
exports.getCustomerOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
  res.status(200).json({ orders });
};

//get addresses of users
exports.getAddressByUser = async (req, res) => {
  const id = req.params.id;
  const address = await Address.findOne({ user: id }).exec();
  res.status(200).json({ address });
};









/* const Page = require("../../models/page");

exports.createPage = (req, res) => {
  const { banners, products } = req.files;
  if (banners && banners.length > 0) {
    req.body.banners = banners.map((banner, index) => ({
      img: `/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  if (products && products.length > 0) {
    req.body.products = products.map((product, index) => ({
      img: `/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  req.body.createdBy = req.user._id;

  Page.findOne({ category: req.body.category }).exec((error, page) => {
    if (error) return res.status(400).json({ error });
    if (page) {
      Page.findOneAndUpdate({ category: req.body.category }, req.body).exec(
        (error, updatedPage) => {
          if (error) return res.status(400).json({ error });
          if (updatedPage) {
            return res.status(201).json({ page: updatedPage });
          }
        }
      );
    } else {
      const page = new Page(req.body);

      page.save((error, page) => {
        if (error) return res.status(400).json({ error });
        if (page) {
          return res.status(201).json({ page });
        }
      });
    }
  });
};

exports.getPage = (req, res) => {
  const { category, type } = req.params;
  if (type === "page") {
    Page.findOne({ category: category }).exec((error, page) => {
      if (error) return res.status(400).json({ error });
      if (page) return res.status(200).json({ page });
    });
  }
}; */