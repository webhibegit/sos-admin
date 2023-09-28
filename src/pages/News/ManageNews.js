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


const ManageNews = () => {
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
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'Link',
            selector: row => row.link,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch News DAta
    const getNewsData = async () => {
        const res = await HttpClient.requestData('view-news', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                image: < img
                    src={item?.image}
                    className="img-fluid m-1"
                    alt="Responsive image"
                    style={{ height: "5rem", width: "5rem" }}
                />,
                link: item?.link,
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
        navigate("/edit-news/" + id)
    }

    // delete
    const handleDelete = (id) => {
        const del = async () => {
            const res = await HttpClient.requestData("delete-news/" + id, "DELETE")
            if (res && res?.status) {
                getNewsData();
                toast.success("News Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }


    useEffect(() => {
        getNewsData();
    }, [])

    return (
        <div>
            <Box m="12px">

                <Header title="MANAGE NEWS" subtitle="" />

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

export default ManageNews
