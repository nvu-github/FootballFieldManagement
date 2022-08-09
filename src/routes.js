// admin
import Dashboard from "./views/admin/AccountManage";
import Typography from "./views/admin/Typography";
import TableList from "./views/admin/Tables";
import UserPage from "./views/admin/User";
import HomeAdmin from "./views/HomeAdmin";

// user
import HomeUser from "./views/Home";
import Datsan from "./views/User/Datsan";

export const routes = [
    // admin
    {
        path: "/manage-account",
        name: "Account manage",
        icon: "fas fa-users",
        component: Dashboard,
        permission: "1",
        auth: true
    },
    {
        path: "/user-page",
        name: "User Profile",
        icon: "nc-icon nc-single-02",
        component: UserPage,
        permission: "1",
        auth: true
    },
    {
        path: "/tables",
        name: "Table List",
        icon: "nc-icon nc-tile-56",
        component: TableList,
        permission: "1",
        auth: true
    },
    {
        path: "/typography",
        name: "Typography",
        icon: "nc-icon nc-caps-small",
        component: Typography,
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

// export const routesUser = [

//     // user
//     {
//         path: "/",
//         name: "Home",
//         icon: "nc-icon nc-single-02",
//         component: HomeUser,
//     },

//     {
//         path: "/home",
//         name: "Trang chủ",
//         icon: "nc-icon nc-single-02",
//         component: HomeUser,
//     },

//     {
//         path: "/datsan",
//         name: "Đặt sân",
//         icon: "nc-icon nc-single-02",
//         component: HomeUser,
//     },
// ];
