const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
    try {
      const code = req.body.code;
  
      if (!code) {
        return res.status(400).send("Code is required");
      }

      if (code.length > 8000) {
        return res.status(400).send("Code too large. Please reduce size.");
      }
  
      const response = await aiService(code);
      res.send(response);
  
    } catch (err) {
      console.error("Gemini Error:", err.message);
  
      if (err.status === 429) {
        return res.status(429).send("AI is busy. Try again later.");
      }
  
      res.status(500).send("Internal server error");
    }
};
  