import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';

const AddPosition = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [position, setPosition] = useState("");
    const [tableData, setTableData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isedit, setisedit] = useState(false)
    const [editdat, seteditdat] = useState({})

    console.log("editdat",editdat)

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

    const getMediaData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('admin-view-career-position', "GET", {});
        // console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.name,

                image: <img style={{ width: "150px", height: "150px" }} src={item?.logoUrl} alt={"logo"} />,
                action: <EditDeleteIcon
                    onClickEdit={() => {
                        window.scrollTo(0, 0)
                        setPosition(item?.name)
                        seteditdat(item)
                        setisedit(true)
                        console.log("jkji", item)
                    }}
                // importickDelete={(e) => handleDelete(item?._id)}
                onClickDelete={()=>handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        setTableData(apiData);
    }

    // edit
    const handleEdit = async () => {

        setIsLoading(true);
        const data = { "name": position }
        const res = await HttpClient.requestData(`admin-edit-career-position/${editdat?._id}`, "PUT", data);
        // console.log("resGetCat", res)

        if (res && res?.status) {
            getMediaData()
            setIsLoading(false);
            setisedit(false)
            setPosition("")

        }
    }


    // delete
    const handleDelete = async(idimportue)=>{
        const del=async()=>{
            const res = await HttpClient.requestData("admin-del-career-position/" + idimportue, "DELETE")
            if (res && res?.status) {
                getMediaData();
                toast.success("Media Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }
            

        DeleteConfirmModal(del);
    }

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        // alert(position)
        if (!position) {

            toast.error("Please Fill All Fields!");
            return
        }

        e.preventDefault();
        const data = { "name": position }
        const res = await HttpClient.requestData("admin-add-career-position", "POST", data);
        if (res && res?.status) {
            getMediaData()
            toast.success(res?.msg);
            setPosition('')
        }

        else {
            toast?.error(res?.msg);
        }
    }



    useEffect(() => {
        getMediaData()
    }, []);

    return (
        <Box m="20px">

            <CustomLoader loading={isLoading} />

            <Header title="ADD POSITION" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">Add position</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Position Name"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>
                </div>

                <Box display="flex" justifyContent="end" mt="20px">
                    {!isedit ?
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"

                            onClick={(e) => handleSubmit(e)}

                        >
                            Add Position
                        </Button> :
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"

                            onClick={(e) => { e.preventDefault(); handleEdit() }}

                        >
                            Edit Position
                        </Button>
                    }
                </Box>

                <div>
                    <DataTable
                        columns={columns}
                        data={tableData}
                        pagination
                        striped
                    />
                </div>
            </form>
        </Box>
    );
}

export default AddPosition