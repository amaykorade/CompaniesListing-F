import React from 'react'
import { CompanyListFilter } from '../molecules/companyListFilter'
import { CompanyList } from './CompanyList'

export const Company = () => {
    return (
        <div>
            <CompanyListFilter />
            <CompanyList />
        </div>
    )
}
