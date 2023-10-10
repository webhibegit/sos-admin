import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';


const ManageBrand = () => {
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
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getBrandData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-brand', "GET", {});
        // console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.name,
                image:
                    item?.image ? (
                        <>
                            <img style={{ height: "4rem", width: "4rem", margin: "4px", borderRadius: "5px" }} src={item?.image} />,
                        </>
                    ) : (
                        <>
                            <img
                                style={{ height: "5rem", width: "5rem" }}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" />
                        </>
                    ),
                // <img style={{ height:"4rem" , width:"4rem" , margin:"4px" , borderRadius:"5px"}}src={item?.image} />,
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
    const handleEdit = (ele) => {
        navigate("/edit-brand", { state: ele })
    }
    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-brand/" + id, "DELETE")
            if (res && res?.status) {
                getBrandData();
                toast.success("Brand Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }


    useEffect(() => {
        getBrandData();
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

export default ManageBrand
