
const user = JSON.parse(localStorage.getItem("user"));

export default {
    userAuthReducer: {
        'user': user
    },
    filesReducer: {
        fileList: [],
        fileChangedById: new Set(),
    },
}
