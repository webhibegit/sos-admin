import { Box, Button} from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const EditIndustry = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [catName, setCatName] = useState();
    const [isLoading, setIsLoading] = useState(false);


    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!catName) {
            return toast.error("Industry Name is Required");
        }

        const data = {
            name: catName
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("update-brand/" + params.id, "PUT", data);
        if (res && res?.status) {
            toast.success("Industry Updated Successfully")
            navigate('/manage-industry');
            setIsLoading(false);
        } else {
            toast.error(res?.message)
            setIsLoading(false);
        }

    };

    // get single Category data
    const getSingleIndustry = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-single-industry/" + params.id, "GET", {})
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
        // console.log("supriti", e.target.value)
        setCatName(e.target.value)
    }

    useEffect(() => {
        getSingleIndustry();
    }, [])

    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header title="Update Industry" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">Industry Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Industry Name"
                            onChange={handleChange}
                            value={catName}
                            name="industry"
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
                        Update Industry
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default EditIndustry;
