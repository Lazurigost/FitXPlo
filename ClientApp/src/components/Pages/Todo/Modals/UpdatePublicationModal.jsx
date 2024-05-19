import React, { useState, useRef } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Cascader,
  Tooltip,
  Modal,
} from "antd";
import { optionsPriority } from "../Helpers/OptionsPriority";
import dayjs from "dayjs";

const { TextArea } = Input;

const dateFormat = "YYYY/MM/DD";

const UpdatePublicationModal = ({ updatePublication, publication, publicationCopy }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [form] = Form.useForm();

  const resetForm = () => {
    form.setFieldsValue({
      uname: publicationCopy.name,
      udescription: publicationCopy.description,
      upriority: publicationCopy.priority,
    });
    publication.name = publicationCopy.name;
    publication.description = publicationCopy.description;
    publication.term = publicationCopy.term;
    publication.priority = publicationCopy.priority;
  };

  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
    resetForm();
  };
  const handleUpdateCancel = () => {
    resetForm();
    setIsUpdateModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Tooltip title="Редактировать">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={showUpdateModal}
        ></Button>
      </Tooltip>

      <Modal
        title="Редактирование публикации"
        open={isUpdateModalOpen}
        onCancel={handleUpdateCancel}
        okText="Применить"
        cancelText="Отмена"
        footer={null}
      >
        <Form
          form={form}
          onFinish={() => {
            setIsUpdateModalOpen(false);
            updatePublication(publication.id, publication);
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
            name="uname"
            initialValue={publication.name}
            rules={[
              {
                required: true,
                message: "Введите название публикации",
              },
            ]}
          >
            <Input
              id="uname"
              placeholder="Название"
              onChange={(e) => (publication.name = e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item
            name="udescription"
            label="Описание"
            initialValue={publication.description}
          >
            <TextArea
              id="udescription"
              rows={4}
              placeholder="Описание"
              defaultValue={publication.description}
              onChange={(e) => (publication.description = e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Срок публикации"
            name="uterm"
            initialValue={dayjs(publication.term, dateFormat)}
            rules={[
              {
                required: true,
                message: "Выберите срок публикации",
              },
            ]}
          >
            <DatePicker
              id="uterm"
              placeholder="Выберите срок"
              onChange={(e) => {
                publication.term = new Date(e);
              }}
            ></DatePicker>
          </Form.Item>
          <Form.Item
            label="Категория"
            name="upriority"
            rules={[
              {
                required: true,
                message: "Введите категорию",
              },
            ]}
            initialValue={publication.priority}
          >
            <Cascader
              id="upriority"
              placeholder="Категория"
              onChange={(e) => {
                document.querySelector("#priority").value = e;
                publication.priority = document.querySelector("#priority").value;
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
              Изменить
            </Button>
          </Form.Item>
        </Form>
        <input id="priority" style={{ visibility: "collapse" }}></input>
      </Modal>
    </div>
  );
};

export default UpdatePublicationModal;
