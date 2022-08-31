import {useEffect, useState} from "react"
import { Table, Badge } from "reactstrap";
import DatsanService from "../../../../service/DatsanService";

const Tab1 = () => {
    const [dataDatsan, setDataDatsan] = useState([]);

    useEffect(() => {
        let ignore = false;
        const getList = async () => {
            const data = await DatsanService.handleGetList();
            if ( !ignore && data) {
                setDataDatsan(data.data.dataDatsan);
            }
        }
        getList();
        return () => ignore = true;
    },[]);

    const dataSan = {
        san1: "Sân bóng số 1",
        san2: "Sân bóng số 2",
        san3: "Sân bóng số 3",
        san4: "Sân bóng số 4",
    }

    const dataTime = {
        khung1: "5h-6h30p",
        khung2: "6h30p-8h",
        khung3: "8h-9h30p",
        khung4: "9h30p-11h",
    }

    const dataStatus = {
        choduyet: {
            color: 'danger',
            text: 'Chờ duyệt'
        },
        daduyet: {
            color: 'success',
            text: 'Đã duyệt'
        }
    }

    return (
        <Table className="table-data" responsive>
            <thead>
                <tr className="text-center"> 
                    <th width="1%">STT</th>
                    <th width="15%">Tên sân</th>
                    <th width="10%">Thời gian</th>
                    <th width="10%">Giá tiền</th>
                    <th width="5%">Trạng thái</th>
                    <th width="10%">Tác vụ</th>
                </tr>
            </thead>
            <tbody>
                {dataDatsan.length > 0 
                ? (
                    dataDatsan.map((val, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{dataSan[val["Field"]]}</td>
                                <td>{dataTime[val["Time"]]}</td>
                                <td>200k</td>
                                <td className="text-center"><Badge color={dataStatus[val["Status"]]["color"]}>{dataStatus[val["Status"]]["text"]}</Badge></td>
                                <td className="text-center">
                                    <button className="btn btn-success btn-update mr-2"><i  className="fas fa-edit"></i></button>
                                    <button className="btn btn-primary btn-accept mr-2"><i className="far fa-check-square"></i></button>
                                    <button className="btn btn-danger btn-delete"><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })
                )
                : (
                    <tr>
                        <td colSpan={6}>Không có dữ liệu</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default Tab1;