const http = require("http");
const socketModule = require("socket.io");
const portSocket = process.env.PORT_SERVER_SOCKET;
const ModelNotification = require("../app/models/hethong/notification.models");

module.exports.config = function name(app) {
    
    const server = http.createServer(app);

    const socketIo = socketModule(server, {
        cors: {
            origin: process.env.REACT_ENV_CLIENT,
        }
    });

    socketIo.on("connection", async (socket) => {
        // console.log("New client connected" + socket.id);

        socket.on("sendDataClient", async (dataBody) => {
            const { data } = dataBody;
            const dataSave = {
                nameUser: data["nameUser"],
                Time: new Date(),
                Status: "chuaxem",
                Id: data["id"]
            }

            const resSave = await ModelNotification.create(dataSave);
            socketIo.emit("sendDataNotify", { resSave });
        })

        const dataNotification = await ModelNotification.find({}).sort({ 'Status' : 1});
        socketIo.emit("sendDataServer", {dataNotification: dataNotification});

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });

    });

    server.listen(portSocket, () => {
        console.log('Server socket running ' + portSocket);
    });

}