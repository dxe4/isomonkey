import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { default as RCUpload } from 'rc-upload';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fileUploadedAction, sendFileAction } from '../../redux/actions/files';
import { getBase64, getExif } from './fileUtils';
import './upload.css';


const CustomUpload = (props) => {

    const customRequest = async (data) => {
        const exifData = await getExif(data.file);
        const imgase64 = await getBase64(data.file)

        return props.actions.sendFile(data.file, exifData, imgase64).then((response) => {
            props.actions.fileUploaded(response.data, data.file.uid)
            data.onSucccess()
        }).catch(() => {
            data.onError()
        })
    }

    const uploadProps = {
        disabled: false,
        multiple: true,
        accept: ".png, .jpeg, .jpg",
        customRequest: customRequest,
    }
    /*
    TODO upload button looks ugly
    */

    return <React.Fragment>
        <RCUpload {...uploadProps}> 
        <Button
            style={{height: 200, width: '100%'}}
            icon={<UploadOutlined style={{fontSize: 150, color: "#52c41a"}} />}>
        </Button>
        </RCUpload>
    </React.Fragment>
}

const actions = {
    'sendFile': sendFileAction,
    'fileUploaded': fileUploadedAction
};


const mapStateToProps = state => ({
    user: state.userAuthReducer.user,
    fileList: state.filesReducer.fileList,
})

function mapDispatchToProps(dispatch) {
    return {
        actions:  bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomUpload);
