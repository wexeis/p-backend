
import asyncHandler from "async-handler";
import skills from "../models/skills.js";
import multer from "multer";
import path from "path";


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





export const getAllSkills = (req, res) => {
  skills.find({}, (error, allSkills) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(allSkills);
  });
};

export const enterSkills =  async (req, res) => {
  try {
  
  const newDocument =  new skills({
    quote: req.body.quote,
    image: req.file.path,
    description: req.body.description,
  
  });

  
 

  await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const findAnSkills = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const document = await skills.findById(id);
    if (!document) return res.status(404).send("No document found with the given ID.");
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deleteAnSkills = async (req, res) => {
  try {
    const id = req.params.id;
    await skills.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const updateAnSkills = async (req, res) => {
  try {
    const id = req.params.id;
    const quote = req.body.quote;
    const description = req.body.description;
    const image = req.file.path;

    console.log(req.body.description);
    console.log(req.body.quote);

    const aboutDoc = await skills.findByIdAndUpdate(id, {
      $set: { quote, description, image },
    });

    if (!aboutDoc) return res.status(404).send("Document not found");
    res.status(200).json("Document updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating document in the database");
  }
};
