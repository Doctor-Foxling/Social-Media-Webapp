const express = require("express");
const router = express.Router();

// @Route   GET api/profile/test
// @Desc    tests profile route
// @acess   Public
router.get("/test", (req, res) => res.json({ msg: "Profile Work" }));

module.exports = router;
