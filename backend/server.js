require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const workoutsRoutes = require("./routes/workouts");
mongoose.set("strictQuery", false);
// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use("/api/workouts", workoutsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}!`));
  })
  .catch((err) => {
    console.log("The Error: " + err);
  });
