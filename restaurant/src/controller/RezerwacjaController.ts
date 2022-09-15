import { Router, Request, Response } from "express";
import Rezerwacja from "../entity/Rezerwacja"

const controller: Router = Router()

controller.get("/", (req: Request, res: Response) => {
    Rezerwacja.find()
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send(err));
})

controller.get("/:id", (req: Request, res: Response) => {
    Rezerwacja.findById(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.post("/", (req: Request, res: Response) => {
    const rezerwacja = new Rezerwacja({
        stolik: req.body.stolik,
        start: req.body.start,
        koniec: req.body.koniec,
        klient: req.body.klient
    })
    
    rezerwacja
        .save()
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Incorrect data"))
})

controller.put("/:id", (req: Request, res: Response) => {
    Rezerwacja.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.delete("/:id", (req: Request, res: Response) => {
    Rezerwacja.findByIdAndRemove(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not available or removed"))
})

export default controller