/* const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    },
});
let onlineUsers = [];

const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) &&
        onlineUsers.push({ username, socketId });
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
        addNewUser(username, socket.id);
    });
    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getNotification", {
            senderName,
            type,
        });
    });
    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});
io.listen(5000); */

const express = require("express");
const http = require("http");

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

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

socketIo.on("connection", (socket) => {
    /*     console.log("New client connected" + socket.id);
     */
    socket.emit("setIdSocketId", socket.id);

    socket.on("sendDataFromClient", function (data) {
        console.log(data);
        socketIo.emit("sendDataFromServer", { data });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server socketIo chay tren cong 5000");
});

app.listen(8800, () => {
    console.log("Backend server is running!");
});
