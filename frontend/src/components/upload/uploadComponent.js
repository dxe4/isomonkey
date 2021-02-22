import React, { useState, useCallback, useRef } from 'react';
import { Upload, Button } from 'antd';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// TODO immutability-helper -> immer
import update from 'immutability-helper';
import { UploadOutlined } from '@ant-design/icons';
import produce from 'immer'
import { setAutoFreeze } from "immer";
import DragableUploadListItem from './dragAndDrop'
import './upload.css'


const RNDContext = createDndContext(HTML5Backend);

const PicturesWall = () => {
  /*
  file example:
      uid: '-4',
      name: 'image4.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      selected: false,
  */
  const [fileList, setFileList] = useState([]);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [fileList],
  );

  const manager = useRef(RNDContext);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onSelected = (index) => {
    // TODO, this is because fileList changes inside Ant in Upload.tsx
    // file.uid = file.uid ?? `__AUTO__${timestamp}_${index}__`;
    // Fix later
    // can convert to const newList = [...fileList]
    setAutoFreeze(false)
    const newList = produce(fileList, draftState => {
      draftState[index].selected = !draftState[index].selected
    })

    setFileList(newList);
    setAutoFreeze(true)
  }


  const beforeUpload = (file, fileList) => {
    /*
    we prevent files from being uploaded, until their properties are chosen
    */
    return false
  }

  return (
    <React.Fragment>
        <div className='custom-file-uploader'>
        <DndProvider manager={manager.current.dragDropManager}>
            <Upload
            showUploadList={{ showPreviewIcon: false }}
            fileList={fileList}
            accept="image/png, image/jpeg"
            onChange={onChange}
            multiple={true}
            beforeUpload={beforeUpload}
            listType="picture-card"
            itemRender={(originNode, file, currFileList) => (
                <DragableUploadListItem
                originNode={originNode}
                file={file}
                fileList={currFileList}
                moveRow={moveRow}
                onSelected={onSelected}
                />
            )}
            >
            <Button icon={<UploadOutlined />}> Upload</Button>

            </Upload>
        </DndProvider>
        </div>
    </React.Fragment>
  );
};


export default PicturesWall;
