//controller for creating new categories
const Category = require("../models/category");
const slugify = require("slugify");

exports.addCategory = (req, res) => {
  //destructuring the request body and getting all the elements separately for easy use
  const { name, description } = req.body;

  //saving all category images uploaded in an array
  let categoryImages = [];

  //if categoryImages exists then mapping them to a array of objects as needed in the category schema
  if (req.files.length > 0) {
    categoryImages = req.files.map((file) => {
      return { img:"backend/src/uploads "+ file.filename };
    });
  }

  //creating new category object (instance) with user inserted data
  const categoryObj = {
    name,
    slug: slugify(name),
    description,
    categoryImages,
    createdBy: req.user._id,
  };

  //saving the new category object(new instance) in the mongo database
  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) {
      return res.status(202).json({ error: err });
    }
    if (category) {
      return res
        .status(201)
        .json({ category, msg: "Category added successfully!" });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (categories) {
      //using createCategories function to store all the categories in the categoryList array

      return res.status(200).json({ categories /* categoryList */ });
    }
  });
};

exports.updateCategory = async (req, res) => {
  //saving all category images uploaded in an array
  let categoryImages = [];

  //if categoryImages exists then mapping them to a array of objects as needed in the category schema
  if (req.files.length > 0) {
    categoryImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  try {
    await Category.findById(req.body._id).then((category) => {
      category._id = req.body._id;
      category.name = req.body.name;
      category.description = req.body.description;

      if (categoryImages.length > 0) {
        category.categoryImages = categoryImages;
      }

      category
        .save()
        .then(() =>
          res.status(201).json({ msg: "You've Updated the category!" })
        )
        .catch((err) => res.status(202).json({ error: err.message }));
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
      .then(() =>
        res.status(200).json({ msg: "Category Deleted Successfully!" })
      )
      .catch((err) => res.status(202).json({ error: err.message }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






























