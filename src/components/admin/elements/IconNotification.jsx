import React from "react";
import "../../../assets/admin/element/IconNotification.scss";

const IconNotification = ({ number }) => {
    return (
        <>
            <main rel="main">
                <div className="notification">
                    <svg viewBox="-10 0 35 35">
                    <path className="notification--bell" d="M14 12v1H0v-1l0.73-0.58c0.77-0.77 0.81-3.55 1.19-4.42 0.77-3.77 4.08-5 4.08-5 0-0.55 0.45-1 1-1s1 0.45 1 1c0 0 3.39 1.23 4.16 5 0.38 1.88 0.42 3.66 1.19 4.42l0.66 0.58z"></path> 
                    <path className="notification--bellClapper" d="M7 15.7c1.11 0 2-0.89 2-2H5c0 1.11 0.89 2 2 2z"></path>
                    </svg>
                    <div className="notification--num">{ number }</div>
                    <div className="notification--text">
                        notification
                    </div>
                </div>
            </main>
        </>
    )
}

export default IconNotification;