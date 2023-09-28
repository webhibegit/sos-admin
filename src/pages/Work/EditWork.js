import { Box, Button, Select, TextField, SelectChangeEvent, InputLabel, Skeleton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import HttpClient, { IMAGE_URL } from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";

const EditWork = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();

    const initValue = {
        catID: "",
        title: "",
        subTitle: "",
        description: "",
        video: "video",
        image: []
    }
    const [formValue, setFormValue] = useState(initValue);
    const [catData, setCatData] = useState([]);
    const [imageLoader, setImgLoader] = useState(false);
    const [catLoadet, setCatLoader] = useState(false);
    const [singleWork, setSingleWork] = useState({});

    console.log("formValueddf", formValue)

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    // get category data
    const getCategoryData = async () => {
        setCatLoader(true)
        const res = await HttpClient.requestData("view-category", "GET", {});
        // console.log("resCat", res);
        if (res && res?.status) {
            setCatLoader(false)
            setCatData(res?.data);
        } else {
            setCatLoader(false);
            toast(res?.message)
        }
    }

    // get single work data
    const getSingleWork = async () => {
        const res = await HttpClient.requestData("view-single-work/" + params.id, "GET", {})
        console.log("resSingg", res);
        if (res && res?.status) {
            setSingleWork(res?.data);
            const sinData = res?.data[0]
            setFormValue({
                catID: sinData?.catID,
                title: sinData?.title,
                subTitle: sinData?.subTitle,
                description: sinData?.description,
                video: sinData?.video,
                image: sinData?.image
            })
        } else {

        }
    }

    // video upload
    const handleVideoUpload = async (e) => {
        // let file = e.target.files[0]
        // let data = new FormData();
        // data.append("image", file);
        // console.log(data, "daaaaa");
        // let result = await HttpClient.fileUplode(
        //     "image-upload/product",
        //     "POST",
        //     data
        // );
    }

    // image upload
    const handleImageChange = async (e) => {
        let file = e.target.files
        let imgArr = formValue?.image
        for (let item of file) {
            let data = new FormData();
            data.append("image", item);
            // console.log(data, "daaaaa");
            setImgLoader(true)
            let res = await HttpClient.fileUplode("work-image-upload", "POST", data);
            console.log("resultImg", res);
            if (res && res?.status) {
                setImgLoader(false)
                let url = IMAGE_URL + res?.data;
                imgArr = [...imgArr, url]
                setFormValue(prev => ({ ...prev, image: imgArr }))
            } else {
                setImgLoader(false)
                toast?.error(res?.message || "something wrong")
            }
        }
    }

    // validate
    const validate = () => {
        if (!formValue?.catID) {
            toast.error("Category Name is required");
            return true
        }
        if (!formValue?.title) {
            toast.error("Title is required");
            return true
        }
        if (!formValue?.subTitle) {
            toast.error("Subtitle is required");
            return true
        }
        if (!formValue?.description) {
            toast.error("Description is required");
            return true
        }
        // if (!formValue?.video) {
        //     toast.error("Video is required");
        //     return true
        // }
        if (formValue?.image.length === 0) {
            toast.error("Image is required");
            return true
        }

        return false
    }

    // submit
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            catID: formValue.catID,
            title: formValue.title,
            subTitle: formValue.subTitle,
            description: formValue.description,
            video: formValue.video,
            image: formValue.image
        }
        const res = await HttpClient.requestData("update-work/" + params.id, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Work Added Successfully");
            setFormValue(initValue);
            navigate('/manage-work');
        } else {
            toast.error(res?.message || "Something Wrong");
        }
    };

    useEffect(() => {
        getCategoryData();
        getSingleWork();
    }, [])


    return (
        <Box m="20px">
            <Header title="Update Work" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Select Category</label>
                        <select
                            class="form-control"
                            aria-label="Default select example"
                            name="catID"
                            value={formValue.catID}
                            onChange={handleChange}
                        >
                            {/* {catLoadet && <option value={""} disabled>Loading...</option>} */}
                            <option value={""} disabled>Selecet Category</option>
                            {catData?.map((item, i) =>
                                <option key={i} value={item?._id}>{item?.name}</option>
                            )
                            }
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            value={formValue.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Subtitle</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Subtitle"
                            name="subTitle"
                            value={formValue.subTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            name="description"
                            value={formValue.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Video</label>
                        <input
                            type="file"
                            className="form-control"
                            placeholder="Video"
                            onChange={handleVideoUpload}
                            // value={catName}
                            name="category"
                        />
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
                            multiple
                        />

                        <div>
                            {imageLoader
                                ?
                                <div>
                                    <Skeleton variant="rectangular" width={100} height={100} />
                                </div>
                                :
                                <>                                {formValue?.image?.map((item, i) =>
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
                                }
                                </>

                            }
                        </div>

                    </div>
                </div>



                {/* Button */}
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Update Work
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default EditWork;
