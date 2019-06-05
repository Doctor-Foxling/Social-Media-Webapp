const express = require("express");
const router = express.Router();

// @Route   GET api/users/test
// @Desc    tests users route
// @acess   Public
router.get("/test", (req, res) => res.json({ msg: "USers Work" }));

module.exports = router;
