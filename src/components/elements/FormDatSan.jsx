import React, { useEffect, useState, useRef } from "react";
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Col,
    Row,
} from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import toastConfig from "../../config/toastConfig";
import * as actions from "../../store/actions";
import DatsanService from "../../service/DatsanService";
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'froala-editor/js/plugins.pkgd.min.js';

const UrlServerSocket = process.env.REACT_APP_SOCKET_URL;

const FormDatSan = (props) => {

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient.connect(UrlServerSocket);

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const [dataIns, setDataIns] = useState({
        nameTeam: "",
        Field: "",
        Time: "",
        Note: "",
    });

    const optionsField = [
        { value: 'san1', label: 'Sân bóng số 1', key: 'Field' },
        { value: 'san2', label: 'Sân bóng số 2', key: 'Field' },
        { value: 'san3', label: 'Sân bóng số 3', key: 'Field' },
        { value: 'san4', label: 'Sân bóng số 4', key: 'Field' },
    ]

    const optionsTimes = [
        { value: 'khung1', label: '5h-6h30p', key: 'Time' },
        { value: 'khung2', label: '6h30p-8h', key: 'Time' },
        { value: 'khung3', label: '8h-9h30p', key: 'Time' },
        { value: 'khung4', label: '9h30p-11h', key: 'Time' },
    ]

    const sendNotification = (data) => {
        if (data) {
            socketRef.current.emit('sendDataClient', {data});
        }
    }

    const handleOnsubmit = async (e) => {
        e.preventDefault();
        try {
            props.showLoad();
            if (dataIns['nameTeam'] === "" || dataIns['nameTeam'] === "Field" || dataIns['nameTeam'] === "Time") {
                props.hideLoad();
                toastConfig("Error", "Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            const datsan = await DatsanService.handleDatsan(dataIns);
            if (datsan.data.MessRes === 'Success') {
                const dataNotify = {
                    type: "reqNotify",
                    id: datsan.data.dataIns.Id_user,
                    nameUser: props.dataLogin.username
                }
                sendNotification(dataNotify);
                toastConfig('Success', 'Yêu cầu đặt sân thành công');
            } else {
                toastConfig('Error', 'Có lỗi xảy ra vui lòng thử lại!');
            }
            props.hideLoad();

        } catch (e) {
            console.log(e);
            props.hideLoad();
        }
    }

    const handleOnchangeInput = (e) => {
        let dataInsert = dataIns;
        dataInsert[e.target.name] = e.target.value;
        setDataIns({...dataIns});
    }

    const handleOnchangeFroala = (e) => {
        let dataInsert = dataIns;
        dataInsert["Note"] = e;
        setDataIns({...dataIns});
    }

    const handleOnchangeSelect = (e) => {
        let dataInsert = dataIns;
        dataInsert[e.key] = e.value;
        setDataIns({...dataIns});
    }

    // handleModelChange (model) {
    //     this.setState({
    //       content: model
    //     });
    // }

    return (
        <>
        <Form onSubmit={handleOnsubmit}>
            <FormGroup row>
                <Label for="exampleEmail" sm={4}>Tên đội(<span className="text-danger">*</span>)</Label>
                <Col sm={8}>
                    <Input type="text" name="nameTeam" onChange={handleOnchangeInput} id="exampleEmail" placeholder="" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleEmail" sm={4}>Chọn sân bóng(<span className="text-danger">*</span>)</Label>
                <Col sm={8}>
                    <Select options={optionsField} onChange={handleOnchangeSelect} name="Field" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleEmail" sm={4}>Chọn khung giờ(<span className="text-danger">*</span>)</Label>
                <Col sm={8}>
                    <Select options={optionsTimes} onChange={handleOnchangeSelect} name="Time"/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSelectMulti" sm={4}>Ghi chú</Label>
                <Col sm={8}>
                    {/* <Input type="textarea" onChange={handleOnchangeInput} name="Note" id="exampleSelectMulti" multiple /> */}
                    <FroalaEditor
                        // model={this.state.content}
                        onModelChange={handleOnchangeFroala}
                        config={{
                            charCounterCount: false,
                            placeholderText: 'Edit Your Content Here!',
                            imageUpload: true,
                            imageDefaultAlign: 'left',
                            imageManagerLoadURL: process.env.REACT_APP_BACKEND_URL + '/api/getfile',
                            imageDefaultDisplay: 'inline-block',
                            // Set max image size to 5MB.
                            imageMaxSize: 5 * 1024 * 1024,
                            // Allow to upload PNG and JPG.
                            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                            events: {
                            'filesManager.beforeUpload': function(files) {
                                // Before image is uploaded
                                // console.log(files);

                                var editor = this;
                                if (files.length) {
                                    // Create a File Reader.
                                    var reader = new FileReader();
                                    // Set the reader to insert images when they are loaded.
                                    reader.onload = function(e) {
                                    var result = e.target.result;
                                    // console.log(editor.image.display);
                                    editor.image.insert(result, null, null, editor.image.get());
                                    };
                                    // Read image as base64.
                                    reader.readAsDataURL(files[0]);
                                }
                                editor.popups.hideAll();
                                // const data = new FormData();
                                // data.append('image', images[0]);
                                // console.log(this.image)
                                // axios.post('your_imgur_api_url', data, {
                                //     headers: {
                                //         'accept': 'application/json',
                                //         'Authorization': 'your_imgur_client_id/api_key',
                                //         'Accept-Language': 'en-US,en;q=0.8',
                                //         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                                //     }
                                // }).then(res => {
                                //     editor.image.insert(res.data.data.link, null, null, editor.image.get());
                                // }).catch(err => {
                                // console.log(err);
                                // });
                                return false;
                            },
                            'image.beforeUpload' : function (files) {
                                let editor = this;
                                if (files.length) {
                                    // Create a File Reader.
                                    var reader = new FileReader();
                                    // Set the reader to insert images when they are loaded.
                                    reader.onload = function(e) {
                                    var result = e.target.result;
                                    // console.log(editor.image.display);
                                    editor.image.insert(result, null, null, editor.image.get());
                                    };
                                    // Read image as base64.
                                    reader.readAsDataURL(files[0]);
                                }
                                editor.popups.hideAll();
                                return false;
                            },
                            'image.loaded' : function (data) {
                                // Làm gì đó ở đây. 
                                // đây là phiên bản trình soạn thảo. 
                                console.log(2);
                                console.log(this);
                                }
                            }
                        }}
                    />
                </Col>
            </FormGroup>
            <Row>
                <Col className="text-center" md="12">
                    <Button type="submit" color="primary">Đặt sân</Button>
                </Col>
            </Row>
        </Form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        dataLogin: state.userLogin.userInfo
    };
}

const mapDispatchToProps = dispatch => {
    return {
        showLoad: () => dispatch(actions.showLoader()),
        hideLoad: () => dispatch(actions.hideLoader()),
        showModal: () => dispatch(actions.showModal()),
        hideModal: () => dispatch(actions.hideModal()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDatSan);