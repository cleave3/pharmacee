import { Card, Descriptions } from "antd";
import { useAppSelector } from "redux/hooks";

const ProfileInfo = () => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
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
    );
};

export default ProfileInfo;
