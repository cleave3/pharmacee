import { Tag, Table, Avatar, Space } from "antd";
import { useEffect } from "react";
import { getUsers } from "redux/auth/authThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { statusMap, formatDate } from "utils";

const UsersTable = () => {
    const dispatch = useAppDispatch();

    const { isLoading, users } = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const columns = [
        {
            title: "FIRST NAME",
            dataIndex: "firstName",
            key: "firstName",
            render: (fistName: string) => (
                <Space>
                    <Avatar className="shape-avatar" shape="circle" size={40} />
                    <span>{fistName}</span>
                </Space>
            ),
        },
        {
            title: "LAST NAME",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "EMAIL",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "ROLE",
            dataIndex: "role",
            key: "role",
            render: (role: string) => (
                <Tag color={statusMap[role]}>
                    <strong>{role}</strong>
                </Tag>
            ),
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={statusMap[status]}>
                    <strong>{status}</strong>
                </Tag>
            ),
        },
        {
            title: "REG DATE",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => formatDate(createdAt),
        },
    ];

    return (
        <Table
            rowKey={record => record.id}
            loading={isLoading}
            columns={columns}
            dataSource={users}
            pagination={false}
            className="ant-border-space"
        />
    );
};

export default UsersTable;
