const multer = require("multer");
const fileUpload = multer().single("file");
const fileConfig = require("../config/fileConfig");
const fileService = require("../services/fileService");
const MAX_FILE_SIZE_ALLOWED_BYTES = 2000000; // 2 MB -> 1000 bytes = 1kb, 1000000 = 1MB

const statistics = async (req, res) => {
  fileUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer ERROR: ", err);
      if (err.code === fileConfig.LIMIT_UNEXPECTED_FILE) {
        res.status(400).json({
          message: fileConfig.MULTIPLE_FILES_ERROR_MESSAGE,
        });
        return;
      }
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("Error: ", error);
      res.status(500).json({
        message: fileConfig.FILE_UPLOAD_ERROR_MESSAGE,
      });
      return;
    }

    try {
      const file = req.file;
      // validate if file is present
      if (!file) {
        res.status(400).json({
          message: fileConfig.FILE_NOT_FOUND_ERROR_MESSAGE,
        });
        return;
      }
      // validate file type
      if (file?.mimetype !== fileConfig.FILE_TYPE_TEXT) {
        res.status(400).json({
          message: fileConfig.FILE_TYPE_ERROR_MESSAGE,
        });
        return;
      }
      // validate file size
      if (file?.size > MAX_FILE_SIZE_ALLOWED_BYTES) {
        res.status(400).json({
          message: `File size should be less than ${
            MAX_FILE_SIZE_ALLOWED_BYTES / 1000
          } KB.`,
        });
        return;
      }

      const stats = fileService.textStatistics(file?.buffer?.toString());

      res.status(200).json({
        status: "success",
        data: stats,
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({
        message: fileConfig.SERVER_ERROR_MESSAGE,
      });
      return;
    }
  });
};

module.exports = {
  statistics,
  fileUpload,
};
