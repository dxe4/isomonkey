import React, {useEffect} from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import {bindActionCreators} from 'redux'

import CustomUpload from '../upload/uploadComponent'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { Tabs } from 'antd';
import { getFilesAction } from '../../redux/actions/files';
import PlusOutlined from '@ant-design/icons';

import './avatar.css'
import './profile.css'

const { TabPane } = Tabs;

function callback(key) {
  // TODO
}

const ProfilePage = (props) => {

  
  const renderFiles = () => {
    return <ResponsiveMasonry
        className='pictures-masonry'
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3}}
    >
        <Masonry gutter='20' columnsCount={5}>
        <CustomUpload></CustomUpload>
          
            {props.fileList.map((fileData, i) => (
                <img
                    key={i}
                    src={fileData.base64 ? fileData.base64 : fileData.image}
                    style={{ width: "100%", display: "block" }}
                    alt=""
                />
            ))}
        </Masonry>
    </ResponsiveMasonry>
  }

  const ProfileTabs = () => {
    return <Tabs defaultActiveKey="1" onChange={callback} centered  style={{paddingBottom: 50 }}>
      <TabPane tab="Upload" key="1">
        {/* <PicturesWall ></PicturesWall> */}
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
