const router = require("express").Router();
const c = require("../controllers/chatbot.controller");

router.get("/info", c.info);
router.get("/developer", c.developerInfo);
router.get("/message", c.chat);
router.post("/message", c.chat);

module.exports = router;
