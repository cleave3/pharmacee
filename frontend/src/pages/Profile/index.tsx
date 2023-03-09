import { Row, Col, Card, Avatar } from "antd";
import { useAppSelector } from "redux/hooks";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";

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
                    <ProfileInfo />
                </Col>
                <Col span={24} md={12} className="mb-24">
                    <ChangePassword />
                </Col>
            </Row>
        </>
    );
}

export default Profile;
