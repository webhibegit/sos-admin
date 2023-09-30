import React from 'react'

const ImageInDataTable = (props) => {
    const { src } = props;

    return (
        <div>
            < img
                src={src}
                className="img-fluid m-1"
                alt="Responsive image"
                style={{ height: "5rem", width: "5rem" }}
            />,
        </div>
    )
}

export default ImageInDataTable
