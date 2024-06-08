import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Descriptions, Result, Avatar, Space, Statistic} from 'antd';
import {LikeOutlined, UserOutlined} from '@ant-design/icons';

import type {ProSettings} from '@ant-design/pro-layout';
import ProLayout, {PageContainer, SettingDrawer, ProBreadcrumb} from '@ant-design/pro-layout';
// import 'antd/dist/antd.css'
// import '@ant-design/pro-layout/dist/layout.css'
import reportWebVitals from "./reportWebVitals";
import logo from './img/logo.png'
import {MenuInfo} from "rc-menu/lib/interface";

import Circle from "./circle";
import PersonalCircle from "./personal_circle";
import AllFriends from "./all_friends";
import UserManagementPage from "./user_management";
import AdminManagementPage from "./admin_management";


let mainMenuRoute = {
    path: '/',
    routes: [
        {
            path: '/圈子',
            name: '圈子',
        },
        {
            path: '/个人空间',
            name: '个人空间',
        },
        {
            path: '/好友列表',
            name: '好友列表',
        },
        {
            path: '/系统管理',
            name: '系统管理',
            routes: [
                {
                    path: '/用户管理',
                    name: '用户管理',
                },
                {
                    path: '/权限管理',
                    name: '权限管理',
                },
            ],
        },
    ]
};


class Home extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.state={page:null};
    }
    componentDidMount() {
    }

    onMenuClick(info: MenuInfo) {
        console.log(info);
        console.log(info.key);
        switch(info.key){
            case "/圈子":
                this.setState({page:<Circle/>});
                break;
            case "/个人空间":
                this.setState({page:<PersonalCircle/>});
                break;
            case "/好友列表":
                this.setState({page:<AllFriends/>});
                break;
            case "/用户管理":
                this.setState({page:<UserManagementPage/>});
                break;
            case "/权限管理":
                this.setState({page:<AdminManagementPage/>});
                break;
        }

    }

    render() {
        return (<div
                style={{
                    height: '100vh',
                }}
            >
                <ProLayout
                    title={"工大圈子"}
                    logo={logo}
                    ErrorBoundary={false}
                    // headerContentRender={() => <ProBreadcrumb/>}
                    menuProps={{onClick: this.onMenuClick}}
                    route={mainMenuRoute}
                >
                    <PageContainer>
                        {(this.state.page)}
                    </PageContainer>
                </ProLayout>
            </div>
        );
    }
}

export default Home;