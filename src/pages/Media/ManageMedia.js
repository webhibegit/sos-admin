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


const ManageMedia = () => {
    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Media Name',
            selector: row => row.name,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getMediaData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-media', "GET", {});
        // console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
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
            setIsLoading(false);
        }
        setTableData(apiData);
    }

    // edit
    const handleEdit = (id) => {
        navigate("/edit-media/" + id)
    }

    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-media/" + id, "DELETE")
            if (res && res?.status) {
                getMediaData();
                toast.success("Media Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }


    useEffect(() => {
        getMediaData();
    }, [])

    return (
        <div>
            <Box m="12px">
                <CustomLoader loading={isLoading} />

                <Header title="MANAGE MEDIA" subtitle="" />

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

export default ManageMedia

