const Auth = require("../models/authUser");
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });
const cloudinary = require("cloudinary").v2;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// get welcome page
const get_welcome =async (req, res) => {
  const token =await req.cookies.jwt;
  if (token) {
    return res.json({ auth: true });
  } else {
    return res.json({ auth: false });
  }
};

// get home page
const get_home =async (req, res) => {
  const token =await req.cookies.jwt;

await  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ status: false });
    } else {
      await Auth.findById(decoded.id).then((user) =>
        res.json({ status: true, userdata: user.custmoreinfo })
      );
    }
  });
};
//get side
const get_side = async(req, res) => {
  const token =await req.cookies.jwt;

await  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ status: false });
    } else {
      await Auth.findById(decoded.id).then((user) =>
        res.json({ status: true, userdata: user })
      );
    }
  });
};
// get add page
const get_add = (req, res) => {
  return res.json({ status: true });
};
// get view page
const get_view = async (req, res) => {
  try {
    const token =await req.cookies.jwt;

    await Auth.findOne({ "custmoreinfo._id": req.params.id }).then((result) => {
      const selectobj = result.custmoreinfo.find(async(item) => {
        return item._id ==await req.params.id;
      });
      return res.json({ status: true, info: selectobj });
    });
  } catch (error) {
    return res.status(400).json({ status: false });
  }
};
//get edit page
const get_edit = async (req, res) => {
  try {
    const token =await req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ status: false });
    } else {
      await Auth.findOne({ "custmoreinfo._id": req.params.id }).then(
        (result) => {
          const selectobj = result.custmoreinfo.find((item) => {
            return item._id == req.params.id;
          });
          return res.json({ status: true, info: selectobj });
        }
      );
    }
  } catch (error) {
    return res.status(400).json({ status: false });
  }
};

// post serch
const post_serch = async (req, res) => {
  const textserch =await req.body.search.trim();
  var decoded = await jwt.verify(req.cookies.jwt, process.env. JWT_SECRETE_KEY);

  Auth.findOne({ _id: decoded.id }).then((result) => {
    const sercharr = result.custmoreinfo.filter((item) => {
      return (
        item.firstName.includes(textserch) || item.lastName.includes(textserch)
      );
    });

    return res.json({ array: sercharr });
  });
};

// post add data
const post_add_data = async (req, res) => {
  try {
    var decoded =await jwt.verify(req.cookies.jwt, process.env. JWT_SECRETE_KEY);
    if (decoded.id) {
      console.log(req.body);
      const respone = await Auth.updateOne(
        { _id: decoded.id },
        {
          $push: {
            custmoreinfo: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              phone: req.body.phone,
              age: req.body.age,
              country: req.body.country,
              gender: req.body.gender,
              createdAt: new Date(),
            },
          },
        }
      );
      return res.json({ status: true });
    } else {
      res.json({ status: fasle });
    }
  } catch (error) {
    console.log(error);
  }
};

// post upload image
const post_image = (req, res, next) => {
  // req.file is the `avatar` file
  console.log(req.file.path);
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    console.log(result, error);
    var decoded =await jwt.verify(req.cookies.jwt, process.env. JWT_SECRETE_KEY);
    await Auth.updateOne(
      { _id: decoded.id },
      { profileImage: result.secure_url }
    );
    return res.json({ update: true });
  });
};

// put edit 
const put_edit = async (req, res) => {
  await Auth.updateOne(
    { "custmoreinfo._id": req.params.iddd },
    {
      "custmoreinfo.$.firstName": req.body.firstName,
      "custmoreinfo.$.lastName": req.body.lastName,
      "custmoreinfo.$.email": req.body.email,
      "custmoreinfo.$.phone": req.body.phone,
      "custmoreinfo.$.age": req.body.age,
      "custmoreinfo.$.country": req.body.country,
      "custmoreinfo.$.gender": req.body.gender,
      "custmoreinfo.$.updatedAt": new Date(),
    }
  ).then((result) => {
    console.log(result);
    res.json({ action: true });
  });
  console.log(req.body);
}
//  delete in edit page with midd
const delete_edit_page = async(req, res) => {
  console.log(req.params.idd, "doneeeeeeeeeee");
  try {
  await  Auth.updateOne(
      { "custmoreinfo._id": req.params.idd },
      { $pull: { custmoreinfo: { _id: req.params.idd } } }
    ).then((ress) => {
      return res.json({ deleteed: true });
    });
  } catch (error) {
    console.log(error);
  }
}
// delete in home page  with midd
const delete_home_page=async(req, res) => {
  try {
  await  Auth.updateOne(
      { "custmoreinfo._id": req.params.id },
      { $pull: { custmoreinfo: { _id: req.params.id } } }
    ).then((ress) => {
      return res.json({ action: true });
    });
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  get_welcome,
  get_home,
  get_side,
  get_add,
  get_view,
  get_edit,
  post_serch,
  post_add_data,
  post_image,
  put_edit,
  delete_edit_page,
  delete_home_page
};
