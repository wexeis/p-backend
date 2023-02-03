import express from "express";

import {
  getAllAbout,
  enterAbout,
  findAnAbout,
  deleteAnAbout,
  updateAnAbout,
   upload
} from "../controllers/about.js";
const router = express.Router();

router.get("/", getAllAbout);

router.post("/",upload.single('file'), enterAbout);

router.get("/:id", findAnAbout);

router.delete("/:id", deleteAnAbout);

router.patch("/:id", upload.single('file') ,updateAnAbout);

export default router;
