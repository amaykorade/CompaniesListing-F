import { Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterCompList } from '../features/companyListSlice';
import { selectCompanyList } from '../components/Admin/slice/AdminSlice';

export const CompanyListFilter = () => {
    const dispatch = useDispatch();
    const [sizeRange, setSizeRange] = useState('');
    const [selectedDomain, setSelectedDomain] = useState([]);

    const companies = useSelector(selectCompanyList);
    // console.log(companies.length);

    useEffect(() => {
        // This will trigger whenever sizeRange or selectedDomain changes
        const [minSize, maxSize] = sizeRange.split('-').map((value) => value.trim());

        const filters = {
            minSize: !isNaN(minSize) && minSize !== '' ? parseInt(minSize) : undefined,
            maxSize: !isNaN(maxSize) && maxSize !== '' ? parseInt(maxSize) : undefined,
            domain: selectedDomain.length > 0 ? selectedDomain : undefined, // Check if domain is cleared
        };

        dispatch(fetchFilterCompList(filters));
    }, [sizeRange, selectedDomain, dispatch]); // Re-run filter when these change

    return (
        <div style={{ margin: '30px 5px 20px 5px', width: '50%', display: 'flex', justifyContent: 'space-between' }}>
            <Input
                placeholder="Enter size range (e.g., 0-3000)"
                value={sizeRange}
                onChange={(e) => setSizeRange(e.target.value)} // Update sizeRange, filtering happens in useEffect
                style={{ width: '30%' }}
            />
            <Select
                mode="multiple"
                placeholder="Select domain"
                value={selectedDomain}
                onChange={(value) => setSelectedDomain(value)} // Update domain, filtering happens in useEffect
                style={{ width: '30%' }}
                allowClear // Ensure that domain can be cleared
            >
                <Select.Option value="product">PRODUCT BASED</Select.Option>
                <Select.Option value="consulting">CONSULTING FIRM</Select.Option>
                <Select.Option value="finance">FINANCE</Select.Option>
                <Select.Option value="it">IT</Select.Option>
                <Select.Option value="core">CORE ENGINEERING</Select.Option>
                <Select.Option value="others">OTHERS</Select.Option>
            </Select>
            <div style={{ marginTop: '10px' }}>
                <strong>Total Companies Present:</strong> {companies.length}
            </div>
        </div>
    );
};
