const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const uniqid = require("uniqid");

const data = [];
const limit = 11

router.post("/email", auth, async (req, res) => {
  try {
    if (
      req.body.to.length === 0 ||
      req.body.from.length === 0 ||
      req.body.to === req.body.from
    ) {
      throw new Error("new email must have sender and receiver");
    }
    const newEmail = {
      ...req.body,
      id: uniqid(),
      deleted: false,
      createdAt: new Date(),
    };
    data.push(newEmail);
    res.status(201).send(newEmail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/emails/inbox", auth, async (req, res) => {
  try {
    const skip = parseInt(req.query.skip);

    const emails = data
      .filter((email) => email.from === req.userId && !email.deleted)
      .slice(skip, skip + limit);
    res.send(emails);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/emails/sent", auth, async (req, res) => {
  try {
    const skip = parseInt(req.query.skip);
    const emails = data
      .filter((email) => email.to === req.userId && !email.deleted)
      .slice(skip, skip + limit);
    res.send(emails);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/emails/all", auth, async (req, res) => {
  try {
    const skip = parseInt(req.query.skip);
    const emails = data
      .filter(
        (email) =>
          !email.deleted &&
          (email.to === req.userId || email.from === req.userId)
      )
      .slice(skip, skip + limit);
    res.send(emails);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/email/:id", auth, async (req, res) => {
  try {
    const index = data.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      throw new Error("Could not find the item");
    }
    data[index].deleted = true;

    res.send(data[index]);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
