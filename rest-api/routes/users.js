const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send("it is user route");
});

module.exports = router;
