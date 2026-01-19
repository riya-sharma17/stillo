import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { imageMimeRegex, videoMimeRegex } from "../utils/regex";
import { ERROR_RESPONSE } from "../utils/message";

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    imageMimeRegex.test(file.mimetype) ||
    videoMimeRegex.test(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error(ERROR_RESPONSE.FILE_UPLOAD_ERROR));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, 
  },
});

export default upload;
