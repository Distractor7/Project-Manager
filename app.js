// Import for cors to enable cross origin resource sharing.
//Import for express.
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

//An initial array of objects to store the web projects objects within.
const webProjects = [
  {
    id: 1,
    title: "React Game!",
    description: "Tic tac toe game created using Create React app.",
    URL: "http://heroku/myapp/game",
  },
  {
    id: 2,
    title: "Online store",
    description: "Online store created with HTML, CSS, and JavaScript.",
    URL: "https://git.com/myrepos/shop/index",
  },
];

//Returns the list of web projects.
app.get("/api", (req, res) => {
  res.status(200).json(webProjects);
});

//Adds a new web project to the list.
app.post("/api", (req, res) => {
  const newItem = {
    id: webProjects.length + 1,
    title: req.body.title,
    description: req.body.description,
    URL: req.body.URL,
  };
  webProjects.push(newItem);
  res.status(201).json(webProjects);
});

//Updates an existing web project with the specified ID.
app.put("/api/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = webProjects.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  item.title = req.body.title || item.title;
  item.description = req.body.description || item.description;
  item.URL = req.body.URL || item.URL;

  res.status(200).json(item);
});

//Deletes the web project with the specified ID.
app.delete("/api/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = webProjects.findIndex((i) => i.id === itemId);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  webProjects.splice(index, 1);
  res.status(204).json({ message: "Item deleted successfully" });
});

//LISTENING ON PORT 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
