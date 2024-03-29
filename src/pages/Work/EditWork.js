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
        catID: "",
        subBrandId: "",
        title: "",
        subTitle: "",
        description: "",
        media: "",
        industry: "",
        language: "",
        priority: "",
        video: "video",
        image: []
    }
    const [formValue, setFormValue] = useState(initValue);
    const [catData, setCatData] = useState([]);
    const [indusData, setIndusData] = useState([])
    const [mediaData, setMediaData] = useState([])
    const [imageLoader, setImgLoader] = useState(false);
    const [catLoadet, setCatLoader] = useState(false);
    const [singleWork, setSingleWork] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [imgLoader, setImageLoader] = useState(false);
    const [image, setImage] = useState("");
    const [subBrandData, setSubBrandData] = useState([]);

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

    //get industry data
    const getIndustryData = async () => {
        const res = await HttpClient.requestData("view-industry", 'GET', {})
        console.log("fvfvc", res);
        if (res && res.status) {
            setCatLoader(false)
            setIndusData(res?.data)
        } else {
            toast.error(res?.message || "error")
        }
    }

    //get media data
    const getMediaData = async () => {
        setCatLoader(true)
        const res = await HttpClient.requestData("view-media", 'GET', {})
        console.log("fvfvc", res);
        if (res && res.status) {
            setCatLoader(false)
            setMediaData(res?.data)
        } else {
            setCatLoader(false);
            toast.error(res?.message || "error")
        }
    }

    //get Sub-Brand data
    const getSubBrandData = async (id) => {
        setCatLoader(true)
        const res = await HttpClient.requestData("brand-subbrands/" + id, 'GET', {})
        // console.log("fvfvc", res);
        if (res && res.status) {
            setCatLoader(false)
            setSubBrandData(res?.data)
        } else {
            setCatLoader(false);
            toast.error(res?.message || "error")
        }
    }

    // get single work data
    const getSingleWork = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-single-work/" + params.id, "GET", {})
        // console.log("resSingg", res);
        if (res && res?.status) {
            setIsLoading(false);
            setSingleWork(res?.data);
            const sinData = res?.data[0]
            setFormValue({
                catID: sinData?.catID,
                title: sinData?.title,
                subTitle: sinData?.subTitle,
                description: sinData?.description,
                video: sinData?.video,
                image: sinData?.image,
                priority: sinData?.priority,
                media: sinData?.mediaID,
                industry: sinData?.industryID,
                language: sinData?.language,
                subBrandId: sinData?.SubBrand?.[0]?._id ? sinData?.SubBrand?.[0]?._id : ""
            })
            setImage(res?.data[0]?.thumbNail)
        } else {
            setIsLoading(false);
        }
    }

    //for thumbnail
    const Handlethumbnail = async (e) => {
        setImageLoader(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClient.fileUplode("work-image-upload", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res?.data?.url);
            setImage(res?.data?.url);
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    //for cross button
    const HandleCrossClick = () => {
        setImage("");
        let file = document.querySelector("#categoryBanner");
        file.value = "";
    };

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
        if (!formValue?.catID) {
            toast.error("Brand Name is required");
            return true
        }
        // if (!formValue?.title) {
        //     toast.error("Title is required");
        //     return true
        // }
        if (!formValue?.subTitle) {
            toast.error("Subtitle is required");
            return true
        }
        if (!formValue?.description) {
            toast.error("Description is required");
            return true
        }
        if (!formValue?.media) {
            toast.error("Media is required");
            return true
        }
        if (!formValue?.industry) {
            toast.error("Industry is required");
            return true
        }
        if (!formValue?.language) {
            toast.error("Language is required");
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
        // if (!formValue?.video) {
        //     toast.error("Video is required");
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
            catID: formValue.catID,
            subbrandID: formValue.subBrandId ? formValue.subBrandId : null,
            title: formValue.title,
            subTitle: formValue.subTitle,
            description: formValue.description,
            mediaID: formValue.media,
            industryID: formValue.industry,
            language: formValue.language,
            video: formValue.video,
            image: formValue.image,
            priority: formValue?.priority,
            thumbNail: image
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-work/" + params.id, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Work Added Successfully");
            setFormValue(initValue);
            setImage("");
            navigate('/manage-work');
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategoryData();
        getIndustryData();
        getMediaData();
        getSingleWork();
    }, [])

    useEffect(() => {
        if (formValue.catID) {
            getSubBrandData(formValue.catID)
        }
    }, [formValue.catID])



    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header title="Update Work" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Select Brand</label>
                        <select
                            class="form-control"
                            aria-label="Default select example"
                            name="catID"
                            value={formValue.catID}
                            onChange={(e) => {
                                handleChange(e)
                                setFormValue(prev => ({ ...prev, subBrandId: "" }))
                            }}
                        >
                            <option value={""} disabled>Select Brand</option>
                            {catData.map((item, i) =>
                                <option key={i} value={item?._id}>{item?.name}</option>
                            )
                            }
                        </select>
                    </div>

                    {/* sub brand */}
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Select Sub-Brand</label>
                        <select
                            class="form-control"
                            aria-label="Default select example"
                            name="subBrandId"
                            value={formValue.subBrandId}
                            onChange={handleChange}
                        >
                            <option value={""} disabled>Select Sub-Brand</option>
                            {subBrandData.map((item, i) =>
                                <option key={i} value={item?._id}>{item?.name}</option>
                            )
                            }
                        </select>
                    </div>

                </div>

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
                        <label htmlFor="formGroupExampleInput">Select Media</label>
                        <select
                            class="form-control"
                            aria-label="Default select example"
                            name="media"
                            value={formValue.media}
                            onChange={handleChange}
                        >
                            <option value={""} disabled>Select Media</option>
                            {mediaData.map((item, i) =>
                                <option key={i} value={item?._id}>{item?.name}</option>
                            )
                            }
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="formGroupExampleInput">Select Industry</label>
                        <select
                            class="form-control"
                            aria-label="Default select example"
                            name="industry"
                            value={formValue.industry}
                            onChange={handleChange}
                        >
                            <option value={""} disabled>Select Industry</option>
                            {indusData.map((item, i) =>
                                <option key={i} value={item?._id}>{item?.name}</option>
                            )
                            }
                        </select>
                    </div>
                </div>

                <div className="row">

                    <div className="col">
                        <div>
                            <label htmlFor="formGroupExampleInput">Language</label>
                        </div>
                        <div className="d-flex flex-wrap">
                            <div classname="form-check form-check-inline">
                                <input
                                    classname="form-check-input"
                                    type="radio"
                                    name="language"
                                    id="inlineRadio1"
                                    checked={formValue.language === "Bengali"}
                                    value="Bengali"
                                    onChange={() => setFormValue(prev => ({ ...prev, language: "Bengali" }))}
                                />
                                <label classname="form-check-label" for="inlineRadio1">Bengali</label>
                            </div>

                            <div classname="form-check form-check-inline">
                                <input
                                    classname="form-check-input"
                                    type="radio"
                                    name="language"
                                    id="inlineRadio1"
                                    checked={formValue.language === "Hindi"}
                                    value="Hindi"
                                    onChange={() => setFormValue(prev => ({ ...prev, language: "Hindi" }))}
                                />
                                <label classname="form-check-label" for="inlineRadio1">Hindi</label>
                            </div>

                            <div classname="form-check form-check-inline">
                                <input
                                    classname="form-check-input"
                                    type="radio"
                                    name="language"
                                    id="inlineRadio3"
                                    value="English"
                                    checked={formValue.language === "English"}
                                    onChange={() =>
                                        setFormValue(prev => ({ ...prev, language: "English" }),
                                        )}
                                />
                                <label classname="form-check-label" for="inlineRadio3">English</label>
                            </div>
                        </div>
                    </div>



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
                            {formValue?.image.map((item, i) =>
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

                        {/* </div> */}
                    </div>

                    {/* <div className="row"> */}
                    <div className="col-sm-6">
                        <label htmlFor="formGroupExampleInput">Video Link</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Video Link"
                            name="video"
                            value={formValue?.video}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label for="exampleInputEmail1">
                        Thumbnail<span style={{ color: "red" }}></span> :
                    </label>

                    <input
                        class="form-control"
                        onChange={(e) => Handlethumbnail(e)}
                        type="file"
                        id="categoryBanner"
                        accept="image/*"
                    />
                    {imgLoader ? (
                        <>
                            <div>
                                <Skeleton variant="rectangular" width={100} height={100} />
                            </div>
                        </>
                    ) : null}
                    {image && (
                        <>
                            <div>
                                <img
                                    style={{
                                        height: "10%",
                                        width: "10%",
                                        marginTop: "12px",
                                        borderRadius: "5px",
                                    }}
                                    src={image}
                                />
                                <button
                                    onClick={() => HandleCrossClick()}
                                    style={{ color: "red" }}
                                    type="button"
                                    class="btn-close"
                                    aria-label="Close"
                                ></button>
                            </div>
                        </>
                    )}
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
