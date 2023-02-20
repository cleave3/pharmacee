import { Row, Col, Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableFilters from "./Filters";
import ItemDetail from "./ItemDetail";
import InventoryTable from "./Table";
import { useAppDispatch } from "redux/hooks";
import { toggleForm } from "redux/inventory";
import ItemForm from "./ItemForm";

const Inventory = () => {
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="tabled">
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => dispatch(toggleForm({ visible: true }))}
                    >
                        Register New Item
                    </Button>
                </div>
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Inventory Table"
                            extra={<TableFilters />}
                        >
                            <div className="table-responsive">
                                <InventoryTable />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            <ItemDetail />
            <ItemForm />
        </>
    );
};

export default Inventory;
