const express = require("express");
const rateLimit = require("express-rate-limit");
const aiController = require("../controllers/ai.controller");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,             // 5 requests per minute per IP
  message: "Too many requests. Please wait a minute.",
});

router.post("/get-review", limiter, aiController.getReview);

module.exports = router;