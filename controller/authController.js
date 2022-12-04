const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {
// Get Login
    getLogin: (req, res)=>{
        res.render("./users/login")
    },
    postLogin: async(req, res) =>{
        User.findOne({email: req.body.email}, function(err, user){
            if(user){      
                bcrypt.compare(
                    req.body.password,
                    user.password,
                    function(err, validPassword){
                        if(validPassword){
                            res.redirect('/users/' + user._id);
                        }
                        else{
                            res.redirect('/users/login');
                        }
                    }
                );
                }
            });
    },

//Register
    getRegister: (req, res) => {
        res.render("./users/register")
    },
    postRegister: async(req, res) =>{

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user
            const newUser = await new User({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                address: req.body.address,
                password: hashed,
            });

            // save to DB
            const user = await newUser.save(function(err){
                res.redirect("./login")
            });
    },

// ĐI tới trang logout
    getLogout: (req, res) => {
        res.render("./users/logout")
    },
    postLogout: (req, res) => {
        res.clearCookie("data");
        res.redirect('/')
    },

// Edit Info
    getInfoUser: (req, res) => {
        const ID = req.params.id;
        User.findById(ID, function (err, adventure) {
            res.render('./users/edit', {data: adventure});
        });
    },
    postUserInfo: (req, res) => {
        const data = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phonenumber : req.body.phonenumber,
            address : req.body.address
        }
        User.update({_id: req.params.id}, data, function(err, raw) {
            if (err) {
                res.send(err);
            }
            res.redirect('/users/' + req.params.id);
        });
    },

// Show User Info
  // Show User Info
  getUser: (req, res) => {
    const ID = req.params.id;
    User.findById(ID, function (err, adventure) {
        res.render('./users/show', {data: adventure});
    });
},

};

module.exports= authController;