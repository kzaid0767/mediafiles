import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const app = express();
const port = process.env.PORT || 9082;



// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//configure multer storage with cloudinary
/* forlder name that constains the images and function that converts the image to png 
public_id is for deleting the image
*/
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images-folder",
        format: async (req, file) => "png",
        public_id: (req, file) => file.fieldname + "-" + Date.now(),
        transformation: [{ width: 800, height: 600, crop: "fill" }],
    },
});

//configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
        filefilter: (req, file, cb) => {
            if (file.mimetype === "image") {
                cb(null, true);
            } else {
                cb(new Error("Only image files are allowed!"), false);
            }
        }
    }
})









app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});