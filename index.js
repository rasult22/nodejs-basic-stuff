const http = require('http')
const path = require('path')
const fs = require('fs')
const { v4 } = require('uuid')

const server = http.createServer((request, response) => {
    if(request.url === '/'){
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
          if(err) throw err
            response.writeHead(200,{ 'Content-Type': 'text/html' })
            response.end(content)
        })
    }
    if(request.url === '/about'){
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if(err) throw err
            response.writeHead(200,{ 'Content-Type': 'text/html' })
            response.end(content)
        })
    }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
    console.log('Server running on port ' + PORT)
})