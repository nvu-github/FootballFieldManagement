import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const UrlServerSocket = process.env.REACT_APP_SOCKET_URL; 
const ChatContainer = () => {

    const contentMess = useRef('');
    const [mess, setMess] = useState([]);
    const [id, setId] = useState();

    let io = socketIOClient.connect(UrlServerSocket)

    useEffect(() => {
        io.on('getId', data => {
            setId(data);
        })

        return () => {
            io.disconnect();
        }
    }, []);

    const submitChat = (e) => {
        e.preventDefault();
        const valMsg = contentMess.current.value;

        if (valMsg !== null) {
            const msg = {
                contentChat: valMsg,
                id: id
            }
        }
    }

    return (
        <div className="support-ticket-root">
            <div className="support-ticket-panel">
                <div className="support-ticket-panel-header">
                    Liên hệ với chúng tôi
                </div>
                <main className="msger-chat">
                    <div className="msg left-msg">
                        <div
                        className="msg-img"
                        style={{backgroundImage: "url(https://assets.codepen.io/3/kiwi.svg)"}}
                        ></div>

                        <div className="msg-bubble">
                            <div className="msg-info">
                            <div className="msg-info-name">BOT</div>
                            <div className="msg-info-time">12:45</div>
                            </div>

                            <div className="msg-text">
                            Hi, welcome to SimpleChat! Go ahead and send me a message.
                            </div>
                        </div>
                    </div>

                    <div className="msg right-msg">
                        <div
                        className="msg-img"
                        style={{backgroundImage: "url(http://formatjs.io/img/react.svg)"}}
                        ></div>

                        <div className="msg-bubble">
                            <div className="msg-info">
                            <div className="msg-info-name">Sajad</div>
                            <div className="msg-info-time">12:46</div>
                            </div>

                            <div className="msg-text">
                            You can change your name in JS section!
                            </div>
                        </div>
                    </div>

                    <div className="msg left-msg">
                        <div
                        className="msg-img"
                        style={{backgroundImage: "url(https://assets.codepen.io/3/kiwi.svg)"}}
                        ></div>

                        <div className="msg-bubble">
                            <div className="msg-info">
                            <div className="msg-info-name">BOT</div>
                            <div className="msg-info-time">12:45</div>
                            </div>

                            <div className="msg-text">
                            Hi, welcome to SimpleChat! Go ahead and send me a message.
                            </div>
                        </div>
                    </div>

                    <div className="msg right-msg">
                        <div
                        className="msg-img"
                        style={{backgroundImage: "url(http://formatjs.io/img/react.svg)"}}
                        ></div>

                        <div className="msg-bubble">
                            <div className="msg-info">
                            <div className="msg-info-name">Sajad</div>
                            <div className="msg-info-time">12:46</div>
                            </div>

                            <div className="msg-text">
                            You can change your name in JS section!
                            </div>
                        </div>
                    </div>
                </main>
                <form className="msger-inputarea">
                    <textarea ref={contentMess} type="text" className="msger-input" placeholder="Enter your message..."></textarea>
                    <button type="submit" onClick={submitChat} className="msger-send-btn">Gửi</button>
                </form>
            </div>
        </div>
    )
}

export default ChatContainer;