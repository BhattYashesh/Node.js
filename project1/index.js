const http = require("http");

const port = 9999;

const PortHandler = (req,res)=>{
    res.write("<h1><i>Server is started on this Port : 9999<i></h1>");
    res.end();
}

const server = http.createServer(PortHandler);

server.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server is started on port : " + port);
})

