const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send("it is auth route");
});

module.exports = router;
