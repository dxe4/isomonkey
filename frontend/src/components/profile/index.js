import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Row, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getFilesAction } from '../../redux/actions/files';
import CustomUpload from '../upload/uploadComponent';
import './avatar.css';
import DragableImage from './dragableImage';
import './image-masonry.css';
import './profile.css';


const { TabPane } = Tabs;

function callback(key) {
  // TODO
}


const ProfilePage = (props) => {

  const renderFiles = () => {

    return (
      <DndProvider backend={HTML5Backend} accept={false}>
        <div  className='masonry'>
          <CustomUpload></CustomUpload>
          {props.fileList.map((fileData, i) => (
               <div key={i}>
                    <DragableImage
                      file={fileData}
                      fileList={props.fileList}
                    />
                </div>
            ))}
            </div>
      </DndProvider>
    )
  }

  const ProfileTabs = () => {
    return <Tabs defaultActiveKey="1" onChange={callback} centered  style={{paddingBottom: 50 }}>
      <TabPane tab="Upload" key="1">
        {renderFiles()}

      </TabPane>
      <TabPane tab="My Profile" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Discover" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  };

    useEffect(() => {
      props.actions.getFiles()
    }, [])

    if (!props.user) {
        return <Redirect to='/' />
    }
    const { first_name, last_name } = props.user;

    return (
        <React.Fragment>
            <div className='top-image'>
                <div className='avatar-wrapper'>
                    <Row>
                        <Col >
                        </Col>
                        <Col className='user-details'>
                            </Col>
                    </Row>
                    <Avatar className='avatar' style={{ backgroundColor: '#87d068' }} size={128} icon={<UserOutlined />} />
                    <Divider> <h1 className='user-name'>{first_name} {" "} {last_name}</h1>

                    <Divider type="vertical" />
                    <span className='user-details' >Following 0</span >

                    <Divider type="vertical" />
                    <span className='user-details' > | </span>
                   
                    <Divider type="vertical" />
                    <span className='user-details' >Followers 0</span>

                    <Divider type="vertical" />
                    <span className='user-details' > | </span>

                    <Divider type="vertical" />
                    <span className='user-details' >Pictures 0</span>

                     </Divider>                        
                </div>
            </div>

            <div className='center-allign'>
                <ProfileTabs>
                </ProfileTabs>
            </div>

        </React.Fragment>
    );
}

const actions = {
  'getFiles': getFilesAction
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
)(ProfilePage);
