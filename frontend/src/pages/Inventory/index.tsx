import { Row, Col, Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableFilters from "./Filters";
import ItemDetail from "./ItemDetail";
import InventoryTable from "./Table";

const Inventory = () => {
    return (
        <>
            <div className="tabled">
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Button icon={<PlusOutlined />} type="primary">
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
        </>
    );
};

export default Inventory;
