const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));


app.use(express.static("public"));

app.post("/",function(req,res)
{
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const pass=req.body.pass;
    console.log(firstname+" "+lastname+" "+email+" "+pass);

    const data={
        members: [
            {
                email_address: email,
                password:pass,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }
    const audience_id;
    const jsondata= JSON.stringify(data);
    const url="https://us19.api.mailchimp.com/3.0/lists/"+audience_id;
    
    const api;
    const options={
        method:"POST",
        auth:"vinay:"+api;
    }
    const request =https.request(url,options,function(response){
        if (response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.send("failed");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    
    })
    request.write(jsondata);
    request.end(); 
    


})



app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})




app.listen(process.env.PORT || 3000,function(require,response)
{
    console.log("server started at 3000");
});
