import Dashboard from "./views/admin/AccountManage";
import Typography from "./views/admin/Typography";
import TableList from "./views/admin/Tables";
import UserPage from "./views/admin/User";
import HomAdmin from "./views/HomAdmin";
// import Login from "./views/Login";
// import Register from "./views/Register";

const routes = [
    {
        path: "/manage-account",
        name: "Account manage",
        icon: "fas fa-users",
        component: Dashboard,
        layout: "",
    },
    {
        path: "/user-page",
        name: "User Profile",
        icon: "nc-icon nc-single-02",
        component: UserPage,
        layout: "",
    },
    {
        path: "/tables",
        name: "Table List",
        icon: "nc-icon nc-tile-56",
        component: TableList,
        layout: "",
    },
    {
        path: "/typography",
        name: "Typography",
        icon: "nc-icon nc-caps-small",
        component: Typography,
        layout: "",
    },
    {
        path: "/",
        name: "Home",
        icon: "nc-icon nc-single-02",
        component: HomAdmin,
        layout: ''
    },
    {
        path: "/notfound",
        name: "Not Found",
        icon: "nc-icon nc-single-02",
        component: '',
        layout: ''
    },
    {
        path: "/login",
        name: "Not Found",
        icon: "nc-icon nc-single-02",
        component: '',
        layout: ''
    },
    {
        path: "/register",
        name: "Not Found",
        icon: "nc-icon nc-single-02",
        component: '',
        layout: ''
    },
];

// export const routesViewer = [
//     {
//         path: "login",
//         name: "Login",
//         icon: "",
//         component: Login,
//         layout: '/'
//     },
//     {
//         path: "register",
//         name: "Register",
//         icon: "",
//         component: Register,
//         layout: '/'
//     }
// ];

export default routes;
