import React from "react";

const LoadingTable = ({ colSpan }) => {
    return (
        <>
            <tr>
                <td colSpan={colSpan} className="text-center">
                    <i className="fas fa-spinner fa-spin"></i> <span>Đang tải dữ liệu...</span>
                </td>
            </tr>
        </>
    )
}

export default LoadingTable;