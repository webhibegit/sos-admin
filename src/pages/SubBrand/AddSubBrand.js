import { Box, Button, Skeleton, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const AddSubBrand = () => {
    const [catName, setCatName] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const initValue = {
        brandId: "",
        name: "",
        type: "National Brand",
        image: ""
    }
    const [formValue, setFormValue] = useState(initValue);
    const [imageLoader, setImgLoader] = useState(false);
    const [brandData, setBrandData] = useState([]);

    console.log("formvalue", formValue)

    // handle submit
    const handleSubmit = async (e) => {
        // console.log("valueAddCareersdd");
        e.preventDefault();

        if (!formValue.brandId) {
            return toast.error("Please Select a Brand");
        }
        if (!formValue?.name) {
            return toast.error("Brand Name is Required");
        }
        // if (!formValue?.image) {
        //     return toast.error("Brand Image is Required");
        // }


        const data = {
            "brandID": formValue.brandId,
            "name": formValue.name,
            "type": formValue.type,
            "logoUrl": formValue.image
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-subbrand", "POST", data);
        console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Sub-Brand Added Successfully");
            setFormValue(initValue);
            // navigate('/manage-category');
            setIsLoading(false);
        } else {
            toast.error(res?.message);
        }
    };

    // handleChange
    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        const { name, value } = e.target;
        setFormValue(prev => ({ ...prev, [name]: value }))
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

    // get all brand Data
    const getBrandData = async () => {
        setIsLoading(true)
        const res = await HttpClient.requestData("view-category", "GET", {})
        if (res && res?.status) {
            setIsLoading(false)
            setBrandData(res?.data)
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBrandData();
    }, [])

    return (
        <Box m="20px">

            <CustomLoader loading={isLoading} />

            <Header title="ADD SUB-BRAND" subtitle="" />

            <form>
                <div className="row">
                    <div className="col-6">
                        <label for="formGroupExampleInput">Select Brand</label>
                        <select
                            placeholder="Select Brand"
                            class="form-control"
                            aria-label="Default select example"
                            name="brandId"
                            value={formValue.brandId}
                            onChange={handleChange}
                        >
                            <option value={""} disabled>Select Brand</option>
                            {brandData.map((item, i) =>
                                <option key={i} value={item?._id}>{item?.name}</option>
                            )
                            }
                        </select>
                    </div>

                    <div className="col-6">
                        <label for="formGroupExampleInput">Sub-Brand Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Sub-Brand Name"
                            onChange={handleChange}
                            value={formValue.name}
                            name="name"
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
                        Add Sub-Brand
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default AddSubBrand;
