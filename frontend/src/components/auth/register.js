import { Button, Form, Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { registerAction } from '../../redux/actions/user';
import './register-form.css';


function RegisterPage(props) {

    if (!!props.user) {
        return <Redirect to='/profile' />
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
        props.actions.register(values);
    };

    const onFinishFailed = (errorInfo) => {
        
    };

    return (
        <div className="Signup">
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Surname"
                    name="last_name"
                    rules={[{ required: true, message: 'Please input your surname!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
            </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const actions = {
    'register': registerAction
};
const mapStateToProps = state => ({ user: state.user })
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
