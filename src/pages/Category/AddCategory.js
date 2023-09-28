import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const AddCategory = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [catName, setCatName] = useState()
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Category Name is Required");
        }

        const data = {
            name: catName
        }
        const res = await HttpClient.requestData("add-category", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Category Added Successfully")
            setCatName("");
            // navigate('/manage-category');
        } else {
            toast.error(res?.message)
        }

    };

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }

    return (
        <Box m="20px">

            <CustomLoader loading={isLoading} />

            <Header title="ADD CATEGORY" subtitle="" />

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
                        Add Category
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default AddCategory;
