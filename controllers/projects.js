
import asyncHandler from "async-handler";
import projects from "../models/projects.js"
import multer from "multer";
import path from "path";
import { title } from "process";


const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null, file.originalname);   
  }
});
export const upload = multer({
  storage: storage,
  limits : {fileSize : 5000000}
})




export const getAllProjects = (req, res) => {
  console.log('1')
  projects.find({}, (error, allprojects) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(allprojects);
  });
};

export const enterProjects = (req, res) => {
  const newDocument = new projects({
    number: req.body.number,
    image: req.file.path,
    description:req.body.description,
    logo: req.file.path,
    title: req.body.title,
    link : req.body.link,
  });

  newDocument.save((err, newDocument) => {
    if (err) return res.status(500).send(err);
    res.send(newDocument);
  });
};

export const findAProject = (req, res) => {
  const id = req.params.id;
  projects.findById(id,(error, document) => {
    if (error) return res.status(500).send(error);
    if (!document)
      return res.status(404).send("No document found with the given ID.");

    res.status(200).json(document);
  });
};


export const deleteAProject = (req, res) => {
  const id = req.params.id;
  projects.deleteOne({ _id: id }, (error) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ message: "Document deleted successfully." });
    }
  });
};

export const updateAProject= (req, res) => {
  console.log("update has started")
  const id = req.params.id;
 
  const title = req.body.title;
  const description = req.body.description;
  const link = req.body.link;
  const number = req.body.number;

  
  const image = req.file.path;

  projects.findByIdAndUpdate(
    id,
    { $set: { title, description, image, link, number } },
    (error, projectDoc) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error updating document in the database");
      }

      if (!projectDoc) {
        return res.status(404).send("Document not found");
      }

      res.status(200).json("Document updated successfully.");
    }
  );
};  