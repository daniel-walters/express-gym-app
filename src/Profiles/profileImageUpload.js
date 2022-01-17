import multer from "multer";

const storage = multer.diskStorage({
  // image will be stored in public/reportImages folder
  destination: (req, file, callback) => {
    callback(null, "./public/profileImages/");
  },
  // define the name of uploaded image
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

// filter function to only accept certain image format
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(
      new Error("JPEG and PNG are the only accepted image formats"),
      false
    );
  }
};

// use this instance as a middleware in route
const uploadProfileImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export default uploadProfileImage;
