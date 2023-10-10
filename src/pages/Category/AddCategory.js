import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const AddCategory = () => {
    const [catName, setCatName] = useState()
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Brand Name is Required");
        }

        const data = {
            name: catName
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-category", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Brand Added Successfully");
            setCatName("");
            // navigate('/manage-category');
            setIsLoading(false);
        } else {
            toast.error(res?.message);
        }
    };

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }

    return (
        <Box m="20px">

            <CustomLoader loading={isLoading} />

            <Header title="ADD BRAND" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">Brand Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Brand Name"
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
                        Add Brand
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default AddCategory;
