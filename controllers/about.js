
import asyncHandler from "async-handler";
import about from "../models/about.js";
import multer from "multer";
import path from "path";


// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     }
//   });
//   const uploadImage = multer({
//     storage:storage
//   })


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



export const getAllAbout = (req, res) => {
  about.find({}, (error, abouts) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(abouts);
  });
};

export const enterAbout =  (req, res) => {
  console.log('1')
  console.log(req.body.quote)
  console.log('2')
  console.log(req.body.descripion)
  console.log('3')
  console.log(req.body)
  console.log('4')
  
  const newDocument =  new about({
    quote: req.body.quote,
    image: req.file.path,
    description: req.body.description,
  
  });

  
 

  newDocument.save((err, newDocument) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(newDocument);
  });
};

export const findAnAbout = (req, res) => {
  const id = req.params.id;
  console.log(id)
  about.findById(id, (error, document) => {
    if (error) return res.status(500).send(error);
    if (!document)
      return res.status(404).send("No document found with the given ID.");

    res.status(200).json(document);
  });
};

export const deleteAnAbout = (req, res) => {
  const id = req.params.id;
  about.deleteOne({ _id: id }, (error) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ message: "Document deleted successfully." });
    }
  });
};

export const updateAnAbout = (req, res) => {
  const id = req.params.id;
  const quote = req.body.quote;
  const description = req.body.description;
  const image = req.file.path;

  console.log(req.body.description)
  console.log(req.body.quote)

  about.findByIdAndUpdate(
    id,
    { $set: { quote, description, image } },
    (error, aboutDoc) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error updating document in the database");
      }

      if (!aboutDoc) {
        return res.status(404).send("Document not found");
      }

      res.status(200).json("Document updated successfully.");
    }
  );
};
