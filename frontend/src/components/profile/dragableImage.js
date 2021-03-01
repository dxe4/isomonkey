
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { imageDraggedAction } from '../../redux/actions/files';

const type = 'DRAG_IMAGE'

const DragableImage = ({ file, fileList, ...props }) => {
  const ref = React.useRef();
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop(
    {
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
        props.actions.dragImage(item.index, index);
      },
    },
  );
  const [, drag] = useDrag(
    {
      item: { type, index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    },
  );
  drop(drag(ref));

  return (
    <img ref={ref}
      className='item'
      src={file.base64 ? file.base64 : file.image}
      style={{ width: "100%", display: "block" }}
      alt=""
    />
  );
};

const actions = {
  'dragImage': imageDraggedAction
}

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
)(DragableImage);
