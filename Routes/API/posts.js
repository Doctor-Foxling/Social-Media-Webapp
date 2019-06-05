const express = require("express");
const router = express.Router();

// @Route   GET api/posts/test
// @Desc    tests posts route
// @acess   Public
router.get("/test", (req, res) => res.json({ msg: "Posts Work" }));

module.exports = router;
