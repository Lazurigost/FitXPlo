import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Cascader, Modal } from "antd";
import { optionsPriority } from "../Helpers/OptionsPriority";
import { getPublications } from "../FetchData/GetPublications";
const { TextArea } = Input;

const AddPublicationModal = ({ addPublication, setPublication }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const handleCancel = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <Button
        className="addpublication-button"
        onClick={showCreateModal}
        type="primary"
      >
        Создать публикацию
      </Button>

      <Modal
        title="Создание поста"
        open={isCreateModalOpen}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отмена"
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Form
            onFinish={async () => {
              addPublication();
              const posts = await getPublications();
              setPublication(posts);
              setIsCreateModalOpen(false);
            }}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Название"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Введите название",
                },
              ]}
            >
              <Input id="name" placeholder="Название"></Input>
            </Form.Item>
            <Form.Item
              label="Содержимое"
              rules={[
                {
                  required: true,
                  message: "Введите содержимое",
                },
              ]}
            >
              <TextArea id="description" rows={4} placeholder="Содержимое" />
            </Form.Item>
            <Form.Item
              label="Срок публикации"
              name="term"
              rules={[
                {
                  required: true,
                  message: "Выберите срок публикации",
                },
              ]}
            >
              <DatePicker id="term" placeholder="Выберите срок"></DatePicker>
            </Form.Item>
            <Form.Item
              label="Категория"
              name="priority"
              rules={[
                {
                  required: true,
                  message: "Выберите категорию",
                },
              ]}
            >
              <Cascader
                id="priority2"
                placeholder="Категория"
                onChange={(e) => {
                  document.querySelector("#priority").value = e;
                }}
                options={optionsPriority}
              ></Cascader>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Создать
              </Button>
            </Form.Item>
          </Form>
          <input id="priority" style={{ visibility: "collapse" }}></input>
        </div>
      </Modal>
    </>
  );
};

export default AddPublicationModal;
