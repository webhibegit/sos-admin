import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tokens } from '../../theme';
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';


const ManageCAtegory = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Category Name',
            selector: row => row.name,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        const res = await HttpClient.requestData('view-category', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.name,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item?._id)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {

        }
        setTableData(apiData);
    }

    // edit
    const handleEdit = (id) => {
        navigate("/edit-category/" + id)
    }

    // delete
    const handleDelete = (id) => {
        const del = async () => {
            const res = await HttpClient.requestData("delete-category/" + id, "DELETE")
            if (res && res?.status) {
                getCategoryData();
                toast.success("Work Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }


    useEffect(() => {
        getCategoryData();
    }, [])

    return (
        <div>
            <Box m="12px">

                <Header title="MANAGE CATEGORY" subtitle="" />

                <div>
                    <DataTable
                        columns={columns}
                        data={tableData}
                    />
                </div>
            </Box>

        </div>
    )
}

export default ManageCAtegory
