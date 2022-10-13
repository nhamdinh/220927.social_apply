const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();
app.use(
    cors({
        origin: "*",
        /* , methods: ["POST", "PUT"] */
    })
);
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

app.use(
    "/commons",
    express.static(path.join(__dirname, "public/images/commons"))
); // server images
app.use("/users", express.static(path.join(__dirname, "public/images/users"))); // server images
app.use("/posts", express.static(path.join(__dirname, "public/images/posts"))); // server images

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/posts");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
    }
});

app.get("/", (req, res) => {
    res.send("welcome to homepage");
});

app.get("/users", (req, res) => {
    res.send("welcome to users");
});
app.get("/posts", (req, res) => {
    res.send("welcome to posts");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});
