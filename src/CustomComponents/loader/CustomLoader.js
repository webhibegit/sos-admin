import React from 'react';
import './customLoader.css'
import { Oval } from 'react-loader-spinner';

const CustomLoader = ({ loading }) => {
    return (
        loading &&
        <div>
            <div id="loader-myModal" className="loader-modal">
                <div className="loader-modal-content">
                    <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div>

            </div>
        </div>
    )
}

export default CustomLoader
