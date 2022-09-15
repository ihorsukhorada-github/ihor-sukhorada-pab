import { Router, Request, Response } from "express";
import Restauracja from "../entity/Restauracja"

const controller: Router = Router()

controller.get("/", (req: Request, res: Response) => {
    Restauracja.find()
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send(err));
})

controller.get("/:id", (req: Request, res: Response) => {
    Restauracja.findById(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.post("/", (req: Request, res: Response) => {
    const restauracja = new Restauracja({
        nazwa: req.body.nazwa,
        adres: req.body.adres,
        telefon: req.body.telefon,
        nip: req.body.nip,
        email: req.body.email,
        www: req.body.www
    });
    
    restauracja
        .save()
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Incorrect data"))
})

controller.put("/:id", (req: Request, res: Response) => {
    Restauracja.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.delete("/:id", (req: Request, res: Response) => {
    Restauracja.findByIdAndRemove(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not available or removed"))
})

export default controller