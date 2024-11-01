import React, { useEffect, useState } from 'react'
import {
    Button,
    Form,
    Input,
    Radio,
    Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany } from '../slice/AdminSlice';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../../features/userSlice';

const CompanyForm = () => {
    const dispatch = useDispatch();
    const [componentSize, setComponentSize] = useState();
    const [companyExists, setCompanyExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm(); // Ant Design form instance
    const navigate = useNavigate();

    // const currentUser = useSelector(selectCurrentUser);
    // console.log("c :", currentUser);

    // useEffect(() => {
    //     if (!currentUser || !currentUser.user || currentUser.user.isAdmin === 'false') {
    //         navigate('/');
    //     }
    // }, [currentUser, navigate])

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const onFinish = (values) => {
        console.log('Form Submitted:', values);
        if (!companyExists) {
            dispatch(addCompany(values));
            alert("Company added successfully");
            form.resetFields(); // Reset form after submission
        }
    };

    const checkCompanyExists = async (companyName) => {
        const lowerCaseName = companyName.toLowerCase();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3200/api/company/check?name=${lowerCaseName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setCompanyExists(data.exists);
        } catch (error) {
            console.error('Error checking company:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedCheckCompanyExists = debounce(checkCompanyExists, 500);

    const handleNameChange = (event) => {
        const companyName = event.target.value;
        form.setFieldsValue({ name: companyName }); // Ensures form validation is triggered
        if (companyName) {
            debouncedCheckCompanyExists(companyName);
        }
    };

    return (
        <Form
            form={form} // Link Ant Design form instance
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
                maxWidth: 600,
                margin: '60px 100px'
            }}
            onFinish={onFinish} // Trigger form submission here
        >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the company name!' }]}
            >
                <Input onChange={handleNameChange} />
            </Form.Item>

            {loading ? (
                <div>Checking...</div>
            ) : companyExists ? (
                <div style={{ color: 'red' }}>Company already exists!</div>
            ) : (
                <div style={{ color: 'green' }}>Company name is available!</div>
            )}

            <Form.Item
                label="Info"
                name="info"
                rules={[{ required: true, message: 'Please provide company information!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Size"
                name="size"
                rules={[{ required: true, message: 'Please provide company size!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Domain"
                name="domain"
                rules={[{ required: true, message: 'Please select a domain!' }]}
            >
                <Select mode="multiple" placeholder="Select domain(s)">
                    <Select.Option value="product">Product</Select.Option>
                    <Select.Option value="it">IT</Select.Option>
                    <Select.Option value="finance">Finance & Banking</Select.Option>
                    <Select.Option value="consulting">Consulting</Select.Option>
                    <Select.Option value="core">Core Engineering</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Company Link"
                name="link"
                rules={[
                    { required: true, message: 'Please provide the company link!' },
                    { type: 'url', message: 'Please enter a valid URL!' }
                ]}
            >
                <Input placeholder="https://example.com" />
            </Form.Item>

            <Form.Item label="Button">
                <Button type='primary' htmlType='submit' disabled={companyExists}>Submit</Button>
            </Form.Item>
        </Form>
    );
}

export default CompanyForm;
