import { Router, Request, Response } from "express";
import Zamowienie from "../entity/Zamowienie"

const controller: Router = Router()

controller.get("/", (req: Request, res: Response) => {
    Zamowienie.find()
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send(err));
})

controller.get("/:id", (req: Request, res: Response) => {
    Zamowienie.findById(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.post("/", (req: Request, res: Response) => {
    const zamowienie = new Zamowienie({
        pracownik: req.body.pracownik,
        pozycje: req.body.pozycje,
        status: req.body.status,
        stolik: req.body.stolik,
        kwota: req.body.kwota
    })
    
    zamowienie
        .save()
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Incorrect data"))
})

controller.put("/:id", (req: Request, res: Response) => {
    Zamowienie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.delete("/:id", (req: Request, res: Response) => {
    Zamowienie.findByIdAndRemove(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not available or removed"))
})

export default controller