import React from 'react';
import {Button, message} from 'antd';
import ProForm, {
    ModalForm,
    ProFormText,
    ProFormDateRangePicker,
    ProFormSelect, ProFormGroup,
} from '@ant-design/pro-form';
import {PlusOutlined,MinusOutlined} from '@ant-design/icons';

export default () => {
    return (
        <ModalForm<{
            id:string;
            name: string;
            sex: string;
            username: string;
            password: string;
            mail: string;
            phonenum: string;
            organization: string;
        }>
            title="删除用户"
            trigger={
                <Button type="primary">
                    <MinusOutlined />
                    删除用户
                </Button>
            }
            autoFocusFirstInput={true}
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            onFinish={async (values) => {
                console.log(values);
                message.success('提交成功');
                return true;
            }}
        >
            <ProFormGroup>
                <ProFormText name={"name"} label={"姓名"} required={true}/>
                <ProFormSelect name={"sex"}
                               label={"性别"}
                               options={[
                                   {value: 'male', label: '男'},
                                   {value: 'female', label: '女'},
                               ]}/>
            </ProFormGroup>
            <ProFormGroup>
                <ProFormText name={"username"} label={"用户名"} required={true}/>
                <ProFormText name={"password"} label={"密码"}/>
            </ProFormGroup>

            <ProFormText name={"organization"} label={"组织机构"}/>
            <ProFormGroup>
                <ProFormText name={"mail"} label={"邮箱"} required={true}/>
                <ProFormText name={"phonenum"} label={"电话"}/>
            </ProFormGroup>
        </ModalForm>
    );
};