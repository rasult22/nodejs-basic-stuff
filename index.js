const http = require('http')
const path = require('path')
const fs = require('fs')
const { v4 } = require('uuid')

const server = http.createServer((request, response) => {
    // if(request.url === '/'){
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //       if(err) throw err
    //         response.writeHead(200,{ 'Content-Type': 'text/html' })
    //         response.end(content)
    //     })
    // }
    // if(request.url === '/about'){
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         if(err) throw err
    //         response.writeHead(200,{ 'Content-Type': 'text/html' })
    //         response.end(content)
    //     })
    // }
    // if(request.url === '/api/users'){
    //     const users = [
    //         {
    //             name: 'Bob Smith',
    //             age: 40,
    //             car: 'Ford'
    //         },
    //         {
    //             name: 'Elon Musk',
    //             age: 50,
    //             car: 'Tesla Motors'
    //         }
    //     ]
    //     response.writeHead(200, { 'Content-Type': 'application/json' })
    //     response.end(JSON.stringify(users))
    // }


    // Build file path
    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url)
    
    console.log(filePath)
    // Extension of file
    let extname = path.extname(filePath)

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type

    switch(extname) {
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
            contentType = 'image/jpg'
            break
    }

    //  Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    if (err) throw err

                    response.writeHead(200, { 'Content-Type': 'text/html' })
                    response.end(content, 'utf8')
                })
            } else {
                // some server error
                response.writeHead(500)
                response.end(`Server Error: ${err.code}`)
            }
        } else {
            // Success
             response.writeHead(200, {'Content-Type': contentType})
             response.end(content, 'utf8')
        }
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
    console.log('Server running on port ' + PORT)
})