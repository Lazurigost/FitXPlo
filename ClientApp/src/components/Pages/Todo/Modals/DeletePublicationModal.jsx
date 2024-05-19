import React, { useState } from "react";
import { Modal, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteModal = ({ deletePublication, publication }) => {
  const [isAuthModal, setAuthModal] = useState(false);

  const showAuthModal = () => {
    setAuthModal(true);
  };

  const handleCancel = () => {
    setAuthModal(false);
  };

  return (
    <>
      <Tooltip title="Удалить">
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={showAuthModal}
          style={{ marginLeft: "10px" }}
          danger
        ></Button>
      </Tooltip>
      <Modal
        title="Удаление"
        open={isAuthModal}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Вы точно хотите удалить публикацию?</p>
        <Button
          type="primary"
          danger
          onClick={() => {
            setAuthModal(false);
            deletePublication(publication.id);
          }}
        >
          Удалить
        </Button>
      </Modal>
    </>
  );
};

export default DeleteModal;
