import jwt from "jsonwebtoken"

const AuthMiddleware = (req: any, res: any, next: any) => {
    const headerAuth = req.headers["authorization"];
    const token = headerAuth && headerAuth.split(" ")[1];
  
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT as string, (err: any, user: any) => {
      if (err) 
        return res.sendStatus(403);
      
        req.user = user;
      next();
    });
  }

  export default AuthMiddleware