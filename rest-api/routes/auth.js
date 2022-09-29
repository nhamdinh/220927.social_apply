const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    res.send("it is auth route");
});

//REGISTER
router.get("/register", async (req, res) => {
    try {
        /*         //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
 */
        //create new user
        const newUser = new User({
            username: "req.body.username",
            email: "req.body.email",
            password: "1234",
            /*  username: req.body.username,
            email: req.body.email,
            password: hashedPassword, */
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
