import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import PicturesWall from '../upload/uploadComponent'

import { Tabs } from 'antd';
import './avatar.css'
import './profile.css'

const { TabPane } = Tabs;

function callback(key) {
  // TODO
}

const ProfileTabs = () => (
  <Tabs defaultActiveKey="1" onChange={callback} centered  style={{ height: 600, paddingBottom: 50 }}>
    <TabPane tab="Upload" key="1">
      <PicturesWall ></PicturesWall>
    </TabPane>
    <TabPane tab="My Profile" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Discover" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);


const ProfilePage = (props) => {
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

const mapStateToProps = state => ({ user: state.user })
function mapDispatchToProps(dispatch) {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfilePage);
