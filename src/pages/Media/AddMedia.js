import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const AddMedia = () => {
    const [catName, setCatName] = useState()
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Media Name is Required");
        }

        const data = {
            name: catName
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-media", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Media Added Successfully");
            setCatName("");
            // navigate('/manage-media');
            setIsLoading(false);
        } else {
            toast.error(res?.message);
        }
    };

    const handleChange = (e) => {
        // console.log("supriti", e.target.value)
        setCatName(e.target.value)
    }

    return (
        <Box m="20px">

            <CustomLoader loading={isLoading} />

            <Header title="ADD MEDIA" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">Media Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Media Name"
                            onChange={handleChange}
                            value={catName}
                            name="media"
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
                        Add Media
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default AddMedia;


