import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
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


const ManageSubBrand = () => {
    const theme = useTheme();

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
            name: 'Brand Type',
            selector: row => row.type,
        },
        {
            name: 'Sub-Brand Name',
            selector: row => row.subBrandName,
        },
        {
            name: 'Brand Image',
            selector: row => (<div style={{ width: "150px", height: "150px" }}>{row.image}</div>),
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-subbrand', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                // id: i + 1,
                sl: i + 1,
                name: item?.name,
                type: item?.type,
                subBrandName: item?.Brand?.[0]?.name,
                image: <img style={{ width: "150px", height: "150px" }} src={item?.logoUrl} alt={"logo"} />,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        setTableData(apiData);
    }

    // edit
    const handleEdit = (data) => {
        navigate("/edit-sub-brand/" + data?._id, { state: { singleData: data } })
    }

    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-subbrand/" + id, "DELETE")
            if (res && res?.status) {
                getCategoryData();
                toast.success("Sub-Brand Deleted Successfully");
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
                <CustomLoader loading={isLoading} />

                <Header title="MANAGE BRAND" subtitle="" />

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

export default ManageSubBrand
