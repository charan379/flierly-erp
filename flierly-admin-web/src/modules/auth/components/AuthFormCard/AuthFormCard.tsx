import { Card, Col, Divider, Typography } from "antd"

interface AuthFormCardProps {
    title: string,
    children: React.ReactNode
}

const { Title } = Typography;

const AuthFormCard: React.FC<AuthFormCardProps> = ({ children, title }) => {

    return (
        <Card
            className="auth-form-card"
            style={{
                margin: '0 auto',
                borderRadius: '10px',
                background: 'var(--bg-color-primary-lite-flierly)',
                width: '450px',
                maxWidth: '90%',
                overflow: 'scroll',
            }}
        >
            <Col xs={24} sm={24} md={0} lg={0}>
                <img src="/vite.svg" alt="Flierly" style={{ margin: '0 auto 20px', display: 'block' }} height={63} width={220} />
                <div className="space10" />
            </Col>
            <Title level={1}>{title}</Title>
            <Divider />
            {children}
        </Card>
    )
};

export default AuthFormCard;