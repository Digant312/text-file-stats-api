const express = require("express");
const fileRoutes = require("./src/routes/fileRouter");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/files", fileRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
