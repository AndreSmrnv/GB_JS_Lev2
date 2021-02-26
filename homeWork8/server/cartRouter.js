const express = require("express");
const fs = require("fs");
const router = express.Router();
const handler = require("./handler");

router.get("/", (req, res) => {
  fs.readFile("../server/db/userIdCart.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});
router.get("/getBasket.json", (req, res) => {
  fs.readFile("../server/db/userIdCart.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});
router.post("/", (req, res) => {
  handler(req, res, "add", "../server/db/userIdCart.json");
});
router.put("/:id", (req, res) => {
  handler(req, res, "change", "../server/db/userIdCart.json");
});
router.delete("/:id", (req, res) => {
  handler(req, res, "remove", "../server/db/userIdCart.json");
});

module.exports = router;
