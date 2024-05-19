import React from "react";
import { Button, Space, Avatar, Menu } from "antd";
import "./Navbar.css";
import { UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import AuthModal from "../Pages/Todo/Modals/AuthModal";

const { Header } = Layout;
const names = ["Популярное", "Избранное", "Подписки"]
const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `${names[index]}`,
}));
const NavBar = ({ setIsLoggedIn, isLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <Header className="header">
      <p className="name">FitXPlo</p>
      {isLoggedIn ? (
           
              <Space wrap className="auth-button">
                  <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['1']}
                      items={items}
                      style={{
                          flex: 1,
                          minWidth: 0,
                      }}
                  />
          <Avatar icon={<UserOutlined />}></Avatar>
          <p
            style={{
              color: "white",
              fontSize: "20px",
              marginTop: "15px",
              marginRight: "5px",
            }}
          >
            {localStorage.getItem("user")}
          </p>
          <Button onClick={handleLogout} type="primary" danger>
            Выход
          </Button>
        </Space>
      ) : (
        <AuthModal setIsLoggedIn={setIsLoggedIn}></AuthModal>
      )}
    </Header>
  );
};

export default NavBar;
