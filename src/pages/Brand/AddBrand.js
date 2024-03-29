import { Box, Button, Select, TextField, SelectChangeEvent, InputLabel, Skeleton } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import HttpClient from "../../utils/HttpClient";

const AddBrand = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const [catData, setCatData] = useState([]);
    const [imageLoader, setImgLoader] = useState(false);
    const [catLoadet, setCatLoader] = useState(false)


    // get category data
    const getCategoryData = async () => {
        setCatLoader(true)
        const res = await HttpClient.requestData("view-category", "GET", {});
        console.log("resCat", res);
        if (res && res?.status) {
            setCatLoader(false)
            setCatData(res?.data);
        } else {
            setCatLoader(false);
            toast(res?.message)
        }
    }



    // image upload
    const handleImageChange = async (e) => {
        let file = e.target.files[0];
        let data = new FormData()
        data.append("image", file);
        let res = await HttpClient.fileUplode("work-image-upload", "POST", data);
        if (res && res.status) {
            let url = res?.data?.url;

            setImage(url);
        }
        else {
            toast.error(res.message)
        }
    }

    // validate
    const validate = () => {
        if (!name) {
            toast.error("Brand Name is required");
            return true
        }

        if (!image) {
            // toast.error("Image is required");
            // return true
        }

        return false
    }

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            name: name,
            image: image,
        }

        // console.log("Dsata", data);
        setIsLoading(true);
        const res = await HttpClient.requestData("add-brand", "POST", data);
        if (res && res?.status) {
            toast.success("Brand is Added Successfully");
            setName("");
            setImage("");
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategoryData();
    }, [])



    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header name="ADD BRAND" subname="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter brand name"
                            name="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                </div>

                <div className="row">

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
                            (700 x 700 px)
                        </div>

                        {/* picture */}
                        <div>
                            {imageLoader &&
                                <div>
                                    <Skeleton variant="rectangular" width={100} height={100} />
                                </div>
                            }
                            {/* {formValue?.image.map((item, i) =>
                                <span key={i}>
                                    < img
                                        src={item}
                                        className="img-fluid m-1"
                                        alt="Responsive image"
                                        style={{ height: "5rem", width: "5rem" }}
                                    />
                                    <span
                                        style={{ fontSize: "25px", cursor: "pointer" }}
                                        onClick={() => {
                                            let imgArr = formValue?.image.filter((item, ind) => ind !== i)
                                            setFormValue(prev => ({ ...prev, image: imgArr }))
                                        }}
                                    >
                                        x
                                    </span>
                                </span>
                            )
                            } */}

                            {
                                image && < img
                                    src={image}
                                    className="img-fluid m-1"
                                    alt="Responsive image"
                                    style={{ height: "5rem", width: "5rem" }}
                                />
                            }
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
                        Add Brand
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddBrand;
