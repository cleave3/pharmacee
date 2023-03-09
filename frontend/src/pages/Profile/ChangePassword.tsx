import { Button, Card, Form, Input, Popconfirm } from "antd";
import { useRef } from "react";
import { changePassword } from "redux/auth/authThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const ChangePassword = () => {
    const submitRef = useRef<HTMLButtonElement>(null);
    const [form] = Form.useForm();

    const { processing } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const onFinish = values => {
        dispatch(changePassword({ data: values, successFuc: form.resetFields }));
    };

    const handleClick = () => {
        submitRef?.current?.click?.();
    };

    return (
        <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Change Password</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
        >
            <Form
                form={form}
                onFinish={onFinish}
                // onFinishFailed={() => {}}
                layout="vertical"
                className="row-col"
            >
                <Form.Item
                    className="oldpassword"
                    label="Current Password"
                    name="oldpassword"
                    rules={[
                        {
                            required: true,
                            message: "Please input your current password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Current password..." type="password" />
                </Form.Item>

                <Form.Item
                    className="newpassword"
                    label="New Password"
                    name="newpassword"
                    rules={[
                        {
                            required: true,
                            message: "Please input your new password!",
                        },
                        {
                            min: 6,
                            message: "Password must be atleast 6 characters",
                        },
                    ]}
                >
                    <Input.Password placeholder="*****" type="password" />
                </Form.Item>
                <Form.Item>
                    {/* <Popconfirm
                        placement="rightTop"
                        title={"Are you sure you want to continue ?"}
                        onConfirm={handleClick}
                        okText="Yes"
                        cancelText="No"
                    > */}
                        <Button
                            ref={submitRef}
                            loading={processing}
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%" }}
                        >
                            Submit
                        </Button>
                    {/* </Popconfirm> */}
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ChangePassword;
