import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { PoweroffOutlined, BarChartOutlined, AppstoreOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useAppDispatch } from "redux/hooks";
import { logOut } from "redux/auth";

const NAV_ITEMS = [
    { name: "Dashboard", link: "/dashboard", icon: <AppstoreOutlined style={{ fontSize: "20px" }} /> },
    { name: "Inventory", link: "/inventory", icon: <BarChartOutlined style={{ fontSize: "20px" }} /> },
    { name: "Users", link: "/users", icon: <UserOutlined style={{ fontSize: "20px" }} /> },
    { name: "Account Settings", link: "/account-settings", icon: <SettingOutlined style={{ fontSize: "20px" }} /> },
];

const Sidenav = ({ color }) => {
    const { pathname } = useLocation();
    const page = pathname.replace("/", "");

    const dispatch = useAppDispatch();

    return (
        <>
            <div className="brand">
                <span>PHARMACEE</span>
            </div>
            <hr />
            <Menu theme="light" mode="inline">
                {NAV_ITEMS.map((item, i) => (
                    <Menu.Item key={i}>
                        <NavLink to={item.link}>
                            <span
                                className="icon"
                                style={{
                                    background: page === item.name.toLowerCase() ? color : "",
                                }}
                            >
                                {item.icon}
                            </span>
                            <span className="label">{item.name}</span>
                        </NavLink>
                    </Menu.Item>
                ))}
            </Menu>
            <div style={{ position: "absolute", bottom: "10px", left: "30px" }}>
                <Popconfirm
                    placement="topLeft"
                    title={"Are you sure you want to logout ?"}
                    onConfirm={() => dispatch(logOut())}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<PoweroffOutlined />} children="Logout" />
                </Popconfirm>
            </div>
        </>
    );
};

export default Sidenav;
