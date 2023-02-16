import { useEffect, useRef } from "react";
import { Table, Tag, Space, Button, Input, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Inventory as Iv, InventoryState, resetFilter, selectInventory, setFilter } from "redux/inventory";
import { getInventory } from "redux/inventory/inventoryThunk";
import { formatCurrency, formatDate, statusMap } from "utils";

const InventoryTable = () => {
    const searchInput = useRef<InputRef>(null);
    const dispatch = useAppDispatch();

    const { filter, isLoading, inventory, total, limit, page } = useAppSelector(state => state.inventory);

    useEffect(() => {
        dispatch(getInventory(filter));
    }, [filter]);

    useEffect(() => {
        return () => {
            dispatch(resetFilter());
        };
    }, []);

    const handleFilterChange = (key: keyof InventoryState["filter"], value: string) => {
        dispatch(setFilter({ ...filter, [key]: value }));
    };

    const getColumnSearchProps = (dataIndex: keyof InventoryState["filter"]): any => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleFilterChange(dataIndex, searchInput.current.input.value)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleFilterChange(dataIndex, searchInput.current.input.value)}
                        size="small"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            handleFilterChange(dataIndex, "");
                            clearFilters();
                        }}
                        size="small"
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: "TRACKING ID",
            dataIndex: "trackingId",
            key: "trackingId",
            render: (trackingId: string) => <strong>{trackingId.toUpperCase()}</strong>,
            ...getColumnSearchProps("trackingId"),
        },
        {
            title: "TITLE",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps("title"),
        },
        {
            title: "FEE",
            dataIndex: "fee",
            key: "fee",
            render: (fee: number) => formatCurrency(fee),
        },
        {
            title: "PAYMENT",
            dataIndex: "payment",
            key: "payment",
            render: (payment: string) => (
                <Tag color={statusMap[payment]}>
                    <strong>{payment}</strong>
                </Tag>
            ),
        },
        {
            title: "SENDER",
            dataIndex: "senderName",
            key: "senderName",
            ...getColumnSearchProps("otherFilter"),
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
            title: "INITIATOR",
            dataIndex: "creator",
            key: "creator",
            render: (creator: Iv["creator"]) => `${creator.lastName} ${creator.firstName}`,
        },
        {
            title: "DATE",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: Iv["createdAt"]) => formatDate(createdAt),
        },
    ];

    return (
        <Table
            rowKey={record => record.id}
            loading={isLoading}
            columns={columns}
            dataSource={inventory}
            pagination={{
                current: page,
                pageSize: limit,
                total,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
            }}
            className="ant-border-space"
            onChange={({ current, pageSize }) => {
                dispatch(setFilter({ ...filter, page: current, limit: pageSize }));
            }}
            onRow={record => {
                return {
                    onClick: event => {
                        event.stopPropagation();
                        dispatch(selectInventory(record));
                    },
                };
            }}
        />
    );
};

export default InventoryTable;
