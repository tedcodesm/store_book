import express from "express";
import cloudinary from "../lib/cloudinary.js";
import protectRoute from "../middleware/auth.middleware.js";
import Book from "../models/Book.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/create", protectRoute, async (req, res) => {
  try {
    const { tittle, caption, rating, image } = req.body;

    if (!image || !tittle || !caption || !rating) {
      return res.status(400).json({ mesage: "please provide all fields" });
    }

    //upload the image to the cloudinary and also to mongo db
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      tittle,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save(); //saving to the database

    res.status(201).json(newBook);
  } catch (error) {
    console.log("error creeating book", error);
    res.status(500).json({
      mesage: error.message,
    });
  }
});

router.get("/", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage"); // arranges from the latest to the oldest

    const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in getting all the book route", error);
    return res.status(500).json({ mesage: "internalm server error" });
  }
});

//deleting product from bookstore by id
router.delete("/:id",protectRoute,async(req,res)=>{
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
        return res.status(404).json({ message: "Book not found" });
        }
    
        // Check if the user is authorized to delete the book
        if (book.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to delete this book" });

        }

        //delete the image from cloudinary
        if (book.image && book.image.includes("cloudinary")) {
            try {
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
                
            } catch (error) 
            {
                console.log("Error deleting image from cloudinary", error);
                return res.status(500).json({ message: "Error deleting image" });
                
            }
        }
    
        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log("Error deleting book", error);
        res.status(500).json({ message: "Internal server error" });
    }

})

        //get recommended books by the logged in user
router.get("/user", protectRoute, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "username profileImage");
    
        res.status(200).json(books);
    } catch (error) {
        console.log("Error in getting recommended books", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


export default router;
