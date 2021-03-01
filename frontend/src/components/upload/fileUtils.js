import EXIF from 'exif-js'


function getBase64(file) {
    /*
    To preview file before uploading finished
    */
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function getExif(file) {
    /*
    EXIF.getData mutates the original image
    */
    let buffer = await file.arrayBuffer();
    const data = EXIF.readFromBinaryFile(buffer);
    return data;
}


export {getExif, getBase64};
