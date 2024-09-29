import React, { Suspense, useState } from "react";
import { Badge, Button, Modal, Skeleton } from "antd";
import tableTransferService from "./service";
import useLocale from "../Language/hooks/useLocale";

const TableTransfer = React.lazy(() => import("./TableTransfer"));

const TableTransferShuttle = ({
  title = "shuttle_title",
  triggerConfig = {
    buttonType: "link",
    text: "button_name",
  },
  requestConfig = {
    entityName: "entity",
    fieldName: "field",
    recordId: "record_id",
    onSuccess: () => {},
  },
  buttonsConfig = {
    okText: "save",
    cancelText: "cancel",
  },
  tableConfig = {
    entityName: "entityName",
    columns: [],
    columnsToDisplay: [],
    targetKeys: [],
    rowKey: "id",
    titles: ["left_title", "right_title"],
  },
}) => {
  const { translate } = useLocale();
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
  const [targetKeys, setTargetKeys] = useState(tableConfig.targetKeys); // Selected keys for table transfer

  // Handle the change in selected target keys
  const handleTargetKeysChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle OK action (saving data)
  const handleOk = async () => {
    setIsLoading(true); // Set loading state to true

    // Update the array field using the service
    tableTransferService
      .updateArrayField({
        entity: requestConfig.entityName,
        fieldPath: requestConfig.fieldName,
        id: requestConfig.recordId,
        newArray: targetKeys,
      })
      .then(() => {
        requestConfig.onSuccess(); // Call the success callback
        setIsModalVisible(false);
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  // Handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  // Prevent context menu propagation
  const handleContextMenu = (e) => {
    e.stopPropagation(); // Stop the event from propagating
  };

  return (
    <>
      <Badge
        count={tableConfig.targetKeys.length}
        overflowCount={99}
        showZero
        offset={[-3, 3]}
      >
        <Button type={triggerConfig.buttonType} onClick={showModal}>
          {translate(triggerConfig.text)} {/* Translate button text */}
        </Button>
      </Badge>
      <div onContextMenu={handleContextMenu}>
        {" "}
        {/* Prevent right-click context menu */}
        <Modal
          title={translate(title)} // Translate modal title
          style={{ top: 50 }}
          width={"80%"}
          height={"80dvh"}
          open={isModalVisible} // Control modal visibility
          onOk={handleOk} // Handle OK button
          onCancel={handleCancel} // Handle Cancel button
          okText={translate(buttonsConfig.okText)} // Translate OK button text
          cancelText={translate(buttonsConfig.cancelText)} // Translate Cancel button text
          confirmLoading={isLoading} // Show loading spinner on OK
        >
          <Suspense
            fallback={
              <>
                <Skeleton active key={"sk1"} />
                <Skeleton active key={"sk2"} />
              </>
            }
          >
            <TableTransfer
              columns={tableConfig.columns}
              columnsToDisplay={tableConfig.columnsToDisplay}
              entityName={tableConfig.entityName}
              rowKey="id"
              titles={[
                translate(tableConfig.titles[0]),
                translate(tableConfig.titles[1]),
              ]} // Translate table titles
              targetKeys={targetKeys}
              onTargetKeysChange={handleTargetKeysChange} // Handle changes in selected keys
            />
          </Suspense>
        </Modal>
      </div>
    </>
  );
};

export default TableTransferShuttle;
