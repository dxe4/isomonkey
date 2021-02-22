import React from "react";
import './header.css'
import { Table, Space } from 'antd';

import { CheckCircleTwoTone, QuestionCircleTwoTone } from '@ant-design/icons';
import './comparisonTable.css'

const ComparisonTable = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Portfolio / Website builders',
            price: 'Expensive for what you get',
            profile: 'Very flexible',
        },
        {
            key: '2',
            name: 'Social Photography Websites',
            price: 'Minimum uploads to push users to paid plan',
            profile: 'Limited or not available',
        },
        {
            key: '3',
            name: 'Iso Monkey',
            price: 'Ethical Pricing',
            profile: 'Very Flexible',
        },
    ];

    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                const icon = record.key === '3' ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <QuestionCircleTwoTone twoToneColor='orange' />
                return <React.Fragment>
                    <div>{icon} <Space size='large' /><span>{text}</span> </div>
                </React.Fragment>
            }
        },
        {
            title: 'Customisable Profile',
            dataIndex: 'profile',
            key: 'profile',
            render: (text, record) => {
                const icon = record.key !== '2' ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <QuestionCircleTwoTone twoToneColor='orange' />
                return <React.Fragment>
                    <div>{icon} <Space size='large' /><span>{text}</span> </div>
                </React.Fragment>
            }
        },
    ];

    return (
        <React.Fragment>
            <div className='comparison-table-wrapper'>
                <Table
                    className='comparison-table'
                    dataSource={dataSource} columns={columns}
                    pagination={false} />;
            </div>
        </React.Fragment>
    );
}

export default ComparisonTable;
