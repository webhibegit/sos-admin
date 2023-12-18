import { Box, Button, TextField, Skeleton } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const EditCategory = () => {
    const navigate = useNavigate();
    const params = useParams();
    const initValue = {
        type: "",
        image: ""
    }
    const [formValue, setFormValue] = useState(initValue);
    const [imageLoader, setImgLoader] = useState(false);
    const [catName, setCatName] = useState();
    const [isLoading, setIsLoading] = useState(false);


    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!catName) {
            return toast.error("Brand Name is Required");
        }
        if (!formValue?.image) {
            return toast.error("Brand Image is Required");
        }

        const data = {
            name: catName,
            type: formValue?.type,
            logoUrl: formValue?.image

        }

        setIsLoading(true);
        const res = await HttpClient.requestData("update-category/" + params.id, "PUT", data);
        if (res && res?.status) {
            toast.success("Brand Updated Successfully")
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
            setFormValue(prev => ({ ...prev, type:sinData?.type, image:sinData.logoUrl}))
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }
      // image upload
      const handleImageChange = async (e) => {
        let file = e.target.files[0]
        let data = new FormData();
        data.append("image", file);
        setImgLoader(true)
        let res = await HttpClient.fileUplode("work-image-upload", "POST", data);
        console.log("resultImg", res);
        if (res && res?.status) {
            setImgLoader(false)
            let url = res?.data?.url;
            setFormValue(prev => ({ ...prev, image: url }))
        } else {
            setImgLoader(false)
            toast?.error(res?.message || "something wrong")
        }

    }

    useEffect(() => {
        getSingleCategory();
    }, [])

    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header title="Update Brand" subtitle="" />

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
                <div className="col">
                    <label htmlFor="formGroupExampleInput">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        placeholder="Image"
                        onChange={handleImageChange}
                        name="image"
                        accept="image/*"
                    />

                    {/* dimention */}
                    <div>
                        (127 x 60 px)
                    </div>

                    {/* picture */}
                    <div>
                        {imageLoader &&
                            <div>
                                <Skeleton variant="rectangular" width={100} height={100} />
                            </div>
                        }

                        {
                            formValue?.image &&
                            <span >
                                < img
                                    src={formValue.image}
                                    className="img-fluid m-1"
                                    alt="Responsive image"
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                                <span
                                    style={{ fontSize: "25px", cursor: "pointer" }}
                                    onClick={() => {
                                        setFormValue(prev => ({ ...prev, image: "" }))
                                    }}
                                >
                                    x
                                </span>
                            </span>
                        }
                    </div>

                    {/* </div> */}
                </div>

                {/*Brand type*/}
                <div className="col">
                    <div>
                        <label htmlFor="formGroupExampleInput">Brand Type</label>
                    </div>
                    <div className="d-flex flex-wrap">
                        <div classname="form-check form-check-inline" style={{ marginRight: "1rem" }}>
                            <input
                                classname="form-check-input"
                                type="radio"
                                name="Brand"
                                id="inlineRadio1"
                                checked={formValue?.type === "National Brand" ? true : false}
                                value="National Brand"
                                onChange={() => setFormValue(prev => ({ ...prev, type: "National Brand" }))}
                            />
                            <label classname="form-check-label" for="inlineRadio1">National Brand</label>
                        </div>

                        <div classname="form-check form-check-inline" style={{ marginRight: "1rem" }}>
                            <input
                                classname="form-check-input"
                                type="radio"
                                name="Brand"
                                id="inlineRadio1"
                                checked={formValue?.type === "Regional Brand" ? true : false}
                                value="Regional Brand"
                                onChange={() => setFormValue(prev => ({ ...prev, type: "Regional Brand" }))}
                            />
                            <label classname="form-check-label" for="inlineRadio1">Regional Brand</label>
                        </div>


                    </div>
                </div>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Update Brand
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default EditCategory;
