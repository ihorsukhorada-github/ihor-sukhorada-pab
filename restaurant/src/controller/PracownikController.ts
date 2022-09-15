import { Router, Request, Response } from "express";
import Pracownik from "../entity/Pracownik"

const controller: Router = Router()

controller.get("/", (req: Request, res: Response) => {
    Pracownik.find()
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send(err));
})

controller.get("/:id", (req: Request, res: Response) => {
    Pracownik.findById(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.post("/", (req: Request, res: Response) => {
    const pracownik = new Pracownik({
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        stanowisko: req.body.stanowisko
    });
    
    pracownik
        .save()
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Incorrect data"))
})

controller.put("/:id", (req: Request, res: Response) => {
    Pracownik.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.delete("/:id", (req: Request, res: Response) => {
    Pracownik.findByIdAndRemove(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not available or removed"))
})

export default controller