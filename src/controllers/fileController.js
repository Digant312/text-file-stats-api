const upload = async (req, res) => {
  console.log("File uplaod controller....");

  res.status(200).json({
    status: "success",
    message: "File uploaded successfully!",
  });
};

module.exports = {
  upload,
};
