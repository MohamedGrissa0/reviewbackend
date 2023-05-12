
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const app = express()
const mongoose = require ("mongoose")
const authroute = require("./Routes/auth")
const usersroute = require("./Routes/users")
const reviewroute = require("./Routes/Review")
const postsroute = require("./Routes/posts")
const contactroute = require("./Routes/contact")
const dialogflowroute = require("./Routes/dialogflow")
const cookieSession = require("cookie-session")
const passport = require("passport");
const bodyParser=require("body-parser");
const passportSetup = require("./passport");

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

  


app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use("/uploads", express.static("../../Dashboard/backend/uploads"));
mongoose.connect(process.env.MONGO_URL).then(console.log("DATABASE CONNECTED")).catch(err => {console.log(err)})
app.use("/api/auth" ,authroute)
app.use("/api/users" ,usersroute)
app.use("/api/review" ,reviewroute)
app.use("/api" ,postsroute)
app.use("/api" ,contactroute)
app.use("/api/chatbot",dialogflowroute)




app.get('/', async function(req,res)
{
    res.send('hey')
})








let port=process.env.PORT||4000;
app.listen(port,function()
{
    console.log(`port ${port} is running `)
}
)
