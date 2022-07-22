import Dashboard from "./views/admin/AccountManage";
import Typography from "./views/admin/Typography";
import TableList from "./views/admin/Tables";
import UserPage from "./views/admin/User";
// import Home from "./views/Home";
import HomAdmin from "./views/HomAdmin";
import Login from "./views/Login";

const routes = [
    {
        path: "/account",
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
];

export const routesViewer = [
    {
        path: "login",
        name: "Login",
        icon: "",
        component: Login,
        layout: '/'
    }
];

export default routes;
