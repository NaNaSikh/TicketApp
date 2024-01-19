const express = require ("express");
const cors  = require("cors");
require("./utils/config");
const app = express();
const User = require("./utils/User");
const MovieTicket = require("./utils/MovieTickets")
const MusicTicket = require("./utils/MusicTickets")
const SportTicket = require("./utils/SportTickets");
app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
})

app.post("/signin" , async (req,resp) => {
  try{
    if(req.body.email && req.body.password ){
  let user1 = await  User.findOne(req.body).select("-password");
  if (user1) {
    resp.send(user1);
  } else {
    resp.send({"result":"No User Found"});
  }
} else resp.send({"result":"No User   "});
} catch (error) {
  console.error(error);
  resp.status(500).send("Internal Server Error");
}
})



app.post("/MovieTicket" , async (req,resp) =>{
  let ticket = new MovieTicket(req.body)
  let result = await ticket.save();
  resp.send(result)
})

app.post("/MusicTicket" , async (req,resp) =>{
  let ticket = new MusicTicket(req.body)
  let result = await ticket.save();
  resp.send(result)
})

app.post("/SportTicket" , async (req,resp) =>{
  let ticket = new SportTicket(req.body)
  let result = await ticket.save();
  resp.send(result)
})


app.get("/getMusicTickets", async (req,resp) => {
  const ticket = await MusicTicket.find();
  if(ticket.length>0){
    resp.send(ticket);
  } else {
    resp.send({result:"No Tickets found"});
  }

})

app.get("/getSportTickets", async (req,resp) => {
  const ticket = await SportTicket.find();
  if(ticket.length>0){
    resp.send(ticket);
  } else {
    resp.send({result:"No Tickets found"});
  }

})

app.get("/getMovieTickets", async (req,resp) => {
  const ticket = await MovieTicket.find();
  if(ticket.length>0){
    resp.send(ticket);
  } else {
    resp.send({result:"No Tickets found"});
  }

})


app.get('/getMovieTicketDetails/:id', async (req, resp) => {
  const ticketId = req.params.id;
  try {
    const ticket = await MovieTicket.findById(ticketId);

    if (ticket) {
      resp.send(ticket);
    } else {
      resp.status(404).send({ result: "No Tickets found" });
    }
  } catch (error) {
    resp.status(500).send({ error: "Internal Server Error" });
  }
});

app.get('/getSportTicketDetails/:id', async (req, resp) => {
  const ticketId = req.params.id;
  try {
    const ticket = await SportTicket.findById(ticketId);

    if (ticket) {
      resp.send(ticket);
    } else {
      resp.status(404).send({ result: "No Tickets found" });
    }
  } catch (error) {
    resp.status(500).send({ error: "Internal Server Error" });
  }
});

app.get('/getMusicTicketDetails/:id', async (req, resp) => {
  const ticketId = req.params.id;
  try {
    const ticket = await MusicTicket.findById(ticketId);

    if (ticket) {
      resp.send(ticket);
    } else {
      resp.status(404).send({ result: "No Tickets found" });
    }
  } catch (error) {
    resp.status(500).send({ error: "Internal Server Error" });
  }
});


app.get("/getMyTickets/:email", async (req, resp) => {
  const email = req.params;
  try {
    const user = await User.findOne(email).select("myTicket myTicketCategory ticketNumber");

    if (user) {
      resp.send(user);
    } else {
      resp.status(404).send({ result: "No Tickets found" });
    }
  } catch (error) {
    resp.status(500).send({ error: "Internal Server Error" });
  }

});


app.post("/addTicket/:email", async (req, resp) => {
  const { email } = req.params;  // Extract email from req.params
  const { ticketId, category, number } = req.body;
  
  try {
    const user = await User.findOne({ email });  // Use email to find the user

    if (user) {
      user.myTicket.push(ticketId);
      user.myTicketCategory.push(category);
      user.ticketNumber.push(number);
      await user.save();
      resp.json({ result: "Ticket added successfully", user });
    } else {
      resp.status(404).send({ result: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/changeMovieTicket/:id", async (req, resp) => {
  const {id} = req.params; 
  const {numberOfSeats} = req.body;
  try {
    const ticket = await MovieTicket.findById({ _id: id });  // Use email to find the user

    if (ticket) {
      ticket.numberOfSeats = numberOfSeats;
      await ticket.save();
      resp.json(ticket);
    } else {
      resp.status(404).send({ result: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/changeMusicTicket/:id", async (req, resp) => {
  const {id} = req.params; 
  const {numberOfSeats} = req.body;
  try {
    const ticket = await MusicTicket.findById({ _id: id });  // Use email to find the user

    if (ticket) {
      ticket.numberOfSeats = numberOfSeats;
      await ticket.save();
      resp.json(ticket);
    } else {
      resp.status(404).send({ result: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/changeSportTicket/:id", async (req, resp) => {
  const {id} = req.params; 
  const {numberOfSeats} = req.body;
  try {
    const ticket = await SportTicket.findById({ _id: id });  // Use email to find the user

    if (ticket) {
      ticket.numberOfSeats = numberOfSeats;
      await ticket.save();
      resp.json(ticket);
    } else {
      resp.status(404).send({ result: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(5000);