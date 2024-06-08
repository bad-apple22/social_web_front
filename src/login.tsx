import React from 'react';
import ReactDOM from 'react-dom';
import background from './img/login_background.png'
import logo from './img/logo.png'
import './login.css'
import {Card, Form, Input, Button, Checkbox} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {login} from "./backend";

interface LoginParams {
    username: string,
    password: string,
    remember: boolean
}

class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {is_doing_login: false};
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values: LoginParams) {
        this.setState({is_doing_login: true});
        login(values)
            .then(
                (res) => {
                    if (res)
                        window.location.href = "/home";
                    else
                        alert("用户名或密码错误!");
                },
                (error) => {
                    alert(error);
                })
            .finally(() => {
                    this.setState({is_doing_login: false});
                }
            );
        console.log('Received values of form: ', values);
    }

    render() {
        return (
            <div id={'login-div-main'} >
                <Card id={'login_card'} >
                    <img src={logo} width={'400px'} alt="logo"/>
                    <div style={{marginTop: '30px'}}/>{/* 这里是空行，通过marginTop来设置间隔 */}
                    <Form<LoginParams>
                        id={'login-form'}
                        name="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: '请输入用户名!'}]}
                        >
                            <Input
                                style={{ width: '200px' }} // 设置 Input 组件的宽度
                                prefix={<UserOutlined/>}
                                placeholder="用户名"
                                disabled={this.state.is_doing_login}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入密码!'}]}
                        >
                            <Input
                                style={{ width: '200px' }} // 设置 Input 组件的宽度
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="密码"
                                disabled={this.state.is_doing_login}
                            />
                        </Form.Item>
                        <Form.Item>
                            {/*<Form.Item name="remember" valuePropName="checked" noStyle>*/}
                            {/*    <Checkbox disabled={this.state.is_doing_login}>记住密码</Checkbox>*/}
                            {/*</Form.Item>*/}

                            <a id="login-form-forgot">
                                忘记密码
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button id={'login-submit'} type="primary" htmlType="submit" className="login-form-button"
                                    disabled={this.state.is_doing_login}>
                                {(this.state.is_doing_login) ? (<>登录中...</>) : (<>登录</>)}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default LoginPage;