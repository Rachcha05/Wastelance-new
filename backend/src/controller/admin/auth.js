//controllers for admin users
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortId = require("shortid");

//signup controller
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      return res.status(202).json({
        errormsg: "Admin already registerd!",
      });

    const {
      firstName,
      lastName,
      nic,
      gender,
      email,
      password,
      contactNumber,
      address,
      role,
    } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      username: shortId.generate(),
      nic,
      gender,
      email,
      hash_password,
      contactNumber,
      address,
      role,
    });

    _user.save((err, data) => {
      if (err) {
        console.log("error",err);
        return res.status(202).json({ errormsg: "Something went wrong!" });
      }
      if (data) {
        return res.status(201).json({ message: "Admin created successfully!" });
      }
    });
  });
};

//signin controller
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err) {
      return res.status(202).json({ err });
    }
    if (user) {
      const isPassword = await user.authenticate(req.body.password);

      if (isPassword && user.role !== "user") {
        //making a token using jwt if user exists
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "100d",
          }
        );
        const {
          _id,
          firstName,
          lastName,
          nic,
          gender,
          email,
          fullName,
          contactNumber,
          address,
          username,
          role,
        } = user;

        //save token in the browser cookies
        res.cookie("token", token, { expiresIn: "1h" });

        //returning repond after successfull signin
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            nic,
            gender,
            email,
            fullName,
            contactNumber,
            address,
            username,
            role,
          },
        });
      } else {
        return res.status(202).json({ errormsg: "Invalid Credentials!" });
      }
    } else {
      return res.status(202).json({ errormsg: "Something went wrong!" });
    }
  });
};

//signout controller
exports.signout = (req, res) => {
  //clearing token from the cookies
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully!",
  });
};



























/* const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });

    

      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (
        isPassword &&
        (user.role === "admin" || user.role === "super-admin")
      ) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
}; */