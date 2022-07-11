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

type queryVacationItem = {
    id: number,
    employeeId: number,
    employeeName: string,
    type: string,
    state: string,
    applyTime: string,
};
const columns: ProColumns<queryVacationItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '姓名',
        dataIndex: 'employeeName',
        // copyable: true,
        // tip: '日期tip',
        // formItemProps: {
        //     rules: [
        //         {
        //             required: true,
        //             message: '此项为必填项',
        //         },
        //     ],
        // },
    },
    {
        title: '申请时间',
        dataIndex: 'applyTime',
        valueType: 'dateTime',
        hideInSearch: true,
        sorter: true,
        // sortOrder: "",
        defaultSortOrder: "descend",
        showSorterTooltip: false,
    },
    {
        title: '类型',
        dataIndex: 'type',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: {text: '全部'},
            "带薪休假": {
                text: '带薪休假',
            },
            "病假": {
                text: '病假',
            },
            "事假": {
                text: '事假',
            },
            "其它": {
                text: '其它',
            },
        },
    },
    {
        title: '状态',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: {text: '全部'},
            '申请中': {
                text: '申请中',
            },
            '休假中': {
                text: '休假中',
            },
            '已销假': {
                text: '已销假',
            },
        },
    },

    {
        title: '申请时间区间',
        dataIndex: 'applyTime',
        valueType: 'dateRange',
        hideInTable: true,
        // search: {
        //     transform: (value) => {
        //         return {
        //             startTime: value[0],
        //             endTime: value[1],
        //         };
        //     },
        // },
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
            <a key="view">
                查看
            </a>,
        ],
    },
];


class QingXiaoJiaPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {data: null};
    }

    render() {
        // const actionRef = useRef<ActionType>();
        return (
            <ProTable<queryVacationItem>
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
                    let data: [queryVacationItem];
                    try {
                        let data_res = await queryVacation({
                            pageSize: params.pageSize ?? 5,
                            pageIndex: params.current ?? 1,
                            name: params.employeeName == "" ? undefined : params.employeeName,
                            type: params.type,
                            state: params.state,
                            applyTimeBegin: new Date(params.applyTime?.[0]).getTime(),
                            applyTimeEnd: new Date(params.applyTime?.[1]).getTime(),
                        });
                        console.log("vacationDataRes:", data_res);
                        for (let i = 0; i < data_res.length; i++) {
                            let date = new Date(parseInt(data_res[i].applyTime));
                            data_res[i].applyTime = date.toString();
                        }
                        data = data_res as [queryVacationItem];
                        console.log("vacationData:", data);
                    } catch (e) {
                        console.log("ERROR:", e);
                        return {};
                    }


                    if (sort != null) {
                        if (sort.applyTime === "ascend") {
                            data.sort((a, b) =>
                                a.applyTime.localeCompare(b.applyTime));
                        } else {
                            data.sort((a, b) =>
                                b.applyTime.localeCompare(a.applyTime));
                        }
                    } else {
                        data.sort((a, b) =>
                            b.applyTime.localeCompare(a.applyTime));
                    }

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
                // form={{
                //     由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                // syncToUrl: (values, type) => {
                //     if (type === 'get') {
                //         return {
                //             ...values,
                //             applyTime: [values.startTime, values.endTime],
                //         };
                //     }
                //     return values;
                // },
                // }}
                pagination={{
                    pageSize: 5,
                    total:50,
                }}
                dateFormatter="string"
                headerTitle="请销假"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined/>} type="primary">
                        新建
                    </Button>
                ]}
            />
        );
    }
}

export default QingXiaoJiaPage;