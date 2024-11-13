import React, { useEffect, useState } from 'react'

import { Avatar, Button, Space, Table, Tag } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncCompList, getAllCompList } from '../features/companyListSlice';
// import { render } from 'less';
// import { CompanyListFilter } from '../molecules/companyListFilter';

const columns = [
    {
        title: 'Logo',
        dataIndex: 'link',
        key: 'logo',
        render: (link) => (
            <img
                src={`https://logo.clearbit.com/${new URL(link).hostname}`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/fallback-avatar.png'; }}
                alt="Company Logo"
                style={{ width: 30, height: 30, borderRadius: '50%' }}
            />
        ),

    },
    {
        title: 'Company Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <a href={record.link} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
        ),
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: (size) => `${size}+`,
    },

    {
        title: 'Info',
        dataIndex: 'info',
        key: 'info',
        render: (info) => {
            const maxLength = 50;
            if (info.length > maxLength) {
                return (
                    <span>
                        {info.slice(0, maxLength)}...
                        <span title={info}> (more) </span>
                    </span>
                )
            } else {
                return (
                    <span> {info} </span>
                )
            }
        }
    },
    {
        title: 'Domain',
        key: 'domain',
        dataIndex: 'domain',
        render: (domains) => (
            Array.isArray(domains) ? (
                domains.map((domain) => {
                    let color;

                    switch (domain.toLowerCase()) {
                        case 'product based':
                            color = 'geekblue';
                            break;
                        case 'consulting firm':
                            color = 'green';
                            break;
                        case 'finance':
                            color = 'gold';
                            break;
                        case 'it':
                            color = 'purple';
                            break;
                        case 'core':
                            color = 'red';
                            break;
                        default:
                            color = 'cyan';
                    }

                    return (
                        <Tag color={color} key={domain}>
                            {domain.toUpperCase()}
                        </Tag>
                    );
                })
            ) : (
                <Tag color="cyan">{domains}</Tag>
            )
        )
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];



export const CompanyList = () => {
    const dispatch = useDispatch();
    const companyList = useSelector(getAllCompList);
    const status = useSelector((state) => state.companies.status);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);



    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAsyncCompList());
        }
    }, [dispatch, status]);

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    }



    const paginatedCompanies = companyList.slice(0, currentPage * pageSize);

    if (status === 'loading') {
        return <p
            style={{
                textAlign: 'center',
                marginTop: '100px',
                fontSize: '1rem'
            }}
        >Loading companies...</p>;
    }

    if (status === 'failed') {
        return <p
            style={{
                textAlign: 'center',
                marginTop: '100px',
                fontSize: '3rem'
            }}
        >Login to get the list </p>;
    }

    if (!companyList || companyList.length === 0) {
        return <p>No companies found</p>;
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Table columns={columns} dataSource={paginatedCompanies} rowKey="id" scroll={{ y: 450 }}
                pagination={false} />
            {currentPage * pageSize < companyList.length && (
                <Button type="primary" onClick={handleLoadMore} style={{ margin: '5px 10px' }}>
                    Load More
                </Button>
            )}
        </div>
    )
}
