import React, { useState, useEffect } from "react";
import "moment/locale/ru";
import { Layout, Empty, Spin, Menu, theme} from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import "../Todo/static/css/Todo.css";
import NavBar from "../../NavBar/Navbar";
import AddPublicationModal from "./Modals/AddPublicationModal";
import "moment/locale/ru";
import "../Todo/static/css/Todo.css";
import { getPublications } from "./FetchData/GetPublications";
import PublicationItem from "./PublicationItem";

const { Content, Header, Sider } = Layout;
const names = ["Популярное", "Избранное", "Подписки"]
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `${names[index]}`

    };
});
const Todo = () => {
  const [allPublication, setPublication] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
  const [spinning, setSpinning] = React.useState(false);
    
  const url = `/api/publications`;

  const getPublicationsAll = async () => {
    setSpinning(true);
    const posts = await getPublications();
    setPublication(posts);
    setSpinning(false);
    return posts;
  };
  const addPublication = async () => {
    const namePublication = document.querySelector("#name").value;
    const descriptionPublication = document.querySelector("#description").value;
    const termPublication = document.querySelector("#term").value;
    const priorityPublication = document.querySelector("#priority").value;

    const newPublication = {
      userid: localStorage.getItem("userid"),
      name: namePublication,
      description: descriptionPublication,
      term: new Date(termPublication),
      priority: priorityPublication,
        isdone: false,
      publicationMedia: null
    };

    const headers = new Headers();

    headers.set("Content-Type", "application/json");
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newPublication),
    };
    const result = await fetch(url, options);

    if (result.ok) {
      const post = await result.json();
      allPublication.push(post);
      setPublication(allPublication);
    }

    return [];
  };
  const deletePublication = async (id) => {
    const headers = new Headers();

    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
    const options = {
      method: "DELETE",
      headers: headers,
    };
    await fetch(url + `/${id}`, options);
    setPublication(allPublication.filter((x) => x.id !== id));
  };

  const updatePublication = async (id, oldPublication) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));

    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(oldPublication),
    };
    await fetch(url + `/${id}`, options);
    const index = allPublication.findIndex((x) => x.id === id);
    allPublication[index] = oldPublication;
    setPublication(allPublication.slice());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    if (isLoggedIn) {
      getPublicationsAll();
    } else {
      setPublication([]);
    }
    if (localStorage.getItem("userrole") == 1) {
        setIsAdmin(true);
      }
      console.log(isAdmin);
      console.log(localStorage.getItem("userrole"))
  }, [isLoggedIn], [isAdmin]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    let nameRole;
    if (localStorage.getItem("userrole") == 1) { nameRole = "Пользователь" }
    else { nameRole = "Администратор" }
    return (

    <Layout>
      <Layout className="site-layout">
        <Spin spinning={spinning} fullscreen />
        <NavBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></NavBar>
        {isLoggedIn ? (

          <>

            <AddPublicationModal addPublication={addPublication} setPublication={setPublication}></AddPublicationModal>
                        <Layout >
                            <Content
                                style={{
                                    padding: '0 48px',
                                    margin: '10px',
                                }}
                            >
                                <Layout
                                    style={{
                                        padding: '24px 0',
                                        background: colorBgContainer,
                                        borderRadius: borderRadiusLG,
                                    }}
                                >
                                    <Sider
                                        style={{
                                            background: colorBgContainer,
                                        }}
                                        width={350}
                                    >
                                        <Menu
                                            mode="inline"
                                            defaultSelectedKeys={['1']}
                                            defaultOpenKeys={['sub1']}
                                            style={{
                                                height: '100%',
                                            }}
                                            items={items2}
                                        />
                                    </Sider>
                                    {isAdmin ? <Content className="content">
                                        <div>
                                            {allPublication.map((x) => (

                                                <PublicationItem
                                                    publication={x}

                                                    deleteAction={() => deletePublication(x.id)}
                                                    updateAction={() => updatePublication(x.id, x)}
                                                    setPublication={setPublication}
                                                ></PublicationItem>
                                            ))}
                                        </div>

                                    </Content> : <div>Stuff</div>}
                                    
                                </Layout>
                                
                            </Content>
                        </Layout>
          </>
        ) : (
            <Empty
            className="empty"
            description={
              <span style={{ fontSize: "20px" }}>
                Войдите или зарегистрируйтесь!
              </span>
            }
          ></Empty>
        )}

      </Layout>
    </Layout>
  );
};

export default Todo;
