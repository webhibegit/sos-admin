// import React from 'react'
// import { Box, Button, Select, TextField, SelectChangeEvent, InputLabel, Skeleton } from "@mui/material";
// import Header from "../../components/Header";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import CustomLoader from "../../CustomComponents/loader/CustomLoader";
// import HttpClient from "../../utils/HttpClient";
// import DataTable from 'react-data-table-component';
// import ImageInDataTable from '../../CustomComponents/ImageInDataTable';
// import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
// import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
// import { useNavigate, useParams } from 'react-router-dom';

// const AddAndManageThoughtLeaders = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const params = useParams();

//     const initValue = {
//         title: "",
//         designation: "",
//         description: "",
//         image: []
//     }
//     const [formValue, setFormValue] = useState(initValue);
//     const [catData, setCatData] = useState([]);
//     const [imageLoader, setImgLoader] = useState(false);
//     const [catLoadet, setCatLoader] = useState(false)
//     const [tableData, setTableData] = useState([]);
//     const [singleWork, setSingleWork] = useState({});

//     console.log("formValueddf", formValue)

//     // other inputs change
//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setFormValue(prev => ({ ...prev, [name]: value }));
//     }

//     // get case-study data
//     // const getThoughtLeadersData = async () => {
//     //     setCatLoader(true)
//     //     const res = await HttpClient.requestData("view-case-study", "GET", {});
//     //     console.log("resCat", res);
//     //     if (res && res?.status) {
//     //         setCatLoader(false)
//     //         setCatData(res?.data);
//     //     } else {
//     //         setCatLoader(false);
//     //         toast(res?.message)
//     //     }
//     // }


//     // image upload
//     const handleImageChange = async (e) => {
//         let file = e.target.files
//         let imgArr = formValue?.image
//         for (let item of file) {
//             let data = new FormData();
//             data.append("image", item);
//             // console.log(data, "daaaaa");
//             setImgLoader(true)
//             let res = await HttpClient.fileUplode("work-image-upload", "POST", data);
//             console.log("resultImg", res);
//             if (res && res?.status) {
//                 setImgLoader(false)
//                 let url = res?.data?.url;
//                 imgArr = [...imgArr, url]
//                 setFormValue(prev => ({ ...prev, image: imgArr }))
//             } else {
//                 setImgLoader(false)
//                 toast?.error(res?.message || "something wrong")
//             }
//         }
//     }

//     // validate
//     const validate = () => {

//         if (!formValue?.title) {
//             toast.error("Title is required");
//             return true
//         }
//         if (!formValue?.designation) {
//             toast.error("Designation is required");
//             return true
//         }
//         // if (!formValue?.priority) {
//         //     toast.error("Priority is required");
//         //     return true
//         // }
//         if (!formValue?.description) {
//             toast.error("Description is required");
//             return true
//         }
//         // if (formValue?.image.length === 0) {
//         //     toast.error("Image is required");
//         //     return true
//         // }

//         return false
//     }

//     // submit
//     const handleSubmit = async (e) => {
//         // console.log("valuesdd");
//         e.preventDefault();

//         if (validate()) {
//             return
//         }

//         const data = {
//             title: formValue.title,
//             designation: formValue.designation,
//             description: formValue.description,
//             image: formValue.image,

//         }
//         setIsLoading(true);
//         const res = await HttpClient.requestData("add-case-study", "POST", data);
//         // console.log("resCat", res)
//         if (res && res?.status) {
//             toast.success(res?.message);
//             setFormValue(initValue);
//             // navigate('/manage-case-study');
//             setIsLoading(false);
//         } else {
//             toast.error(res?.message || "Something Wrong");
//             setIsLoading(false);
//         }
//     };

//     //for fetching data
//     const getThoughtLeadersData = async () => {
//         setIsLoading(true);
//         const res = await HttpClient.requestData('view-case-study', "GET", {});
//         // console.log("resGetCat", res)
//         let apiData = []
//         if (res && res?.status) {
//             setIsLoading(false);
//             apiData = res?.data?.map((item, i) => ({
//                 id: i + 1,
//                 sl: i + 1,
//                 name: item?.catName,
//                 title: item?.title,
//                 designation: item?.designation,
//                 priority: item?.priority,
//                 image: <ImageInDataTable src={item?.image?.[0]} />,
//                 action: <EditDeleteIcon
//                     onClickEdit={() => handleEdit(item?._id)}
//                     onClickDelete={() => handleDelete(item?._id)}
//                 />
//             }));
//         } else {
//             setIsLoading(false);
//         }
//         setTableData(apiData);
//     }


//     // get single case-study data
//     const getSingleThoughLeaders = async () => {
//         setIsLoading(true);
//         const res = await HttpClient.requestData("view-single-case-study/" + params.id, "GET", {})
//         // console.log("resSingg", res);
//         if (res && res?.status) {
//             setIsLoading(false);
//             setSingleWork(res?.data);
//             const sinData = res?.data[0]
//             setFormValue({
//                 title: sinData?.title,
//                 subTitle: sinData?.subTitle,
//                 description: sinData?.description,
//                 image: sinData?.image,
//                 priority: sinData?.priority
//             })
//         } else {
//             setIsLoading(false);
//         }
//     }

//     //for edit
//     const handleEdit = (id) => {
//         navigate("/edit-case-study/" + id)
//     }


//     const handleUpdate = async (e) => {
//         // console.log("valuesdd");
//         e.preventDefault();
//         if (validate()) {
//             return
//         }

//         const data = {
//             title: formValue.title,
//             subTitle: formValue.subTitle,
//             description: formValue.description,
//             image: formValue.image,
//             priority: formValue?.priority
//         }
//         setIsLoading(true);
//         const res = await HttpClient.requestData("update-case-study/" + params.id, "PUT", data);
//         // console.log("resCat", res)
//         if (res && res?.status) {
//             toast.success("Case Study Udated Successfully");
//             setFormValue(initValue);
//             // navigate('/manage-case-study');
//             setIsLoading(false);
//         } else {
//             toast.error(res?.message || "Something Wrong");
//             setIsLoading(false);
//         }
//     };


//     //for delete
//     const handleDelete = (id) => {
//         const del = async () => {
//             setIsLoading(true);
//             const res = await HttpClient.requestData("delete-case-study/" + id, "DELETE")
//             if (res && res?.status) {
//                 getThoughtLeadersData();
//                 toast.success("Thought Leaders Deleted Successfully");
//             } else {
//                 toast.error(res?.message || "Something Wrong");
//             }
//         }

//         DeleteConfirmModal(del);
//     }


//     const columns = [
//         {
//             name: 'SL',
//             selector: row => row.sl,
//         },
//         {
//             name: 'Title',
//             selector: row => row.title,
//         },
//         {
//             name: 'Designation',
//             selector: row => row.designation,
//         },
//         // {
//         //     name: 'Priority',
//         //     selector: row => row.priority,
//         // },
//         {
//             name: 'Image',
//             selector: row => row.image,
//         },
//         {
//             name: 'Action',
//             selector: row => row.action,
//         }
//     ];

//     useEffect(() => {
//         getThoughtLeadersData();
//         getSingleThoughLeaders();
//     }, [])


//     return (
//         <Box m="20px">
//             <CustomLoader loading={isLoading} />

//             <Header title="ADD THOUGHT LEADERS" subtitle="" />

//             <form>
//                 <div className="row">

//                     <div className="col">
//                         <label htmlFor="formGroupExampleInput">Title</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Title"
//                             name="title"
//                             value={formValue.title}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="col">
//                         <label htmlFor="formGroupExampleInput">Designation</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Designation"
//                             name="designation"
//                             value={formValue.designation}
//                             onChange={handleChange}
//                         />
//                     </div>

//                 </div>

//                 {/* <div className="row">
//                     <div className="col">
//                         <label htmlFor="formGroupExampleInput">Description</label>
//                         <textarea
//                             type="text"
//                             className="form-control"
//                             placeholder="Description"
//                             name="description"
//                             value={formValue.description}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div> */}

//                 {/* <div className="col">
//                         <label htmlFor="formGroupExampleInput">Priority</label>
//                         <input
//                             type="number"
//                             className="form-control"
//                             placeholder="Priority"
//                             name="priority"
//                             value={formValue.priority}
//                             onChange={handleChange}
//                         />

//                     </div> */}
//                 <div className="row">
//                     <div className="col">
//                         <label htmlFor="formGroupExampleInput">Description</label>
//                         <textarea
//                             type="text"
//                             className="form-control"
//                             placeholder="Description"
//                             name="description"
//                             value={formValue.description}
//                             onChange={handleChange}
//                         />
//                     </div>


//                     <div className="col-sm-6">
//                         <label htmlFor="formGroupExampleInput">Image</label>
//                         <input
//                             type="file"
//                             className="form-control"
//                             placeholder="Image"
//                             onChange={handleImageChange}
//                             name="image"
//                             accept="image/*"
//                             multiple
//                         />

//                         {/* dimention */}
//                         <div>
//                             (700 x 700 px)
//                         </div>

//                         {/* picture */}
//                         <div>
//                             {imageLoader &&
//                                 <div>
//                                     <Skeleton variant="rectangular" width={100} height={100} />
//                                 </div>
//                             }
//                             {formValue?.image?.map((item, i) =>
//                                 <span key={i}>
//                                     < img
//                                         src={item}
//                                         className="img-fluid m-1"
//                                         alt="Responsive image"
//                                         style={{ height: "5rem", width: "5rem" }}
//                                     />
//                                     <span
//                                         style={{ fontSize: "25px", cursor: "pointer" }}
//                                         onClick={() => {
//                                             let imgArr = formValue?.image.filter((item, ind) => ind !== i)
//                                             setFormValue(prev => ({ ...prev, image: imgArr }))
//                                         }}
//                                     >
//                                         x
//                                     </span>
//                                 </span>
//                             )
//                             }
//                         </div>

//                     </div>
//                 </div>


//                 {/* Button */}
//                 <Box display="flex" justifyContent="end" mt="20px">
//                     <Button
//                         type="submit"
//                         color="secondary"
//                         variant="contained"
//                         onClick={(e) => handleSubmit(e)}
//                     >
//                         Add Thought Leaders
//                     </Button>
//                 </Box>
//             </form>



//             <Box m="12px">
//                 <Header title="MANAGE CASE STUDY" subtitle="" />

//                 <div>
//                     <DataTable
//                         columns={columns}
//                         data={tableData}
//                         pagination
//                         striped
//                     />
//                 </div>
//             </Box>
//         </Box>



//     );
// };

// export default AddAndManageThoughtLeaders;



import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import HttpClient from "../../utils/HttpClient";
import { useParams } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import Header from "../../components/Header";

const AddAndManageThoughtLeaders = () => {
    const params = useParams();
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [imageLoader, setImageLoader] = useState(false);
    const [loading, setLoading] = useState(false);

    const [allMood, setAllMood] = useState([]);

    const [hide, setHide] = useState(true);
    const [id, setId] = useState("");

    useEffect(() => {
        fetchAllMood();
    }, []);

    //for cross button
    const HandleCrossClick = () => {
        setImage("");
        let file = document.querySelector("#image");
        file.value = "";
    };

    //for edit 
    const onEdit = (item) => {
        window.scroll(0, 0);
        console.log("item", item);
        setImage(item?.image);
        setName(item?.name);
        setDesignation(item?.designation);
        setDescription(item?.description)
        setId(item?._id);
        setHide(false);
    };


    //for delete
    const onDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't  to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                HttpClient.requestData("admin-del-people-thought/" + id, "DELETE")
                    .then((res) => {
                        if (res && res.status) {
                            toast.success("Deleted Successfully");

                            fetchAllMood();
                        } else {
                            toast.error(res?.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    // const handleDelete = (id) => {
    //     const del = async () => {
    //         setIsLoading(true);
    //         const res = await HttpClient.requestData("delete-news/" + id, "DELETE")
    //         if (res && res?.status) {
    //             getNewsData();
    //             toast.success("News Deleted Successfully");
    //         } else {
    //             toast.error(res?.message || "Something Wrong");
    //         }
    //     }

    //     DeleteConfirmModal(del);
    // }

    //for image upload
    const HandleImage = async (e) => {
        setImageLoader(true);
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);

        let res = await HttpClient.fileUplode("work-image-upload", "POST", data);

        if (res && res.status) {
            console.log("UploadImageRes", res);
            setImage(res?.data?.url);
        } else {
            toast.error(res?.message);
        }
        setImageLoader(false);
    };

    //for fetching all data
    const fetchAllMood = () => {
        setLoading(true);
        HttpClient.requestData('admin-view-people-thought', "GET", {})
            .then((res) => {
                console.log("ResAllBlog", res.data);
                if (res && res?.status) {
                    setLoading(false);
                    // setLoader(false)
                    let arr = res?.data?.map((item, index) => {
                        return {
                            sl: index + 1,
                            name: item?.name,
                            designation: item?.designation,
                            description: item?.description,
                            Image: (
                                <>
                                    {item?.image ? (
                                        <img
                                            style={{
                                                height: "29%",
                                                width: "29%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={item?.image}
                                        />
                                    ) : (
                                        <img
                                            style={{
                                                height: "11%",
                                                width: "11%",
                                                borderRadius: "9px",
                                                margin: "5px",
                                            }}
                                            src={
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                            }
                                        />
                                    )}
                                </>
                            ),

                            action: (
                                <div style={{ display: "flex", flexDirection: "coloum" }}>
                                    <svg
                                        onClick={() => onEdit(item)}
                                        style={{
                                            height: "20px",
                                            width: "20px",
                                            cursor: "pointer",
                                            marginRight: "20px",
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                        />
                                    </svg>
                                    <svg
                                        onClick={() => onDelete(item?._id)}
                                        style={{
                                            color: "red",
                                            height: "20px",
                                            cursor: "pointer",
                                            width: "20px",
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-trash3"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </div>
                            ),
                        };
                    });
                    setAllMood(arr);
                }
                console.log("RESPONSE", res);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err", err);
            });
    };

    //for add data
    const AddMood = () => {
        let data = {
            name: name,
            designation: designation,
            description: description,
            image: image,
        };

        if (name && designation && description) {
            HttpClient.requestData("admin-add-people-thought", "POST", data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success(res.message);
                        fetchAllMood();
                        setImage("");
                        setName("");
                        setDescription("");
                        setDesignation("");
                        let file = document.querySelector("#image");
                        file.value = "";
                    } else {
                        toast.error(res?.msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("All fields are required");
        }
    };

    const columns = [
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    SL
                </div>
            ),
            selector: (row) => row.sl,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Name
                </div>
            ),
            selector: (row) => row.name,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Designation
                </div>
            ),
            selector: (row) => row.designation,
        },
        {
            name: (
                <div
                    style={{ fontSize: "14px", color: "#495057", fontWeight: "bolder" }}
                >
                    Image
                </div>
            ),
            selector: (row) => row.image,
        },

        {
            name: (
                <div
                    style={{
                        fontSize: "14px",
                        color: "#495057",
                        marginLeft: "15px",
                        fontWeight: "bolder",
                    }}
                >
                    Action
                </div>
            ),
            selector: (row) => row.action,
        },
    ];

    //for update data
    const UpdateMood = () => {
        console.log("ID", id);
        let data = {
            name: name,
            designation: designation,
            description: description,
            image: image,
        };
        if (name && designation && description) {
            HttpClient.requestData("admin-edit-people-thought/" + id, "PUT", data)
                .then((res) => {
                    if (res && res.status) {
                        toast.success("Updated Successfully");
                        setHide(true);
                        setName("");
                        setDescription("");
                        setDesignation("");
                        setImage("");
                        setName("");
                        fetchAllMood();
                        let file = document.querySelector("#image");
                        file.value = "";
                    } else {
                        toast.error(res?.msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("All field are required");
        }
    };
    return (
        <>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                    {/* <PageLoader /> */}
                    <div>
                        <Skeleton variant="rectangular" width={100} height={100} />
                    </div>
                </div>
            ) : (
                <div component="div" className="TabsAnimation appear-done enter-done">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            {hide ? (
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "20px",
                                        color: "#868e96",
                                        margin: "35px",
                                    }}
                                    className="card-title"
                                >
                                    Add Thought Leader
                                </div>
                            ) : (
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "20px",
                                        color: "#868e96",
                                        margin: "35px",
                                    }}
                                    className="card-title"
                                >
                                    Edit Thought Leader
                                </div>
                            )}

                            <div class="form-group">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">
                                        <h7 style={{ color: "red" }}>Name*</h7> :
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        value={name}
                                        onChange={(e) => setName(e?.target?.value)}
                                        aria-describedby="emailHelp"
                                        placeholder="Enter name"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">
                                        <h7 style={{ color: "red" }}>Designation*</h7> :
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        value={designation}
                                        onChange={(e) => setDesignation(e?.target?.value)}
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Designation name"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">
                                        <h7 style={{ color: "red" }}>Description*</h7> :
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        value={description}
                                        onChange={(e) => setDescription(e?.target?.value)}
                                        aria-describedby="emailHelp"
                                        placeholder="Enter description name"
                                    />
                                </div>


                                <label for="exampleInputEmail1">
                                    <h7 style={{ color: "red" }}>Image</h7> :
                                </label>

                                <input
                                    class="form-control"
                                    onChange={(e) => HandleImage(e)}
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                />
                                {imageLoader ? (
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

                            {hide ? (
                                <button class="btn btn-primary" onClick={AddMood}>
                                    Submit
                                </button>
                            ) : (
                                <button class="btn btn-primary" onClick={UpdateMood}>
                                    Update
                                </button>
                            )}

                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#868e96",
                                    margin: "35px",
                                }}
                                className="card-title"
                            >
                                Manage Thought Leaders
                            </div>
                            <DataTable columns={columns} data={allMood} pagination />

                            {/* <Box m="12px">
                                <Header title="MANAGE Thought Leaders" subtitle="" />

                                <div>
                                    <DataTable
                                        columns={columns}
                                        data={allMood}
                                        pagination
                                        striped
                                    />
                                </div>
                            </Box> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAndManageThoughtLeaders;

