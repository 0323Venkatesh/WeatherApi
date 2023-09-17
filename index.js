import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "your weather apikey required";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"



app.get("/", (req, res) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const today  = new Date();
    const dayType = today.toLocaleDateString("en-US", options);
    res.render("index.ejs",{
        dateType : dayType,
        
    });
});

app.post("/submit", async (req,res)=>{
  try {
    const city = req.body.city;
    const result = await axios.get(apiUrl,{
      params: {
        q : city,
        appid : apiKey,
      } 
  });
    const respose = result.data;
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const today  = new Date();
    const dayType = today.toLocaleDateString("en-US", options);
    res.render("index.ejs" , {
      response : respose,
      dateType : dayType,
      city : city
    })

  } catch (error) {
    res.status(404).send(error.message);
  }
    
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});