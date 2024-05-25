import React from "react";
import { Button, Space, Avatar, Menu, MenuItem } from "antd";
import "./Navbar.css";
import { UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import AuthModal from "../Pages/Todo/Modals/AuthModal";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    window.location.href = "/"
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
                      
                      style={{
                          flex: 1,
                          minWidth: 0,
                      }}
                  >
                      
                      <ul>
                          <li>

                          </li>
                          <li>
                              <Link to="/">Популярное</Link>
                          </li>
                          <li>

                          </li>
                      </ul>
                              <ul>
                                  <li>
                                      
                                  </li>
                                  <li>
                                      <Link to="/favorites">Избранное</Link>
                                  </li>
                                  <li>
                                      
                                  </li>
                      </ul>
                      <ul>
                          <li>

                          </li>
                          <li>
                              <Link to="/subscriptions">Подписки</Link>
                          </li>
                          <li>

                          </li>
                      </ul>
                      
                          
                     
                  </Menu>
                  
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
                      <Link to="/">Выйти</Link>
          </Button>
        </Space>
      ) : (
        <AuthModal setIsLoggedIn={setIsLoggedIn}></AuthModal>
      )}
    </Header>
  );
};

export default NavBar;
