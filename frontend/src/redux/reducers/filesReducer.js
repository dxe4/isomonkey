import produce, { enableMapSet } from 'immer';
import {
    FILES_FETCHED, UPLOADING_FILE,
    UPLOAD_FAILED,
    UPLOAD_SUCCESS,
    IMAGE_DRAGGED,
    UPDATED_FILES_SUCCESS, UPDATING_FILES
} from "../actions/types";
import initialState from './initialState';

enableMapSet()

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
            const _from = value['fromIdx'];
            const _to = value['toIdx'];

            const fromOrder = state.fileList[_from].order
            const toOrder = state.fileList[_to].order

            const fromPk = state.fileList[_from].pk
            const toPk = state.fileList[_to].pk

            return produce(state, (draftState) => {
                
                draftState.fileList[_from].order = toOrder;
                draftState.fileList[_to].order = fromOrder;

                [
                    draftState.fileList[_from],
                    draftState.fileList[_to]
                ] = [
                    draftState.fileList[_to],
                    draftState.fileList[_from]
                ];

                draftState.fileChangedById.add(fromPk);
                draftState.fileChangedById.add(toPk);
                
            });
        case UPDATED_FILES_SUCCESS:
            return produce(state, (draftState)=> {
                draftState.fileChangedById = new Set();
            })            
        case UPDATING_FILES:
            return state
        default:
            return state;
    }
}
