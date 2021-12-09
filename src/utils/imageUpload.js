import multer from "multer";

const storage = multer.diskStorage({
    // image will be stored in public/reportImages folder 
    destination: (req, file, callback)=>{
        callback(null, "./public/reportImages/");
    },
    //define the name of uploaded image
    filename: (req, file, callback)=>{
        callback(null, new Date().toISOString() + file.originalname);
    }
})

//filter function to only accept certain image format
const fileFilter = (req, file, callback) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true)
    }else{
        callback(new Error("only accept image format of JPEG or PNG"), false);
    } 
}

//use this instance as a middleware in route
const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
    })

export default uploadImage;