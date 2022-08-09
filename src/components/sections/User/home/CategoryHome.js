import React from "react";
import { Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    CardHeader
} from 'reactstrap';

const CategoryHome = () => {

    return(
        <>
            <Card className="card-right">
                <CardHeader className="card-right__header">
                    <CardTitle tag="h4">List Account</CardTitle>
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

export default CategoryHome;