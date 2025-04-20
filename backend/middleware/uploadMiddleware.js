const multer = require("multer");
const path = require("path");

//Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Sadece .jpg, .jpeg, .png veya .webp formatları geçerlidir."),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
