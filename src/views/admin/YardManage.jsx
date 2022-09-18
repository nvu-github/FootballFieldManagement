import React, {useState} from "react";
import { 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    Row, 
    Col, 
} from "reactstrap";
import classnames from "classnames";
import FormDatSan from "../../components/elements/FormDatSan";
import Tab1 from "../../components/admin/elements/YardManage/Tab1";

const YardManage = () => {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    return (
        <div className="tabs-container">
            <Nav tabs>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}>
                    Thông tin đặt sân
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                    >
                    Quản lý khung giờ
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => { toggle('3'); }}
                    >
                    Đặt sân
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <Tab1 />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col md="12">
                            Quản lý khung giờ
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col md="12">
                            <FormDatSan />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}   

export default YardManage;