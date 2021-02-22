import React from 'react';
import { Tooltip, Checkbox } from 'antd';
import { useDrag, useDrop } from 'react-dnd';

const type = 'DragableUploadList';

const DragableUploadListItem = ({ 
    originNode, moveRow, file, fileList, onSelected
}) => {
    const ref = React.useRef();
    const index = fileList.indexOf(file);
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: item => {
            moveRow(item.index, index);
        },
    });

    const [, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drop(drag(ref));

    const errorNode = (
        <Tooltip title="Upload Error" getPopupContainer={() => document.body}>
            {originNode.props.children}
        </Tooltip>
    );

    return (
        <div
            ref={ref}
            className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', marginBottom: 10 }}
        >
            {file.status === 'error' ? errorNode : originNode}
            <Checkbox onChange={() => onSelected(index)}>Edit</Checkbox>
        </div>
    );
};

export default DragableUploadListItem;
