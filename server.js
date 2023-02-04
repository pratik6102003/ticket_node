const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

function discount(gender, cost){
    if (gender == "Female"){
        cost = cost - cost/4
}
    return cost
}

function billing(age, height, gender) {
    var cost = 0
    if (height < 120){
        return "Sorry, you are too short for the ride."
    }
    else{
        if (age <= 12){
            cost += 10
            category = "Child"
        }
        else {
            cost += 15
            category = "Adult"
        } 
        cost = discount(gender, cost)
        return String(cost)
    }
    
}

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    var age = Number(req.body.age)
    var height = Number(req.body.height)
    var gender = req.body.gender
    price = billing(age, height, gender)
    console.log(price)
    res.send(price)
})
app.listen(3000, function(){
    console.log("server is running on port 3000")
})