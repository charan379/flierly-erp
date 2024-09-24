import React, { Suspense, useState } from "react";
import { Badge, Button, Modal, Skeleton } from "antd";
import tableTransferService from "./service";
import useLocale from "../Language/hooks/useLocale";

const TableTransfer = React.lazy(() => import("./TableTransfer"));

const TableTransferShuttle = ({
  title = "shuttle_title",
  triggerConfig = {
    buttonType: "link",
    text: "button_name"
  },
  requestConfig = {
    entityName: "entity",
    fieldName: "field",
    recordId: "record_id",
    onSuccess: () => { },
  },
  buttonsConfig = {
    okText: "save",
    cancelText: "cancel"
  },
  tableConfig = {
    entityName: "entityName",
    columns: [],
    columnsToDisplay: [],
    targetKeys: [],
    rowKey: "id",
    titles: ["left_title", "right_title"]
  },
}) => {

  const { translate } = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetKeys, setTargetKeys] = useState(tableConfig.targetKeys);

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
        entity: requestConfig.entityName,
        fieldPath: requestConfig.fieldName,
        id: requestConfig.recordId,
        newArray: targetKeys,
      })
      .then(() => {
        requestConfig.onSuccess();
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Prevent context menu propagation
  const handleContextMenu = (e) => {
    e.stopPropagation(); // Stop the event from propagating
  };

  return (
    <>
      <Badge count={tableConfig.targetKeys.length} overflowCount={99} showZero offset={[-3, 3]} >
        <Button type={triggerConfig.buttonType} onClick={showModal}>
          {translate(triggerConfig.text)}
        </Button></Badge>
      <div onContextMenu={handleContextMenu}>
        <Modal
          title={translate(title)}
          style={{ top: 50 }}
          width={"80%"}
          height={"80dvh"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={translate(buttonsConfig.okText)}
          cancelText={translate(buttonsConfig.cancelText)}
          confirmLoading={loading}
        >
          <Suspense fallback={<><Skeleton active key={"sk1"} /><Skeleton active key={"sk2"} /></>}>
            <TableTransfer
              {...tableConfig}
              titles={[translate(tableConfig.titles[0]), translate(tableConfig.titles[1])]}
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
