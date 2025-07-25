const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
console.log("multer.js has been loaded");
// Ensure Uploads directory exists
const uploadDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return cb(new Error('Invalid file format. Only JPG, JPEG, PNG, GIF, and WEBP are allowed.'), false);
  }
  cb(null, true);
};

const fileUpload = (fieldName) => (req, res, next) => {
  console.log(`fileUpload middleware activated for field: ${fieldName}`);
  multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  }).single(fieldName)(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ data: { success: false, message: err.message } });
    }
    console.log('Uploaded file:', req.file ? req.file.path : 'No file');
    console.log('Multer - req.body:', req.body);  // <-- Add this
console.log('Multer - req.file:', req.file);

    next();
  });
};

module.exports = fileUpload;