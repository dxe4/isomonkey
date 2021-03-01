import { getFilesApi, sendFileApi } from '../../api/imageApi';
import {
  FILES_FETCHED, UPLOADING_FILE,
  UPLOAD_FAILED, UPLOAD_SUCCESS,
  IMAGE_DRAGGED
} from "./types";
  

  
  const getFilesAction = () => {
    return function (dispatch) {
      return getFilesApi().then((response) => {
        dispatch({
            'type': FILES_FETCHED,
            'value': response.data
        });
      })
    }
  };
    
  
  const sendFileAction = (file, exifData, imgBase64) => (dispatch) => {
        
        dispatch({
            'type': UPLOADING_FILE, 'value': {
                'file': file,
                'base64': imgBase64
            }
        })
        return sendFileApi(file, exifData);

  };

  const fileUploadedAction = (responseData, uid) => {
    return function (dispatch) {
        dispatch({
            'type': UPLOAD_SUCCESS,
            'value': {
                'responseData': responseData,
                'uid': uid,
            }
        })
    }
  }

  const fileUploadFailedAction = (uid) => {
    return function(dispatch) {
        dispatch({
            'type': UPLOAD_FAILED,
            'value': {
                'uid': uid,
            }
        })
    }
  }
  

  const imageDraggedAction = (fromIdx, toIdx) => (dispatch) => {
    return dispatch({
      'type': IMAGE_DRAGGED,
      'value': {
        'fromIdx': fromIdx,
        'toIdx': toIdx
      }
    })
  }
  
  export { sendFileAction, getFilesAction, fileUploadedAction, imageDraggedAction};
   