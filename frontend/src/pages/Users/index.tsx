import { UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Row, Col, Card } from "antd";
import UsersTable from "./Table";

const Users = () => {
    return (
        <>
            <div className="tabled">
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Button icon={<UsergroupAddOutlined style={{ fontSize: "20px" }} />} type="primary">
                        Add New
                    </Button>
                </div>
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Users Table"
                        >
                            <div className="table-responsive">
                                <UsersTable />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Users;
