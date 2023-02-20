import { Button, Col, Form, Input, InputNumber, Layout, Modal, Row, Select, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useWidth } from "hooks/useWidth";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { toggleForm } from "redux/inventory";
import { saveItem } from "redux/inventory/inventoryThunk";
import { PAYMENTSTATUS } from "utils";

const { Title } = Typography;
const { Content } = Layout;

const ItemForm = () => {
    const { showForm, isProcessing } = useAppSelector(state => state.inventory);
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const { width } = useWidth();

    const onFinish = values => {
        dispatch(saveItem({ data: values, successFuc: form.resetFields }));
    };

    return (
        <Modal
            closable={true}
            open={showForm}
            centered
            maskClosable={false}
            onCancel={() => dispatch(toggleForm({ visible: false }))}
            footer={null}
            width={width <= 768 ? "100%" : "60%"}
        >
            <Content>
                <Row gutter={[24, 0]} justify="space-around">
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                        <Title className="mb-15">ADD NEW ITEM</Title>
                        <Title className="font-regular text-muted" level={5}>
                            Submit form to add a new Item
                        </Title>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            // onFinishFailed={() => {}}
                            layout="vertical"
                            className="row-col"
                        >
                            <Row gutter={[24, 0]} justify="space-around">
                                <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                                    <hr />
                                    <Title className="font-regular text-muted" level={5}>
                                        Sender Details
                                    </Title>
                                    <hr />
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                                    <Form.Item
                                        className="senderName"
                                        label="Sender's Name"
                                        name="senderName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Sender Name" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                                    <Form.Item
                                        className="senderPhone"
                                        label="Sender's Phone"
                                        name="senderPhone"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                        ]}
                                    >
                                        <Input type="tel" minLength={11} maxLength={11} placeholder="Sender's Phone" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                                    <Form.Item
                                        className="senderAddress"
                                        label="Sender's Address"
                                        name="senderAddress"
                                        rules={[]}
                                    >
                                        <Input placeholder="Sender's Address" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                                    <hr />
                                    <Title className="font-regular text-muted" level={5}>
                                        Reciever's Details
                                    </Title>
                                    <hr />
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                                    <Form.Item
                                        className="recipientName"
                                        label="Recipient's Name"
                                        name="recipientName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Recipient's Name" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                                    <Form.Item
                                        className="recipientPhone"
                                        label="Recipient's Phone"
                                        name="recipientPhone"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="tel"
                                            minLength={11}
                                            maxLength={11}
                                            placeholder="Recipient's Phone"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                                    <Form.Item
                                        className="recipientAddress"
                                        label="Delivery Address"
                                        name="recipientAddress"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Delivery Address" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                                    <hr />
                                    <Title className="font-regular text-muted" level={5}>
                                        Package Details
                                    </Title>
                                    <hr />
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 18 }} md={{ span: 18 }}>
                                    <Form.Item
                                        className="title"
                                        label="Title"
                                        name="title"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter Title" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 6 }}>
                                    <Form.Item
                                        className="fee"
                                        label="Fee"
                                        name="fee"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                            {
                                                type: "regexp",
                                                pattern: new RegExp("[0-9]"),
                                                message: "Fee must be a number",
                                                validateTrigger: ["input", "blur"],
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            parser={value => value!.replace(/\₦\s?|(,*)/g, "")}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                                    <Form.Item
                                        className="description"
                                        label="Package Description"
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                                message: "This field is required",
                                            },
                                        ]}
                                    >
                                        <ReactQuill
                                            modules={{
                                                toolbar: [
                                                    [{ header: [1, 2, false] }],
                                                    ["bold", "italic", "underline", "strike", "blockquote"],
                                                    [
                                                        { list: "ordered" },
                                                        { list: "bullet" },
                                                        { indent: "-1" },
                                                        { indent: "+1" },
                                                    ],
                                                    ["link", "image"],
                                                    ["clean"],
                                                ],
                                            }}
                                            formats={[
                                                "header",
                                                "bold",
                                                "italic",
                                                "underline",
                                                "strike",
                                                "blockquote",
                                                "list",
                                                "bullet",
                                                "indent",
                                                "link",
                                                "image",
                                            ]}
                                            theme="snow"
                                            value={""}
                                            onChange={undefined}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                                    <Form.Item className="comment" label="Comments" name="comment" rules={[]}>
                                        <Input placeholder="Additional comment..." />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                                    <Form.Item className="payment" label="Payment Status" name="payment" rules={[]}>
                                        <Select
                                            className="form-select"
                                            defaultValue={"PENDING"}
                                            options={PAYMENTSTATUS.map(i => ({ label: i, value: i }))}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button
                                    loading={isProcessing}
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "100%" }}
                                    icon={<SendOutlined />}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Modal>
    );
};

export default ItemForm;
