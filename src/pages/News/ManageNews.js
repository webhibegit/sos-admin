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
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import ImageInDataTable from '../../CustomComponents/ImageInDataTable';


const ManageNews = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
            name: 'Thumbnail Image',
            selector: row => row.thumbNailImg,
        },
        {
            name: 'Link',
            selector: row => row.link,
        },
        {
            name: 'Priority',
            selector: row => row.priority,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch News DAta
    const getNewsData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-news', "GET", {});
        // console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                image: <ImageInDataTable src={item?.image} />,
                thumbNailImg: <ImageInDataTable src={item?.thumbnailImage} />,
                link: item?.link,
                priority: item?.priority,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item?._id)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
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
            setIsLoading(true);
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
                <CustomLoader loading={isLoading} />


                <Header title="MANAGE NEWS" subtitle="" />

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

export default ManageNews
