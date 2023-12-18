import React, { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react';
import { Box, Typography, buttonClasses, useMediaQuery } from '@mui/material';

import DataTable from 'react-data-table-component';
import { tokens } from '../../theme';
import HttpClient from '../../utils/HttpClient';
import { MdDelete } from 'react-icons/md';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import ImageInDataTable from '../../CustomComponents/ImageInDataTable';

const AppliedPosition = () => {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Phone Number',
            selector: row => row.phone,
        },
        {
            name: 'Applying Role',
            selector: row => row.role,
        },
        {
            name: 'CV',
            selector: row => row.cv,
        },
        {
            name: 'Cover Letter',
            selector: row => row.CoverLetter,
        },
        {
            name: 'Portfolio Link',
            selector: row => row.portfolio,
        }
    ];

    const getCaseStudyData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('get-all-user-form-data', "GET", {});
        // console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.reverse()?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.name,
                email: item?.email,
                phone: item?.phoneNo,
                role: item?.applyingRole,
                cv: <a href={item?.cvLink}>view</a>,
                CoverLetter: <a href={item?.coverLetterlink}>View</a>,
                portfolio: <a href={item?.portfolioLink}>View</a>
            }));
        } else {
            setIsLoading(false);
        }
        setTableData(apiData);
    }
    useEffect(() => {
        getCaseStudyData();
    }, [])


    return (
        <div>
            <CustomLoader loading={isLoading} />

            <Box m="12px">
                <Header title="APPLIED POSITION" subtitle="" />

                <div>
                    <DataTable
                        columns={columns}
                        data={tableData}
                        pagination
                        striped
                    />
                </div>
            </Box>


        </div>
    )
}

export default AppliedPosition