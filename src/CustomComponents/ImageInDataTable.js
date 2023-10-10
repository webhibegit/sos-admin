import React from 'react'

const ImageInDataTable = (props) => {
    const { src } = props;
console.log(src,'srrrrrcccc')
    return (
        <div>
            {
                src ? (
                    <>
                        < img
                            src={src}
                            className="img-fluid m-1"
                            alt="img"
                            style={{ height: "5rem", width: "5rem" }}
                        />
                    </>
                ) : (
                    <>
                        
                            <img
                                style={{ height: "5rem", width: "5rem" }}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" />
                    </>
                )
            }
            {/* < img
                src={src}
                className="img-fluid m-1"
                alt="Responsive image"
                style={{ height: "5rem", width: "5rem" }}
            /> */}
        </div>
    )
}

export default ImageInDataTable
