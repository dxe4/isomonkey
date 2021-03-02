import axios from './api-client';


const getFilesApi = (token) => {
    return axios({
        method: 'get',
        url: 'api/files',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    })
}

function sendFileApi(file, exif) {
    var formData = new FormData();
    formData.append('image', file)
    formData.append('exif_data', JSON.stringify(exif))
    formData.append('last_modified', file.lastModified)

    return axios({
        method: 'post',
        url: 'api/files',
        data: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    })
}

function updateFilesApi(files) {

    return axios({
        method: 'PATCH',
        url: 'api/files',
        data: JSON.stringify(files),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

export {sendFileApi, getFilesApi, updateFilesApi};
