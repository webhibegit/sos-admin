import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const EditCategory = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();

    const [catName, setCatName] = useState();
    const [isLoading, setIsLoading] = useState(false);


    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!catName) {
            return toast.error("Category Name is Required");
        }

        const data = {
            name: catName
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("update-category/" + params.id, "PUT", data);
        if (res && res?.status) {
            toast.success("Category Updated Successfully")
            navigate('/manage-category');
            setIsLoading(false);
        } else {
            toast.error(res?.message)
            setIsLoading(false);
        }

    };

    // get single Category data
    const getSingleCategory = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-single-category/" + params.id, "GET", {})
        console.log("resSingg", res);
        if (res && res?.status) {
            const sinData = res?.data[0]
            setCatName(sinData?.name)
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }

    useEffect(() => {
        getSingleCategory();
    }, [])

    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header title="Update Category" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Category Name"
                            onChange={handleChange}
                            value={catName}
                            name="category"
                        />
                    </div>
                </div>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Update Category
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default EditCategory;