import { Router, Request, Response } from "express";
import Produkt from "../entity/Produkt"

const controller: Router = Router()

controller.get("/", (req: Request, res: Response) => {
    Produkt.find()
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send(err));
})

controller.get("/:id", (req: Request, res: Response) => {
    Produkt.findById(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.post("/", (req: Request, res: Response) => {
    const produkt = new Produkt({
        nazwa: req.body.nazwa,
        cena: req.body.cena,
        ilosc: req.body.ilosc,
        jednostkaMiary: req.body.jednostkaMiary
    });
    
    produkt
        .save()
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Incorrect data"))
})

controller.put("/:id", (req: Request, res: Response) => {
    Produkt.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.delete("/:id", (req: Request, res: Response) => {
    Produkt.findByIdAndRemove(req.params.id)
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send("Not available or removed"))
})

export default controller