import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { tokens } from '../../theme';
import HttpClient from '../../utils/HttpClient';
import { MdDelete } from 'react-icons/md';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import ImageInDataTable from '../../CustomComponents/ImageInDataTable';

const ManageWork = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Brand Name',
            selector: row => row.name,
        },
        {
            name: 'Sub-Brand Name',
            selector: row => row.subBrandName,
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Subtitle',
            selector: row => row.subtitle,
        },
        {
            name: 'Media',
            selector: row => row.media,
        },
        {
            name: 'Industry',
            selector: row => row.industry,
        },
        {
            name: 'Language',
            selector: row => row.language,
        },
        {
            name: 'Priority',
            selector: row => row.priority,
        },
        {
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'ThumbNail',
            selector: row => row.thumbNail,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    const getWorkData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-work', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.catName,
                subBrandName: item?.SubBrand?.[0]?.name ? item?.SubBrand?.[0]?.name : "-",
                title: item?.title,
                subtitle: item?.subTitle,
                media: item?.medianame,
                industry: item?.Industryname,
                language: item?.language,
                priority: item?.priority,
                image: <ImageInDataTable src={item?.image?.[0]} />,
                thumbNail: <ImageInDataTable src={item?.thumbNail} />,
                action: <EditDeleteIcon
                    onClickEdit={() => handleEdit(item?._id)}
                    onClickDelete={() => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        setTableData(apiData);
    }

    // edit
    const handleEdit = (id) => {
        navigate("/edit-work/" + id)
    }

    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-work/" + id, "DELETE")
            if (res && res?.status) {
                getWorkData();
                toast.success("Work Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }

    useEffect(() => {
        getWorkData();
    }, [])

    return (
        <div>
            <CustomLoader loading={isLoading} />

            <Box m="12px">
                <Header title="MANAGE WORK" subtitle="" />

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

export default ManageWork
