const root = require("./common/development")
const express = require('express');
const bodyparser = require('body-parser');

const fs = require('fs')

const cors = require('cors')

var folderPath = root.path


var app = express();
app.use(cors());

app.use('/getImageDetail' ,(req, res) => {
    return new Promise((resolve, reject)=> {
        try{
            var imgDetails = fs.statSync(folderPath+"/"+req.query.path);
            var reqImgDetails = {}
            reqImgDetails['size'] = imgDetails.size
            reqImgDetails['birthtime'] = imgDetails.birthtime
            resolve(res.status(200).send({
                data: reqImgDetails,
                status: true,
                error: null
            }))
        }
        catch(e) { 
            reject(res.status(404).send({
                status: false,
                error: {
                    code: 400,
                    message: "file Not Found"
                },
                data: {}
            })
        )}
    })
    
})

app.use('/:path?',(req,res) => {
    return new Promise((resolve, reject)=> { 
        try{
            if(req.params.path)
                var folderContents =  fs.readdirSync(folderPath+"/"+req.params.path)
            else 
                var folderContents =  fs.readdirSync(folderPath)
            var folderName = folderContents.filter((name) => !name.startsWith('.'))
            console.log(folderName)
            resolve(res.status(200).send({
                status: true,
                data: folderName,
                error: null
            }))
        }
        catch(e) {
            reject(res.status(404).send({
                status: false,
                error: {
                    code: 400,
                    message: "Not such directory found"
                },
                data: []
            }) 
        )}
    })
});

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.listen('3000', () => {
    console.log("Hey! my server is running at the port 3000");
})


