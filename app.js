//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName= req.body.fname;
    const lastName= req.body.lname;
    const email= req.body.email;
    
    const date = {
        members : [  
            {
                email_address:email,
                status:"subscribed",  
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(date);
    const url = "https://us20.admin.mailchimp.com/lists/e58530d450.";
    const options= {
        method:"POST",
        auth:"jagadish456:c01db19dd204d66350bf25934b7f5273-us20"
    };
    const request= https.request(url,options,function(response){

        if (response.statusCode === 200) {
            res.send("successfully subscribed")}
            else if (response.statusCode===404) {
                res.send("Not subscribed")
            }
        
         response.on("data",function(data){
             console.log(JSON.parse(data));
         })  
    })
    request.write(jsonData);
    request.end();

    
})


app.listen(3000, function(){
    console.log("Server is up")
});

//API key
//c01db19dd204d66350bf25934b7f5273-us20

//audience id
//e58530d450