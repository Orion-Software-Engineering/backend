import multer from 'multer';

const storage = multer.memoryStorage();
const multerUploads = multer({storage}).single('cover-image');
export {multerUploads};
