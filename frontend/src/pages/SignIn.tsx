import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import { login } from "redux/auth/authThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const { Title } = Typography;
const {  Content } = Layout;

const SignIn = () => {

    const dispatch = useAppDispatch()

    const onFinish = values => {
        console.log('values ', values);
        dispatch(login(values))
    };

    const { isLoading } = useAppSelector(state => state.auth)

    console.log('isLoading ', isLoading)

    return (
        <>
            <Layout className="layout-default layout-signin" style={{ height: "100vh", display: "grid", placeItems: "center" }}>
                <Content className="signin">
                    <Row gutter={[24, 0]} justify="space-around">
                        <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                            <Title className="mb-15">Sign In</Title>
                            <Title className="font-regular text-muted" level={5}>
                                Enter your email and password to sign in
                            </Title>
                            <Form
                                onFinish={onFinish}
                                // onFinishFailed={() => {}}
                                layout="vertical"
                                className="row-col"
                            >
                                <Form.Item
                                    className="username"
                                    label="Email or Phone"
                                    name="userName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email or phone number!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter your Email or Phonenumber" />
                                </Form.Item>

                                <Form.Item
                                    className="username"
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Password" type="password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button loading={isLoading} type="primary" htmlType="submit" style={{ width: "100%" }}>
                                        SIGN IN
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default SignIn;
