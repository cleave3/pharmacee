import { Space, DatePicker, Select, Button } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setFilter, resetFilter, InventoryState } from "redux/inventory";
import { PAYMENTSTATUS, INVENTORYSTATUS } from "utils";

const TableFilters = () => {
    const dispatch = useAppDispatch();

    const { filter } = useAppSelector(state => state.inventory);

    const handleFilterChange = (key: keyof InventoryState["filter"], value: string) => {
        dispatch(setFilter({ ...filter, [key]: value }));
    };

    return (
        <>
            <Space>
                <DatePicker.RangePicker
                    format="YYYY-MM-DD"
                    onChange={(_, valueString) => {
                        dispatch(setFilter({ ...filter, start: valueString[0], end: valueString[1] }));
                    }}
                />
                {[
                    {
                        title: "payment",
                        options: [{ label: "Select Payment Status", value: "" }].concat(
                            PAYMENTSTATUS.map(i => ({ label: i, value: i }))
                        ),
                    },
                    {
                        title: "status",
                        options: [{ label: "Select Inventory Status", value: "" }].concat(
                            INVENTORYSTATUS.map(i => ({ label: i, value: i }))
                        ),
                    },
                ].map((select, i) => (
                    <Select
                        key={i}
                        value={filter[select.title]}
                        style={{ width: "180px" }}
                        defaultValue={""}
                        onChange={value => handleFilterChange(select.title as any, value)}
                        options={select.options}
                    />
                ))}
                <Button type="ghost" onClick={() => dispatch(resetFilter())}>
                    Reset
                </Button>
            </Space>
        </>
    );
};

export default TableFilters;
