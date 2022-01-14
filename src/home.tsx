import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Descriptions, Result, Avatar, Space, Statistic} from 'antd';
import {LikeOutlined, UserOutlined} from '@ant-design/icons';

import type {ProSettings} from '@ant-design/pro-layout';
import ProLayout, {PageContainer, SettingDrawer, ProBreadcrumb} from '@ant-design/pro-layout';
import 'antd/dist/antd.css'
import '@ant-design/pro-layout/dist/layout.css'
import reportWebVitals from "./reportWebVitals";
import logo from './img/logo.png'
import {MenuInfo} from "rc-menu/lib/interface";
import QingXiaoJiaPage from "./qingxiaojia";
let mainMenuRoute = {
    path: '/',
    routes: [
        {
            path: '/首页',
            name: '首页',
        },
        {
            path: '/办公系统',
            name: '办公系统',
            routes: [
                {
                    path: '/差旅管理',
                    name: '差旅管理',
                },
                {
                    path: '/请销假',
                    name: '请销假',
                },
                {
                    path: '/费用报销',
                    name: '费用报销',
                },
                {
                    path: '/印刷事务',
                    name: '印刷事务',
                },
                {
                    path: '/通知公告',
                    name: '通知公告',
                },
            ],
        },
        {
            path: '/项目管理',
            name: '项目管理',
            routes: [
                {
                    path: '/项目登记',
                    name: '项目登记',
                },
                {
                    path: '/我的项目',
                    name: '我的项目',
                },
                {
                    path: '/项目总表',
                    name: '项目总表',
                },
            ],
        },
        {
            path: '/运营管理',
            name: '运营管理',
            routes: [
                {
                    path: '/合同管理',
                    name: '合同管理',
                },
                {
                    path: '/发票管理',
                    name: '发票管理',
                },
                {
                    path: '/客户管理',
                    name: '客户管理',
                },
                {
                    path: '/分包商管理',
                    name: '分包商管理',
                },
            ],
        },
        {
            path: '/人力资源',
            name: '人力资源',
            routes: [
                {
                    path: '/员工档案',
                    name: '员工档案',
                },
                {
                    path: '/劳动合同',
                    name: '劳动合同',
                },
                {
                    path: '/绩效薪酬',
                    name: '绩效薪酬',
                },
                {
                    path: '/专家信息',
                    name: '专家信息',
                },
            ],
        },
        {
            path: '/综合管理',
            name: '综合管理',
        },
        {
            path: '/财务管理',
            name: '财务管理',
        },
        {
            path: '/系统管理',
            name: '系统管理',
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
            case "/请销假":
                this.setState({page:<QingXiaoJiaPage/>});
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
                    title={"桦辰OA"}
                    logo={logo}
                    ErrorBoundary={false}
                    // headerContentRender={() => <ProBreadcrumb/>}
                    menuProps={{onClick: this.onMenuClick}}
                    route={mainMenuRoute}

                    // breadcrumbRender={(routers = []) => [
                    //     {
                    //         path: '/',
                    //         breadcrumbName: '主页',
                    //     },
                    //     {
                    //         path: '/',
                    //         breadcrumbName: '主页',
                    //     },
                    //     ...routers,
                    // ]}
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