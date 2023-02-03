import express from "express";

import {
getAllSkills,
  enterSkills,
  findAnSkills,
  deleteAnSkills,
  updateAnSkills,
  upload
} from "../controllers/skills.js";
const router = express.Router();

router.get("/", getAllSkills);

router.post("/", upload.single('file') ,enterSkills);

router.get("/:id", findAnSkills);

router.delete("/:id", deleteAnSkills);

router.patch("/:id",upload.single('file') ,updateAnSkills);

export default router;