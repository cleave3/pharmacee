import { Modal } from "antd";
import { useWidth } from "hooks/useWidth";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectInventory } from "redux/inventory";

const ItemDetail = () => {
    const dispatch = useAppDispatch();
    const { selected } = useAppSelector(state => state.inventory);
    
    const { width } = useWidth();

    if (!selected) return null;


    return (
        <Modal
            closable={true}
            open={true}
            centered
            maskClosable={false}
            onCancel={() => dispatch(selectInventory(null))}
            footer={null}
            width={width < 768 ? "100%" : "80%"}
        ></Modal>
    );
};

export default ItemDetail;
