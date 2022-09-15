import { Router, Request, Response } from "express";
import Stolik from "../entity/Stolik"

const controller: Router = Router()

controller.get("/", (req: Request, res: Response) => {
    Stolik.find()
        .then((result: any) => res.send(result))
        .catch((err: any) => res.send(err));
})

controller.get("/:id", (req: Request, res: Response) => {
    Stolik.findById(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.post("/", (req: Request, res: Response) => {
    const stolik = new Stolik({
        nazwa: req.body.nazwa,
        iloscOsob: req.body.iloscOsob,
        status: req.body.status
    })
    
    stolik
        .save()
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Incorrect data"))
})

controller.put("/:id", (req: Request, res: Response) => {
    Stolik.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not exists"))
})

controller.delete("/:id", (req: Request, res: Response) => {
    Stolik.findByIdAndRemove(req.params.id)
        .then((result: any) => res.send(result))
        .catch((_) => res.send("Not available or removed"))
})

export default controller