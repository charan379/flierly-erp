import { Button, Modal, Skeleton } from "antd";
import React, { Suspense, useState } from "react";
import { stockService } from "../../service/inventory.service";

const StockConversionsTable = React.lazy(() => import("../../components/StockConversionsTable"));
const StockUOMConvertions = ({ stockId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uomData, setUomData] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = async () => {
    setIsModalVisible(true);
    setLoading(true);
    const { result } = await stockService.getUomConversions({ stockId });
    setUomData(result);
    setLoading(false);
  };

  const handleClose = async () => {
    setIsModalVisible(false);
    setUomData(null);
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        UOM Conversions
      </Button>
      <Modal
        title="Unit of Measure (UOM) Details"
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width={800}
        destroyOnClose={true}
      >
        {loading ? (
          <Skeleton active key={"sk1"} />
        ) : (
          <Suspense fallback={<Skeleton active key={"sk1"} />}>
            <StockConversionsTable data={uomData} />
          </Suspense>
        )}
      </Modal>
    </>
  );
};

export default StockUOMConvertions;
