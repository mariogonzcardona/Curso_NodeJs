const path=require('path');
const {v4:uuidv4}=require('uuid');
const uploadFile=(files,validExtensions = ['jpg', 'png', 'gif', 'jpeg'],FilePath="")=>{

    return new Promise((resolve, reject)=>{

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const {fileName} = files;
        const shortName=fileName.name.split('.');
        const extension=shortName[shortName.length-1];
        
        if(!validExtensions.includes(extension)){
            return reject(`File extension '${extension}' not allowed, [${validExtensions}]`);
        }
        const tempFileName=uuidv4()+'.'+extension;

        const uploadPath = path.join(__dirname , '../uploads/',FilePath , tempFileName);

        // Use the mv() method to place the file somewhere on your server
        fileName.mv(uploadPath, (err) => {
        if (err)
            reject(err);
            resolve(tempFileName);
        });
    });
}

module.exports={
    uploadFile
}