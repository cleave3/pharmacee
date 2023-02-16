import { Col, Card, Row, Typography, Spin } from "antd";

interface StartsCardProps {
    title: string;
    value: number;
    color?: string;
    loading?: boolean;
}

const StartsCard = ({ title, value, loading, color = "" }: StartsCardProps) => {
    return (
        <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox ">
                <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                        <Col xs={18}>
                            <span>{title}</span>

                            <Typography.Title level={3}>{loading ? <Spin /> : value}</Typography.Title>
                        </Col>
                        <Col xs={6}>
                            <div className={`icon-box ${color}`}>{heart}</div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Col>
    );
};

const heart = [
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
            fill="#fff"
        ></path>
    </svg>,
];

export default StartsCard;
