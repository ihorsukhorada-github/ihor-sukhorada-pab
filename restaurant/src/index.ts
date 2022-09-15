import express, { Express, Response } from "express"
import "dotenv/config"
import { connect } from "mongoose"

import DanieController from "./controller/DanieController"
import PracownikController from "./controller/PracownikController"
import ProduktController from "./controller/ProduktController"
import RestauracjaController from "./controller/RestautacjaController"
import RezerwacjaController from "./controller/RezerwacjaController"
import StolikController from "./controller/StolikController"
import ZamowienieController from "./controller/ZamowienieController"

const app: Express = express()
const { PORT = 3000 } = process.env

app.use(express.json())
app.use(express.urlencoded())

connect(`${ process.env.MONGO_URI }`)
    .then((_) => console.log("Connected to MongoDB"))
    .catch((err:any) => console.log("Failed to connect to MongoDB. Error: " + err))

app.get("/", (_, res: Response) => res.json({ "hello": "world" }))

app.use("/danie", DanieController)
app.use("/pracownik", PracownikController)
app.use("/produkt", ProduktController)
app.use("/restauracja", RestauracjaController)
app.use("/rezerwacja", RezerwacjaController)
app.use("/stolik", StolikController)
app.use("/zamowienie", ZamowienieController)

app.listen(PORT)