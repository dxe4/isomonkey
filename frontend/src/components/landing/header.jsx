import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import React from "react";
import ComparisonTable from './comparisonTable';
import './header.css';


const Header = () => {
  return (
    <React.Fragment>
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="intro-text">
                  <h1>
                    Iso Monkey
                    <span></span>
                  </h1>
                  <p>
                    Upload your pictures. Create and customise your profile.
                  </p>

                  <Button href='/register' type="primary" shape="round" icon={<UserAddOutlined />}>
                    Register
                </Button>
                  <Divider type="vertical" />
                  <Button href='/login' type="primary" shape="round" icon={<LoginOutlined />}>
                    Login
                </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>

      </header>
    <ComparisonTable></ComparisonTable>
    </React.Fragment>

  );

}

export default Header;
