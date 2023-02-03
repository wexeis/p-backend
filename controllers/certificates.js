
import asyncHandler from "async-handler";
import certificates from "../models/certificates.js";
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






export const getAllCertificates = (req, res) => {
  certificates.find({}, (error, allcertificates) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(allcertificates);
  });
};

export const enterCertificates = (req, res) => {
  const newDocument = new certificates({
   
    image: req.file.path,
  

  });

  newDocument.save((err, newDocument) => {
    if (err) return res.status(500).send(err);
    res.send(newDocument);
  });
};

export const findACertificates = (req, res) => {
  const id = req.params.id;
  console.log(id)
  certificates.findById(id, (error, document) => {
    if (error) return res.status(500).send(error);
    if (!document)
      return res.status(404).send("No document found with the given ID.");

    res.status(200).json(document);
  });
};

export const deleteACertificates = (req, res) => {
  const id = req.params.id;
  certificates.deleteOne({ _id: id }, (error) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json({ message: "Document deleted successfully." });
    }
  });
};
export const updateACertificates = (req, res) => {
  const id = req.params.id;
 
  const image = req.file.path

  certificates.findByIdAndUpdate(
    id,
    { $set: { image } },
    (error, certificatesDoc) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error updating document in the database");
      }

      if (!certificatesDoc) {
        return res.status(404).send("Document not found");
      }

      res.send("Document updated successfully.");
    }
  );
};
