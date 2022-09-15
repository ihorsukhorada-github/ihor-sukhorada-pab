import { Router, Request, Response } from "express";
import Danie from "../entity/Danie"

const controller: Router = Router()

controller.get("/", (req: Request, res: Response) => {
    Danie.find()
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send(err));
})

controller.get("/:id", (req: Request, res: Response) => {
    Danie.findById(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.post("/", (req: Request, res: Response) => {
    const danie = new Danie({
        nazwa: req.body.nazwa,
        cena: req.body.cena,
        kategoria: req.body.kategoria,
    });
    
    danie
        .save()
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Incorrect data"))
})

controller.put("/:id", (req: Request, res: Response) => {
    Danie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.delete("/:id", (req: Request, res: Response) => {
    Danie.findByIdAndRemove(req.params.id)
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send("Not available or removed"))
})

export default controller