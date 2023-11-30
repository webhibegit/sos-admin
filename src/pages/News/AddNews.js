import { Box, Button, Skeleton, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import HttpClient from "../../utils/HttpClient";

const AddNews = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [catName, setCatName] = useState();
    const [priority, setPriority] = useState("");
    const [newsImg, setNewsImg] = useState("");
    const [newsLink, setNewsLink] = useState("");
    const [imageLoader, setImgLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    console.log("newsImg", newsLink, newsImg)


    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newsLink) {
            return toast.error("News Link is Required");
        }
        if (!newsImg) {
            return toast.error("Image is Required");
        }
        if (!priority) {
            return toast.error("priority is Required");
        }

        const data = {
            image: newsImg,
            link: newsLink,
            priority: priority
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("add-news", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("News Added Successfully")
            setNewsImg("");
            setNewsLink("");
            setPriority("");
            setIsLoading(false);
            // navigate('/manage-category');
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }

    };


    // image upload
    const handleImageChange = async (e) => {
        let file = e.target.files[0]
        // let imgArr = [];

        let data = new FormData();
        data.append("image", file);
        // console.log(data, "daaaaa");
        setImgLoader(true)
        let res = await HttpClient.fileUplode("work-image-upload", "POST", data);
        // console.log("resultImg", res);
        if (res && res?.status) {
            setImgLoader(false)
            let url = res?.data?.url;

            // imgArr = [...imgArr, url]
            setNewsImg(url)
        } else {
            setImgLoader(false)
            toast?.error(res?.message || "something wrong")
        }
    }


    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header title="ADD NEWS" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">News link</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="News link"
                            onChange={(e) => setNewsLink(e.target.value)}
                            value={newsLink}
                            name="newsLink"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">Piority</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Priority"
                            onChange={(e) => setPriority(e.target.value)}
                            value={priority}
                            name="priority"
                        />
                    </div>

                    <div className="col">
                        <label for="formGroupExampleInput">Image</label>
                        <input
                            type="file"
                            className="form-control"
                            placeholder="Image"
                            onChange={handleImageChange}
                        // value={catName}
                        // name="category"
                        />

                        <div>
                            {imageLoader &&
                                <div>
                                    <Skeleton variant="rectangular" width={100} height={100} />
                                </div>
                            }
                            {newsImg &&
                                <span>
                                    < img
                                        src={newsImg}
                                        className="img-fluid m-1"
                                        alt="Responsive image"
                                        style={{ height: "5rem", width: "5rem" }}
                                    />
                                    <span
                                        style={{ fontSize: "25px", cursor: "pointer" }}
                                        onClick={() => {
                                            setNewsImg("")
                                        }}
                                    >
                                        x
                                    </span>
                                </span>
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
                        Add NEWS
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default AddNews;
