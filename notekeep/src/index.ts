import express, { Express, Request, Response } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { readFileSync, writeFileSync } from "fs"

import Note from './entity/Note'
import Tag from "./entity/Tag"
import User from './entity/User'
import AuthMiddleware from "./middleware/AuthMiddleware"

const app: Express = express();

app.use(express.json())

app.listen(3000);

class DataStorage {
    async readData(): Promise<void> {
        notes = JSON.parse(await readFileSync("./src/data/notes.json").toString())
        tags = JSON.parse(await readFileSync("./src/data/tags.json").toString())
    }

    async saveData(): Promise<void> {
        writeFileSync("./src/data/notes.json", JSON.stringify(notes))
        writeFileSync("./src/data/tags.json", JSON.stringify(tags))
    }
}

const dataStorage = new DataStorage()

let tags: Tag[] = [];
let notes: Note[] = [];
let users: User[] = [];

app.get("/users", AuthMiddleware, function (req: any, res) {
  if (req.user.admin) {
    res.send(users);
  } else {
    res.send(users.find((x) => x.email === req.user.email));
  }
});

app.post("/register", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.admin;

  let user: User = {
    id:Date.now(),
    email:email,
    admin:isAdmin,
    password:password,
  }
  
  const token = jwt.sign(user, process.env.JWT_KEY as string)

  console.log("User data: " + user)
  console.log("Token :" + token)

  users.push(user);
  res.send({token:token});
  }
);

app.get("/tags", AuthMiddleware, (req: Request, res: Response) => {
  dataStorage.readData()
  res.send(tags)
});

app.post("/tag", async function (req:any, res) {
  await dataStorage.readData()
  if (req.body.name) {
    const a = req.body.name.toLowerCase();
    const tagFind = tags.find((name) => name.name === a);

    if (tagFind) 
      res.status(404).send("Błąd 404 tag już istnieje");
    
    else {
      let tag: Tag = {
        name: req.body.name,
        id: Date.now(),
        user: req.user
      };
      tags.push(tag);
      res.status(200).send(tag);
      await dataStorage.saveData()
    }
  } else {
    res.status(404).send("Błąd 404 tag nie został utworzony");
    }
  }
);

app.delete("/tag/:id", async function (req, res) {
  await dataStorage.readData()
  const {id} = req.params;
  const ID = +id;
  tags = tags.filter((tag) => tag.id !== ID);
  await dataStorage.saveData()
  res.send("Tag został usunięty");
  }
);

app.put("/tag/:id", async (req: Request, res: Response) => {
  await dataStorage.readData()
  const { id } = req.params;
  const ID = +id;
  const name = req.body.name.toLowerCase();
  const tag = tags.find((note) => note.id === ID);
  
  if (name) tag!.name = name;
  
  res.send(tag);
  
  await dataStorage.saveData()
  }
);

app.get("/note/:id", async (req: Request, res: Response) => {
    await dataStorage.readData()
    
    const note = notes.find((note) => note.id === parseInt(req.params.id))

    if(note) {
        res.status(200).send(note)
    }
    else{
        res.status(404).send("Błąd 404");
    }
  }
)

app.get("/notes", async (req: Request, res: Response) => {
    await dataStorage.readData()
    res.send(notes)
  }
)

app.post("/note", async function (req: any, res: Response) {
  await dataStorage.readData()
  
  if (req.body.title && req.body.content) {
    let note: Note = {
      title: req.body.title,
      content: req.body.content,
      createDate: new Date().toISOString(),
      tags: req.body.tags,
      user:req.user.email,
      id: Date.now(),
    };

    let tag: Tag = {
      id: Date.now(),
      name: req.body.tags,
    };

    var idToString = note.id!.toString();

    if (tag.name === undefined) 
      tag = {
        id: Date.now(),
        name: "Default",
      };
 
    let tagNameToLowerCase=tag.name.toString().toLowerCase();

    const tagFind = tags.find((x) => x.name === tagNameToLowerCase);

    if (tagFind || tagNameToLowerCase === "default") {
      notes.push(note);
      await dataStorage.saveData()
    } else {
      tags.push(tag);
      notes.push(note);
      await dataStorage.saveData()
    }
    res.status(200).send(idToString);
  } else {
    res.status(404).send("Błąd 404 nie utworzono notatki");
  }
});

app.delete("/note/:id", async (req, res) => {
  await dataStorage.readData()
  const {id} = req.params;
  const ID = +id;
  notes = notes.filter((note) => note.id !== ID);
  await dataStorage.saveData()
  res.send("notes z podanym id została usunięta");
})

app.put("/note/:id",async (req, res) => {
  await dataStorage.readData()
  const { id } = req.params;
  const ID = +id;
  const { title, content, createDate, tags } = req.body;
  const note = notes.find((note) => note.id === ID);
  
  if (note == null) {
    res.status(404).send("Błąd 404: notes nie została wyszukana");
  }
  else {
    if (title) note!.title = title;
    if (content) note!.content = content;
    if (createDate) note!.createDate = createDate;
    if (tags) note!.tags = tags;
    
    res.send(note);
    await dataStorage.saveData()
  }
  }
)

