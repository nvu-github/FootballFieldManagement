import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { 
    Breadcrumb, 
    BreadcrumbItem,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle
} from "reactstrap";
import FormDatSan from "../../components/elements/FormDatSan";

const Datsan = () => {
    useEffect(() => {
        document.title = "Đặt sân";
    });

    return (
        <>
            <Row>
                <Breadcrumb>
                    <BreadcrumbItem><Link to={"/"}>Trang chủ</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Đặt sân</BreadcrumbItem>
                </Breadcrumb>

                <Col md="12">
                <Card className="card-right">
                    <CardHeader className="card-right__header">
                        <CardTitle tag="h4">Đặt sân</CardTitle>
                    </CardHeader>
                    <CardBody className="card-right__body">
                        <FormDatSan />
                    </CardBody>
                </Card>
                </Col>
            </Row>
            
        </>
    );
}

export default Datsan;