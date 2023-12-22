import  jwt  from "jsonwebtoken"


export const accessValidation = (req, res, next) => {
    const validationReq = req
    const {authorization} = validationReq.headers;
  
    if(!authorization){
      return res.status(401).json({
        msg: 'Token diperlukan'
      });
      
    }
  
    const token = authorization.split(' ')[1];
    const secret = process.env.jwt_secret;
  
    try{
      const jwtDecode = jwt.verify(token, secret);
  
      validationReq.userData = jwtDecode
    } catch (error){
      return res.status(401).json({
        msg: 'Unauthorized'
      })
    }
    next()
  }

  