import {useState} from "react";
import ChatContainer from "./ChatContainer";
import "../../assets/style/ChatComponent.scss";
const IconChat = () => {

    const [showChat, setShowChat] = useState(false);

    const toggleShowChat = () => {
        setShowChat(!showChat);
    }

    return (
        <div onClick={toggleShowChat} className="support-ticket-laucher">
            <i className={!showChat ? "fas fa-comment-dots" : "fas fa-times"}></i>

            {showChat && <ChatContainer />}
        </div>
    );
}

export default IconChat;