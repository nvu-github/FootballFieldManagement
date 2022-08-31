// admin
import AccountManage from "./views/admin/AccountManage";
import YardManage from "./views/admin/YardManage";
import TableList from "./views/admin/Tables";
import HomeAdmin from "./views/HomeAdmin";

// user
import HomeUser from "./views/Home";
import Datsan from "./views/User/Datsan";

export const routes = [
    // admin
    {
        path: "/account-management",
        name: "Quản lý tài khoản",
        icon: "fas fa-users",
        component: AccountManage,
        permission: "1",
        auth: true
    },
    {
        path: "/yard-management",
        name: "Quản lý sân bóng",
        icon: "fas fa-futbol",
        component: YardManage,
        permission: "1",
        auth: true
    },
    {
        path: "/tables",
        name: "Quản lý cửa hàng",
        icon: "fas fa-store",
        component: TableList,
        permission: "1",
        auth: true
    },
    {
        path: "/",
        name: "Home admin",
        icon: "nc-icon nc-single-02",
        component: HomeAdmin,
        permission: "1",
        auth: true
    },

    // User
    {
        path: "/home",
        name: "Trang chủ",
        icon: "nc-icon nc-single-02",
        component: HomeUser,
        permission: "",
        auth: false
    },

    {
        path: "/datsan",
        name: "Đặt sân",
        icon: "nc-icon nc-single-02",
        component: Datsan,
        permission: "2",
        auth: false
    },
    {
        path: "/",
        name: "Home",
        icon: "nc-icon nc-single-02",
        component: HomeUser,
        permission: "",
        auth: false
    },
]
