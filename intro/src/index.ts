import express, {Express, Request, Response } from "express"
import { config } from "dotenv"

config()

const app: Express = express()  

const parseNumber = (n: any) => Number(n) || 0

app.get('/dodaj', (req: Request, res: Response) => {  
  const a = parseNumber(req.query.num1)
  const b = parseNumber(req.query.num2)
  
  const result = a + b

  res.json(result)
})

app.get('/usun', (req: Request, res: Response) => {  
  const a = parseNumber(req.query.num1)
  const b = parseNumber(req.query.num2)

  const result = a - b
    
  res.json(result)
})

app.get('/pomnoz', (req: Request, res: Response) => {  
    const a = parseNumber(req.query.num1)
    const b = parseNumber(req.query.num2)

    const result = a * b
      
    res.json(result)
});

app.get('/podziel', (req: Request, res: Response) => {  
    const a = parseNumber(req.query.num1)
    const b = parseNumber(req.query.num2)

    const result = a / b
      
    res.json(result)
})

app.listen(process.env.PORT)