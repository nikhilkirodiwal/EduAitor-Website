import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/"];

  const isAllowed = allowedTypes.some((type) => file.mimetype.startsWith(type));

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only image file is allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB 
  },
});

export default upload;
