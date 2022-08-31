import { connect } from "react-redux";
import React, {useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Select from 'react-select';
import ManageAccountService from '../../service/admin/ManageAccountService';
import toastConfig from "../../config/toastConfig";
import * as actions from "../../store/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)


class AccountManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            permission: '',
            refreshkey: 0, 
            valueBtnModal: '',
            textBtnModal: 'Save',
        }
    }

    componentDidMount() {
        document.title = 'Account Manage';
    }

    toggle = () => {
        this.setState({
            username: '',
            password: '',
            permission: (this.state.permission !== '') ? this.state.permission : '2',
            valueBtnModal: '',
            textBtnModal: 'Save'
        });
        if (this.props.statusModal === true) {
            this.props.hideModal();
        } else {
            this.props.showModal();
        }
    };

    AddAccount = async (e) => {
        try {
            this.props.showLoad();
            const id            = e.target.getAttribute("value");
            const username      = this.state.username;
            const password      = this.state.password;
            const permission    = this.state.permission;

            if (username === "" || password === "" || permission === "") {
                toastConfig("Error", "Vui lòng nhập đầy đủ các thông tin");
                this.props.hideLoad();
                return;
            }

            if (id === '') {
                const dataAdd = await ManageAccountService.handleAddAccount(username, password, permission);
                if (dataAdd.data.Mess === 'Exists') {
                    toastConfig("Error", "Tên đăng nhập đã tồn tại!");
                    this.props.hideLoad();
                    return;
                } else if (dataAdd.data.Mess === 'Success') {
                    toastConfig("Success", "Thêm tài khoản đăng nhập thành công");
                    this.props.hideLoad();
                    this.setState({
                        refreshkey: this.state.refreshkey + 1
                    });
                    this.toggle();
                    return;
                } else {
                    toastConfig("Error", "Thêm tài khoản đăng nhập thất bại");
                    this.props.hideLoad();
                    this.toggle();
                    return;

                }
            } else {
                const dataSendUpdate = {
                    id,
                    username, 
                    password,
                    permission
                }
                const dataUpdate = await ManageAccountService.handleUpdateAccount(dataSendUpdate);
                if (dataUpdate['data']['Mess'] === 'Success') {
                    this.props.hideLoad();
                    toastConfig('Success', 'Cập nhật tài khoản thành công')
                    this.setState({
                        refreshkey: this.state.refreshkey + 1
                    });
                    this.toggle();
                    return;
                } else {
                    this.props.hideLoad();
                    toastConfig('Fail', 'Cập nhật tài khoản thất bại!');
                    return;
                }
            }
        } catch (er) {
            console.log(er);
        }
    }

    handleDelete = (e) => {
        const id = e.target.getAttribute("value");
        MySwal.fire({
            title: 'Bạn có chắc chắn muốn xóa?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            if (result.isConfirmed) {
                this.handleConfirmDelete(id)
            }
          })
    }

    handleConfirmDelete = async (id) => {
        this.props.showLoad();
        const rowdel = await ManageAccountService.handleDeleteAccount(id);
        if (rowdel['data']['Mess'] === 'Success') {
            this.setState({
                refreshkey: this.state.refreshkey + 1
            });
            toastConfig('Success', 'Xóa tài khoản thành công');
        } else {
            toastConfig('Error', 'Xóa tài khoản thất bại');
        }
        this.props.hideLoad();
    }

    handleGetUpdate = async (e) => {
        const id = e.target.getAttribute("value");
        const rowUp = await ManageAccountService.handleGetAccountUpdate(id);
        if (rowUp['data']['Mess'] === 'Success') {
            this.toggle();
            this.setState({
                username: rowUp['data']['data']['username'],
                permission: rowUp['data']['data']['permission'],
                textBtnModal: 'Update',
                valueBtnModal: id
            });
        } else {
            console.log('Error', 'Get data fail!');
        }
    }

    handleOnchangeInput = (e) => {
        let dataIns = this.state;
        dataIns[e.target.name] = e.target.value;
        this.setState({...dataIns});
    }

    handleOnchangeSelect = (e) => {
        let dataIns = this.state;
        dataIns['permission'] = e.value;

        this.setState({...dataIns});
    }

    render() {
        return (
            <>
                <Row>
                    <Col md="12">
                        <Col className="text-right" md="12">
                            <button className="btn btn-primary" onClick={this.toggle}>Add account</button>
                        </Col>
                        <TableAccount 
                        handleupdate={(e) => {this.handleGetUpdate(e, "value")}} 
                        handledelete={(e) => {this.handleDelete(e, "value")}} 
                        props={this.props} 
                        state={this.state} 
                        />
                    </Col>
                </Row>
            <ModalAccount
            state={this.state} 
            statusmodal={this.props.statusModal} 
            toggle={this.toggle} 
            onchangeinput={(e) => {this.handleOnchangeInput(e)}} 
            onchangeselect={(e) => {this.handleOnchangeSelect(e)}} 
            submitform={(e) => {this.AddAccount(e)}}
            />
            </>
        );
    }

}

const options = [
    { value: '1', label: 'Quản trị' },
    { value: '2', label: 'Người dùng' },
]

const ModalAccount = (props) => {
    const valueSelect = (props.state.permission !== '') ? props.state.permission : '2' ;
    const labelSelect = (props.state.permission === '1') ? 'Admin' : 'User';
    const optionselected = [
        { value: valueSelect, label: labelSelect},
    ]
    return (
        <>
            <form method='post' action=''>
                <Modal isOpen={props.statusmodal} toggle={props.toggle} className="">
                <ModalHeader toggle={props.toggle}>Add account</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <div className="form-group row">
                                <label className="col-md-4">
                                    Tên đăng nhập:
                                </label>
                                <div className="col-md-8">
                                    <input name="username" onChange={props.onchangeinput} value={props.state.username} type="text" id="username" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-4">
                                    Mật khẩu:
                                </label>
                                <div className="col-md-8">
                                    <input name="password" onChange={props.onchangeinput} value={props.state.password} type="password" id="password" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-4">
                                    Quyền:
                                </label>
                                <div className="col-md-8">
                                    <Select options={options} value={optionselected} onChange={props.onchangeselect} name="permission" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="btnSave" value={props.state.valueBtnModal} onClick={props.submitform}>{props.state.textBtnModal}</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </form>
        </>
    )
}

const TableAccount = (props) => {
    const [dataSites, setDataSites] = useState(null);
    
    useEffect(() => {
        let ignore = false;
        props.props.showLoad();
        async function fetchData() {
            const datafunction = await ManageAccountService.handleGetAccount();
            if (!ignore && datafunction) {
                props.props.hideLoad();
                setDataSites(datafunction['data']['dataAccount']);
            }
        }
        fetchData();
        return () => {ignore = true};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.state.refreshkey]);

    return (
        <>
            <Table className="table-data" responsive>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên đăng nhập</th>
                        <th>Quyền</th>
                        <th>Thời gian đăng nhập</th>
                        <th className="text-center">Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    { dataSites &&
                        dataSites.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value['username']}</td>
                                    <td>{value['permission'] === "1" ? "Admin" : "User" }</td>
                                    <td>{value['timelogin']}</td>
                                    <td className="text-center">
                                        <button className="btn btn-success btn-update mr-2" value={value["_id"]} onClick={props.handleupdate}><i value={value["_id"]} className="fas fa-edit"></i></button>
                                        <button className="btn btn-danger btn-delete" onClick={props.handledelete} value={value["_id"]}><i value={value["_id"]} className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

const mapStateToProps = state => {
    return {
        statusModal: state.app.statusmodal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showLoad: () => dispatch(actions.showLoader()),
        hideLoad: () => dispatch(actions.hideLoader()),
        showModal: () => dispatch(actions.showModal()),
        hideModal: () => dispatch(actions.hideModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManage);
