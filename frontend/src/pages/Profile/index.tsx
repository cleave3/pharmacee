import { Row, Col, Card, Button, Descriptions, Avatar } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useAppSelector } from "redux/hooks";

function Profile() {
    const { user } = useAppSelector(state => state.auth);

    return (
        <>

            <Card
                className="card-profile-head"
                bodyStyle={{ display: "none" }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info">
                            <Avatar.Group>
                                <Avatar size={74} shape="square" />

                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0" style={{ textTransform: "capitalize"}}>
                                        {user?.firstName} {user?.lastName}
                                    </h4>
                                    <p>{user?.role}</p>
                                </div>
                            </Avatar.Group>
                        </Col>
                    </Row>
                }
            ></Card>
            <Row gutter={[24, 0]}>
                <Col span={24} md={12} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Profile Information</h6>}
                        className="header-solid h-full card-profile-information"
                        extra={<Button icon={<EditFilled />} children={"Edit"} />}
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <Descriptions>
                            <Descriptions.Item label="Full Name" span={3}>
                            {user?.firstName} {user?.lastName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mobile" span={3}>
                                {user?.telephone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email" span={3}>
                                {user?.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status" span={3}>
                                {user?.status}
                            </Descriptions.Item>
                            <Descriptions.Item label="Registration Date" span={3}>
                                {new Date(user?.createdAt).toDateString()}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={24} md={12} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Change Password</h6>}
                        className="header-solid h-full"
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        change password
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Profile;
