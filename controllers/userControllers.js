const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// method: GET
//localhost:8000/user/allusers
module.exports.getAllusers = async (req, res) => {
  const allusers = await user.find();
  return res.status(200).json(allusers);
};

// method: POST
//localhost:8000/user/add
module.exports.adduser = async (req, res) => {
  // req.body
  try {
    const { name, email, password, isActive } = req.body;

    //9adeh mn marra bech na3ml hashage
    const salt = await bcrypt.genSalt(10);

    //a3tini text => result
    const hashedpassword = await bcrypt.hash(password, salt);

    const addeduser = new user({
      name,
      email: email.toLowerCase(),
      password: hashedpassword,
      isActive,
    });

    await addeduser.save();
    return res.status(200).json(addeduser);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

// method: PUT
//localhost:8000/user/update/:idselected
module.exports.activeuser = async (req, res) => {
  const { idselected } = req.params;
  await user.findByIdAndUpdate(idselected, { $set: { isActive: true } });
  return res.status(200).json("activated");
};

// method: DELETE
//localhost:8000/user/delete/:iddelete
module.exports.deleteuser = async (req, res) => {
  const { iddelete } = req.params;
  await user.findByIdAndDelete(iddelete);
  return res.status(200).json("deleted!");
};

//localhost:8000/user/login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginuser = await user.findOne({ email: email });
    if (!loginuser) {
      return res.status(401).send("no user with this email");
    }
    const token = jwt.sign(
      {
        //payload
        id: loginuser._id,
      },
      "xxxxxxxxxx", //jwt_secret
      { expiresIn: "1h" }
    );
    const isMatch = await bcrypt.compare(password, loginuser.password);
    if (!isMatch) {
      return res.status(400).send("invalid password");
    }
    res.status(200).json(token);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};
