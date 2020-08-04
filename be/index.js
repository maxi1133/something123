const app = require("express")();

////////////// middle ware

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());



////////////// Connect DB
  


    //const { fbAdmin } = require("./db/firebase");

    //const bucket = fbAdmin.storage().bucket();

    // bucket.getFiles((e, files) => {
    //   files.forEach(async (val) => {
    //     let url = await val.getSignedUrl({ action: "read", expires: "03-09-2500" });
    //     console.log(url);
    //   });
    // });



///////////////////////////////////////////////////////////////// Route



const fs = require('fs')
// const inspect = require('util').inspect;
const multer = require('multer')
const path = require('path')
            

// const busboyBodyParser = require('busboy-body-parser');
// app.use(busboyBodyParser());

            
//app.use(multer.array())

// app.post("/upload", (req, res ) => {
//   var Busboy = require('busboy');

//   let busboy = new Busboy({headers : req.headers});

//   busboy.on('file',(fieldname, file, filename, encoding, mimetype ) => {
//     console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' 
//       + encoding + ', mimetype: ' + mimetype);
//   });

// });

const imageUploader = multer({ dest: 'images/' }); // (**)

app.post('/upload', imageUploader.single('hinh'), (req, res) => {
  let processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
  let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
  orgName = orgName.trim().replace(/ /g , "-")
  const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
  // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
  const newFullPath = `${fullPathInServ}-${orgName}`;
  fs.renameSync(fullPathInServ, newFullPath);
  res.send({status: true , message: 'file uploaded',fileNameInServer: newFullPath});
 
})

app.get('/:name', (req, res) => 
{
  let fileName = req.params.name;
  //console.log('fileName', fileName);
  if (!fileName) 
  {
      return res.send({
          status: false,
          message: 'no filename specified',
      })
  }
  res.sendFile(path.resolve(`./images/${fileName}`));
})



///////////////////////////
////////////
//////////////////////////      SERVER


const port = 4000;
var http = require("http");
var server = http.createServer(app);
server.listen(port, () => 
{
  console.log("Server listen on port : " + port);
});



///////////// Admin Account

let AdminUser = 'Admin'
let AdminPassword ='1475369'

////////////////////////////////
/////////////////////////////// Socket


const socket = require("socket.io").listen(server);
socket.on("connection", (so)=>{

  

  //Admin
    so.on('Someone_Tryto_LogToAdmin',data => 
    {
      console.log(so.id +'  SomeoneLogToAdmin ');
      //so.join('AdminRoom');
    })

    so.on('Admin_Login',data => {
      let { taikhoan , matkhau } = data
      if(taikhoan === AdminUser && matkhau === AdminPassword) 
      {
        so.emit('AdminLogin_res',
          {
            stt : true,
            msg :' đăng nhập thành còng'
          })
      }
      else 
      {
        so.emit('AdminLogin_res',
          {
            stt : false,
            msg :'Sai rồi nhéeee'
          })
      }
    })



  //Client



    so.on('ClientConnected',data => 
    {
      console.log(so.id);
      so.to('AdminRoom').emit('new_Client_connected',{id : so.id});
    })



});