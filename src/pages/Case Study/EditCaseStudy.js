import { Box, Button, Select, TextField, SelectChangeEvent, InputLabel, Skeleton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import HttpClient from "../../utils/HttpClient";

const EditWork = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();

    const initValue = {

        title: "",
        subTitle: "",
        description: "",
        priority: "",
        image: [],
        videoLink: ""
    }
    const [formValue, setFormValue] = useState(initValue);
    const [catData, setCatData] = useState([]);
    const [imageLoader, setImgLoader] = useState(false);
    const [catLoadet, setCatLoader] = useState(false);
    const [singleWork, setSingleWork] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    console.log("formValueddf", formValue)

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    // get case-study data
    const getCategoryData = async () => {
        setCatLoader(true)
        const res = await HttpClient.requestData("view-case-study", "GET", {});
        // console.log("resCat", res);
        if (res && res?.status) {
            setCatLoader(false)
            setCatData(res?.data);
        } else {
            setCatLoader(false);
            toast(res?.message)
        }
    }

    // get single case-study data
    const getSingleWork = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-single-case-study/" + params.id, "GET", {})
        // console.log("resSingg", res);
        if (res && res?.status) {
            setIsLoading(false);
            setSingleWork(res?.data);
            const sinData = res?.data[0]
            setFormValue({
                title: sinData?.title,
                subTitle: sinData?.subTitle,
                description: sinData?.description,
                image: sinData?.image,
                priority: sinData?.priority,
                videoLink: sinData?.video
            })
        } else {
            setIsLoading(false);
        }
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
                let url = res?.data?.url;

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
        if (!formValue.priority) {
            toast.error("Priority is required");
            return true
        }
        // if (formValue?.image.length === 0) {
        //     toast.error("Image is required");
        //     return true
        // }

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
            title: formValue.title,
            subTitle: formValue.subTitle,
            description: formValue.description,
            image: formValue.image,
            priority: formValue?.priority,
            video: formValue.videoLink
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-case-study/" + params.id, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Case Study Udated Successfully");
            setFormValue(initValue);
            navigate('/manage-case-study');
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategoryData();
        getSingleWork();
    }, [])


    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header title="Update Case Study" subtitle="" />

            <form>
                <div className="row">

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

                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Description</label>
                        <textarea
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
                        <label htmlFor="formGroupExampleInput">Priority</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Priority"
                            name="priority"
                            value={formValue.priority}
                            onChange={handleChange}
                        />



                    </div>

                    {/* video link */}
                    <div className="col-6">
                        <label htmlFor="formGroupExampleInput">Video Link</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Video Link"
                            name="videoLink"
                            value={formValue.videoLink}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">

                    {/* Image */}
                    <div className="col-sm-6">
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
                            {formValue?.image?.map((item, i) =>
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
                        Update Case Study
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default EditWork;
