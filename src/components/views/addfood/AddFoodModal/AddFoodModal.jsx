import { Modal, Button } from "antd";
import { useState } from "react";
import AddFoodForm from "../AddFoodForm/AddFoodForm";

const AddFoodModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Agregar alimento
      </Button>
      <Modal
        title="Agregar alimento"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"70%"}
      >
        <AddFoodForm />
      </Modal>
    </>
  );
};

export default AddFoodModal;
