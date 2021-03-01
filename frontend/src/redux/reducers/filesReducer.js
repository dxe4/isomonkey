import produce from 'immer';
import {
    FILES_FETCHED, UPLOADING_FILE,
    UPLOAD_FAILED,
    UPLOAD_SUCCESS,
    IMAGE_DRAGGED
} from "../actions/types";
import initialState from './initialState';


export default function filesReducer(state = initialState.filesReducer, action) {
    const { type, value } = action;
    switch (type) {
        case UPLOADING_FILE:
            return produce(state, (draftState) => {
                draftState.fileList.push({
                    file: value.file,
                    base64: value.base64,
                    status: 'uploading',
                })
            })
        case UPLOAD_FAILED:
            return state;
        case UPLOAD_SUCCESS:
            /*
            This removes the temporary file object
            It also adds image id, so we can later use the api
            It will cause to rerender (originally basse64 image now image url)
            */
            return produce(state, (draftState) => {
                draftState.fileList = draftState.fileList.map(item => {
                    if (!!item.file && item.file.uid === value.uid) {
                        return value.responseData
                    } else {
                        return item
                    }
                })
            })
        case FILES_FETCHED:
            return produce(state, (draftState) => {
                draftState.fileList.push(...value)
            });
        case IMAGE_DRAGGED:
            // TODO, maybe splice is more readable
            const b = value['fromIdx'];
            const a = value['toIdx'];

            return produce(state, (draftState) => {
                [
                    draftState.fileList[a],
                    draftState.fileList[b]
                ] = [
                    draftState.fileList[b],
                    draftState.fileList[a]
                ];
            });
        default:
            return state;
    }
}
