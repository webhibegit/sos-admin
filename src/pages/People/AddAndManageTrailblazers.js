// import React from 'react'

// const AddAndManageTrailblazers = () => {
//     return (
//         <div>
//             <h2>AddAndManageTrailblazers</h2>
//         </div>
//     )
// }

// export default AddAndManageTrailblazers


import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import HttpClient from "../../utils/HttpClient";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const AddAndManageTrailblazers = () => {
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


    //for edit data
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


    //for delete data
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
                HttpClient.requestData("admin-del-people-trailblazer/" + id, "DELETE")
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


    //for upload image
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

    //for fetch all data
    const fetchAllMood = async () => {
        setLoading(true);
        await HttpClient.requestData('admin-view-people-trailblazer', "GET", {})
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
            HttpClient.requestData("admin-add-people-trailblazer", "POST", data)
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
                        toast.error(res?.message);
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
            HttpClient.requestData("admin-edit-people-trailblazer/" + params.id, "PUT", data)
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
                        toast.error(res?.message);
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
                                    Add Trailblazer
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
                                    Edit Trailblazer
                                </div>
                            )}

                            {/* <div class="form-group"> */}
                            <form>
                                <div className="row">
                                    <div class="col">

                                        <label for="exampleInputEmail1">
                                            <h7 style={{ color: "red" }}>Name*</h7> :
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            value={name}
                                            onChange={(e) => setName(e?.target?.value)}
                                            aria-describedby="emailHelp"
                                            placeholder="Enter name"
                                        />
                                    </div>
                                    <div class="col">
                                        <label for="exampleInputEmail1">
                                            <h7 style={{ color: "red" }}>Designation*</h7> :
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            value={designation}
                                            onChange={(e) => setDesignation(e?.target?.value)}
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Designation name"
                                        />
                                    </div>
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
                                {/* </div> */}
                            </form>

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
                                Manage Trailblazer
                            </div>
                            <DataTable columns={columns} data={allMood} pagination />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddAndManageTrailblazers;


