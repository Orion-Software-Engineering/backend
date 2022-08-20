import multer from 'multer'
import DataUriParser from "datauri/parser";
import path from "path";
import {Request} from 'express';

const storage = multer.memoryStorage()
const multerUploads = multer({storage}).single('cover-image')

const parser = new DataUriParser();
const dataUri = (req: Request) => {
    if (req.file)
        parser.format(path.extname(req.file.originalname).toString(),
            req.file.buffer)
}

export {multerUploads, dataUri}
