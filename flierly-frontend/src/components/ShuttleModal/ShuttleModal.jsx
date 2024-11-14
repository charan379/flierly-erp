import { Button, Modal } from "antd";
import React, { useState } from "react";

const ShuttleModal = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Prevent context menu propagation
  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu
    e.stopPropagation(); // Stop the event from propagating
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <div onContextMenu={handleContextMenu}>
        <Modal
          title="Shuttl Modal"
          style={{
            top: 50,
          }}
          width={"80%"}
          height={"80dvh"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {children}
        </Modal>
      </div>
    </>
  );
};

export default ShuttleModal;
