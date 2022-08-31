import {useState, useEffect, useRef} from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import {useHistory} from "react-router-dom";
import IconNotification from "./IconNotification";
import "../../../assets/admin/element/IconNotification.scss"
import socketIOClient from "socket.io-client";
import SystemService from "../../../service/SystemService";

const UrlServerSocket = process.env.REACT_APP_SOCKET_URL;  

const Notification = () => {
    let io = socketIOClient.connect(UrlServerSocket)
    const [dropdownNotifyOpen, setDropdownNotifyOpen] = useState(false);
    const [notification, setNotification] = useState([]);
    const refID = useRef();
    const history = useHistory();

    useEffect(() => {
        io.on('sendDataNotify', dataRes => {
            if (dataRes) {
                setNotification([dataRes.resSave, ...notification]);
            }
        });

        return () => {
            io.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[notification]);

    useEffect(() => {
        io.on("sendDataServer", dataRes => {
            if (dataRes) {
                setNotification([...dataRes["dataNotification"], ...notification]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dropdownToggleNotify = (e) => {
        setDropdownNotifyOpen(!dropdownNotifyOpen);
    };

    const seenNotification = async (e) => {
        const id = refID.current.props.id;
        console.log(e);
        return;
        const ResChange = await SystemService.handleChangeStatusNotification(id);
        console.log(ResChange);
        if (ResChange.data.Res === 'Success') {

        }
        // history.push("/yard-management");
    }

    return (
        <Dropdown
        className="DropdownIconNotify"
        nav
        isOpen={dropdownNotifyOpen}
        toggle={(e) => dropdownToggleNotify(e)}
        >
            <DropdownToggle className="DropdownIconNotify__toggle" style={{ height: "20px" }} caret nav>
                <IconNotification number={notification.length} />
            </DropdownToggle>
            <DropdownMenu className="DropdownIconNotify__menu" right>
                {notification.length > 0 
                ? (
                    notification.map((res, index) => {
                        let classname = "";
                        if (res["Status"] === "chuaxem") {
                            classname="no-seen";
                        }
                        return (
                            <DropdownItem ref={refID} id={res["_id"]} onClick={(e) => {seenNotification(e)}} className={`item-notification ${classname}`} key={index} tag="a"> 
                                <div className="item-notification--left">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="item-notification--right">
                                    <div className="item-notification--right--user">{res["nameUser"]}</div> 
                                    <div className="item-notification--right--content">Yêu cầu đặt sân</div> 
                                </div>
                            </DropdownItem>
                        )
                    })
                )
                :(
                    <DropdownItem className="item-notification" tag="a"> 
                        Không có thông báo
                    </DropdownItem>
                )
                }
                {/* <DropdownItem className="item-notification" tag="a"> 
                    <div className="item-notification--left">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="item-notification--right">
                        <div className="item-notification--right--user">User1</div> 
                        <div className="item-notification--right--content">Notification 1</div> 
                    </div>
                </DropdownItem>
                <DropdownItem className="item-notification" tag="a"> 
                    <div className="item-notification--left">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="item-notification--right">
                        <div className="item-notification--right--user">User2</div> 
                        <div className="item-notification--right--content">Notification 2</div> 
                    </div>
                </DropdownItem>
                <DropdownItem className="item-notification" tag="a"> 
                    <div className="item-notification--left">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="item-notification--right">
                        <div className="item-notification--right--user">User3</div> 
                        <div className="item-notification--right--content">Notification 3</div> 
                    </div>
                </DropdownItem>
                <DropdownItem className="item-notification" tag="a"> 
                    <div className="item-notification--left">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="item-notification--right">
                        <div className="item-notification--right--user">User4</div> 
                        <div className="item-notification--right--content">Notification 4</div> 
                    </div>
                </DropdownItem> */}
            </DropdownMenu>
    </Dropdown>
    );
}

export default Notification;