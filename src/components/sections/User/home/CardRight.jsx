import React from "react";

import { Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    CardHeader
} from 'reactstrap';
import '../../../../assets/style/User/CardRight.scss';

const CardRight = () => {
    return (
        <>
            <Card className="card-right">
                <CardHeader className="card-right__header-right">
                    <CardTitle tag="h4">Danh sách đặt sân hôm nay</CardTitle>
                </CardHeader>
                <CardBody className="card-right__body">
                    <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                    Card subtitle
                    </CardSubtitle>
                    <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CardText>
                </CardBody>
            </Card>
        </>
    );
}

export default CardRight;