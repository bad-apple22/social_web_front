import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import background from './img/login_background.png'
import logo from './img/logo.png'
import {Card, Form, Input, Button, Checkbox, List, Avatar, Dropdown} from "antd";
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {UserOutlined, LockOutlined, PlusOutlined} from '@ant-design/icons';
import '@ant-design/pro-table/dist/table.css'
import {queryVacation} from "./backend";
import AddUserForm from "./add_user_form";
import DelUserForm from "./del_user_form";
type employeeItem = {
    id: number,//也是学号
    name: string,
    organization: string,
    username: string,
    phonenum: string,
    enabled: boolean,
};
const columns: ProColumns<employeeItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '学号',
        dataIndex: 'id',
    },
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '组织机构',
        dataIndex: 'organization',
    },
    {
        title: '登录名',
        dataIndex: 'username',
        hideInSearch: true,
    },
    {
        title: '电话',
        dataIndex: 'phonenum',
        hideInSearch: true,
    },
    {
        title: '是否启用',
        dataIndex: 'enabled',
        filters: true,
        onFilter: true,
        valueType: 'select',
        hideInSearch: true,
        valueEnum: {
            all: {text: '全部'},
            true: {
                text: '已启用',
            },
            false: {
                text: '已禁用',
            },
        },
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
            record.enabled ? (<a key="view">禁用</a>) : (<a key="view">启用</a>),
        ],
    },
];


class UserManagementPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {data: null};
    }

    render() {
        // const actionRef = useRef<ActionType>();
        return (
            <ProTable<employeeItem>
                columns={columns}
                // actionRef={actionRef}
                request={async (params = {}, sort, filter) => {
                    console.log("params:", params);
                    console.log("sort:", sort);
                    console.log("filter:", filter);
                    // let data = [
                    //     {id: 1, name: "qwerty", state: "shenqingzhong", applyTime: "2020-1-1"},
                    //     {id: 2, name: "asdfg", state: "xiujiazhong", applyTime: "2020-1-2"},
                    //     {id: 3, name: "zxcvb", state: "yixiaojia", applyTime: "2020-1-3"},
                    // ];
                    let data: [employeeItem] = [
                        {id: 1, name: "aaa", username: "a", organization: "x", phonenum: "123456", enabled: true},

                    ];


                    return {
                        data: data
                    };
                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                pagination={{
                    pageSize: 5,
                }}
                dateFormatter="string"
                headerTitle="权限管理"
                toolBarRender={() => [
                    <AddUserForm/>,
                    <DelUserForm/>,
                ]}

            />
        );
    }
}

export default UserManagementPage;