const port=process.env.PORT ||5500;
const express=require("express");
const app=express();
const server=require("http").createServer(app)
server.listen(port,()=>{
    console.log(`Server is listening on Port ${port}`);
})



app.use(express.static(__dirname + '/public'))

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
})

const io=require("socket.io")(server);
io.on('connection', (socket) => {
  console.log('Connected...')
  socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg)
  })

})
