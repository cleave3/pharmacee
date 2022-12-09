import { useEffect } from "react";

import { Row, Col, Button } from "antd";
import { useAppSelector } from "redux/hooks";

const toggler = [
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" key={0}>
        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
    </svg>,
];

function Header({ subName, onPress }) {

    useEffect(() => window.scrollTo(0, 0));

    const { user } = useAppSelector(state => state.auth)

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col span={24} md={6}>
                    <h1>Welcome, <span>{user?.firstName}  {user?.lastName}</span></h1>
                    <div className="ant-page-header-heading">
                        <span className="ant-page-header-heading-title" style={{ textTransform: "capitalize" }}>
                            {subName.replace("/", "")}
                        </span>
                    </div>
                </Col>
                <Col span={24} md={18} className="header-control">
                    <Button type="link" className="sidebar-toggler" onClick={() => onPress()}>
                        {toggler}
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Header;
