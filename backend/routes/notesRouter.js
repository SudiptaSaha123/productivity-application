const express = require("express");
const router = express.Router();

const {
  allNotes,
  createNote,
  editNote,
  deleteNote,
} = require("../controllers/Note");
const authenticateUser = require("../middlewares/authenticateUser");

router.get("/", authenticateUser, allNotes);
router.post("/", authenticateUser, createNote);
router.put("/:id", authenticateUser, editNote);
router.delete("/:id", authenticateUser, deleteNote);

module.exports = router;
