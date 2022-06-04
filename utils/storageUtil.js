//Multipart image/text form util

let multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../public/imgs/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});

const fileFilter =(req, file, cb)=>{
    if(file.mimeType==='image/jpeg' || file.mimeType === 'image/jpg' || file.mimeType === 'image/png'){
        cb(null, true);
    }
        cb(null, false);
}

let upload = multer({
    storage:storage,
    fileFilter:fileFilter
});

module.exports = upload;