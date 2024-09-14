import React, { Suspense, useState } from "react";
import { Button, Modal, Skeleton } from "antd";
import tableTransferService from "./service";

const TableTransfer = React.lazy(() => import("./TableTransfer"));

const TableTransferShuttle = ({
  entity,
  entityColumns,
  columnsToInclude,
  existingRightDataSource,
  targetKeys: existingTargetKeys,
  fieldName,
  recordId,
  onSuccess,
  targetKeysDataType,
  parentTableEntity
}) => {
  const tableTransferProps = {
    entity,
    entityColumns,
    columnsToInclude,
    existingRightDataSource,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetKeys, setTargetKeys] = useState(existingTargetKeys);

  const handleTargetKeysChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);

    tableTransferService
      .updateArrayField({
        entity: parentTableEntity,
        dataType: targetKeysDataType,
        fieldPath: fieldName,
        id: recordId,
        newArray: targetKeys,
      })
      .then((result) => {
        onSuccess();
        setLoading(false);
        setIsModalOpen(false);
      });
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
          title="Shuttle Modal"
          style={{
            top: 50,
          }}
          width={"80%"}
          height={"80dvh"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
          confirmLoading={loading}
        >
          <Suspense fallback={<Skeleton active />}>
            <TableTransfer
              {...tableTransferProps}
              targetKeys={targetKeys}
              onTargetKeysChange={handleTargetKeysChange}
            />
          </Suspense>
        </Modal>
      </div>
    </>
  );
};

export default TableTransferShuttle;
