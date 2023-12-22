
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();



import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

//register


export const register = async (req, res) => {
    const { fullName, email, phoneNumber, password} = req.body;
  
    // Check if email, fullName, and password are provided
    if (!email || !fullName || !password || !phoneNumber) {
      return res.status(400).json({ msg: "Email, fullName, phoneNumber dan password harus diisi" });
    }
  
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  
    if (existingUser) {
      // Email is already in use, return an error response
      return res.status(400).json({ msg: "Email sudah digunakan" });
    }
  
    // If the email is not in use and required fields are provided, proceed to create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          fullName,
          email,
          phoneNumber,
          password: hashedPassword,
          profilePic:"https://storage.googleapis.com/opticool-bucket/Get%20the%20We%20Heart%20It%20app!.jpeg"
        },
      });
  
      return res.status(201).json({
        data: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePic: user.profilePic,
        },
      });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  };
  


//login
export const login = async (req, res) =>{
  const {email, password} = req.body;
  try{
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        }
      }
    })

    if (!user) {
      return res.status(401).json({msg: 'Incorrect username or password'});
    }

    if (!user.password) {
      return res.status(401).json({msg: 'Incorrect username or password'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) {
      const payload={
        id: user.id,
        fullName: user.fullName
      }

      const secret = process.env.jwt_secret;

      const token = jwt.sign(payload, secret);
      
      return res.json({
        data: {
            id: user.id,
            fullName: user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            profilePic:user.profilePic
        },
        token: token

        
      })
    } else {
      return res.status(403).json({msg: 'Incorrect username or password'});
    }
    

    // return res.status(200).json({
    //   status: 'success',
    //   message: 'User berhasil login',
    //   data: {
    //     fullName:user.fullName,
    //     email:user.email
    //     // tambah token dan refresh token bcyrpt
    //   },
    // }

  
  } catch (error) {
    return res.status(400).json({msg: error.message});
  }
}

//getuser
export const getUser = async (req, res) =>{
  const {authorization} = req.headers;
  const payload = parseJwt(authorization);

  try{
    const user = await prisma.user.findUnique({
      where:{
          id: Number(payload.id)
      }
  });
    return res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        profilePic:user.profilePic})
  }catch (error) {
    return res.status(400).json({msg: error.message});
  }
}

//getuserById
// export const getUserById = async (req, res) =>{
//   console.log(req);
//   try {
      // const user = await prisma.user.findUnique({
      //     where:{
      //         id: Number(req.params.id)
      //     }
      // });
//       if (!user) {
//       return res.status(404).json({msg: 'user tidak ditemukan'})};
//       return res.status(200).json(user);
//   } catch (error) {
//       return res.status(404).json({msg: error.message});
//   }
// }


//updateUser
export const updateUser = async (req, res) =>{
  const {fullName, email, phoneNumber,profilePic} = req.body;
  const {authorization} = req.headers;
  const payload = parseJwt(authorization);
  

  const updateData = {};

  if (fullName !== undefined) {
    updateData.fullName = fullName;
  }

  if (email !== undefined) {
    updateData.email = email;
  }

  if (phoneNumber !== undefined) {
    updateData.phoneNumber = phoneNumber;
  }


  if (profilePic !== undefined) {
    updateData.profilePic = profilePic;
  }

  try {
      const user = await prisma.user.update({
          where:{
              id: Number(payload.id)
          },
          data:updateData
      });
      res.status(200).json(user);
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
}


//deleteUser
export const deleteUser = async (req, res) =>{
  const {authorization} = req.headers;
  const payload = parseJwt(authorization);
  try {
      const user = await prisma.user.delete({
          where:{
              id: Number(payload.id)
          }
      });
      res.status(200).json(user);
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
}