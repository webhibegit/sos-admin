import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


const EditDeleteIcon = ({ onClickEdit, onClickDelete }) => {
    return (
        <div className='d-flex justify-content-between'>
            <div
                style={{ fontSize: "1.5rem", color: "#545423", cursor: "pointer" }}
                onClick={onClickEdit}
            >
                <FaEdit />
            </div>

            <div
                style={{ fontSize: "1.6rem", color: "#af0606", cursor: "pointer" }}
                onClick={onClickDelete}
            >
                <MdDelete />
            </div>
        </div>
    )
}

export default EditDeleteIcon
