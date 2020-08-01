const app = require("express")();

////////////// middle ware

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

////////////// Connect DB
const { fbAdmin } = require("./db/firebase");

const bucket = fbAdmin.storage().bucket();

// bucket.getFiles((e, files) => {
//   files.forEach(async (val) => {
//     let url = await val.getSignedUrl({ action: "read", expires: "03-09-2500" });
//     console.log(url);
//   });
// });

////////////// Route

app.post("/upload", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//////////////      SERVER
const port = 4000;
var http = require("http");
var server = http.createServer(app);
server.listen(port, () => {
  console.log("Server listen on port : " + port);
});


///////////////////// Socket


const socket = require("socket.io").listen(server);
socket.on("connection", (so) => 
{
  console.log("new Connected !");
});
