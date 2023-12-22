import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();



// createProduct
export const createProduct = async (req, res) => {
    const { Link, Name, Brand, FaceShape, Price, Gender, FrameColour, FrameShape, FrameStyle, LinkPic1, LinkPic2, LinkPic3 } = req.body;
    if (!Link || !Name || !Brand || !FaceShape || !Price || !Gender || !FrameColour || !FrameShape || !FrameStyle || !LinkPic1 || !LinkPic2 || !LinkPic3) {
      return res.status(400).json({ msg: 'Semua properti harus disediakan.' })};
  
  
    
  
    try {
      const eyeglass = await prisma.eyeglasses.create({
        data: {
          Link,
          Name,
          Brand,
          FaceShape,
          Price,
          Gender,
          FrameColour,
          FrameShape,
          FrameStyle,
          LinkPic1,
          LinkPic2,
          LinkPic3,
        }
      });
      res.status(201).json(eyeglass);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(400).json({ msg: 'Terjadi kesalahan saat membuat produk.', error: error.message });
    }
  }
  
  // updateProduct
  export const updateProduct = async (req, res) => {
    const { Link, Name, Brand, FaceShape, Price, Gender, FrameColour, FrameShape, FrameStyle, LinkPic1, LinkPic2, LinkPic3 } = req.body;
    const updateData = {};
  
    if (Link !== undefined) {
      updateData.Link = Link;
    }
  
    if (Name !== undefined) {
      updateData.Name = Name;
    }
  
    if (Brand !== undefined) {
      updateData.Brand = Brand;
    }
  
    if (FaceShape !== undefined) {
      updateData.FaceShape = FaceShape;
    }
  
    if (Price !== undefined) {
      updateData.Price = Price;
    }
  
    if (Gender !== undefined) {
      updateData.Gender = Gender;
    }
  
    if (FrameColour !== undefined) {
      updateData.FrameColour = FrameColour;
    }
  
    if (FrameShape !== undefined) {
      updateData.FrameShape = FrameShape;
    }
  
    if (FrameStyle !== undefined) {
      updateData.FrameStyle = FrameStyle;
    }
  
    if (LinkPic1 !== undefined) {
      updateData.LinkPic1 = LinkPic1;
    }
  
    if (LinkPic2 !== undefined) {
      updateData.LinkPic2 = LinkPic2;
    }
  
    if (LinkPic3 !== undefined) {
      updateData.LinkPic3 = LinkPic3;
    }
  
    try {
      const updatedEyeglass = await prisma.eyeglasses.update({
        where: {
          idEyeglass: Number(req.params.id)
        },
        data: updateData
      });
      res.status(200).json(updatedEyeglass);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
  
  // getAllProduct
  export const getAllProduct = async (req, res) => {
    const { faceshape } = req.query;

    try {
        

        const eyeglass = await prisma.eyeglasses.findMany({
            where: {
                FaceShape: faceshape
            },
            
            
        });

        return res.status(200).json(eyeglass);
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

  
  // getAllProductById
  export const getProductById = async (req, res) =>{
    try {
        const eyeglass = await prisma.eyeglasses.findUnique({
            where:{
                idEyeglass: Number(req.params.id)
            }
        });
        if (!eyeglass) {
        return res.status(404).json({msg: 'product tidak ditemukan'})};
        return res.status(200).json(eyeglass);
    } catch (error) {
        return res.status(404).json({msg: error.message});
    }
  }
  

  
  
  
  
  