import { Button, Checkbox, Col, Input, Row, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Logo from "../../components/shared/logo/Logo";


const { Text, Link } = Typography;

const WrongPassword = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex justify-center mb-8">
            <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
          </div>

          <h2 className="text-center text-xl font-bold mb-6">Enter password</h2>

          <div className="mb-4">
            <Text>Email address</Text>
            <Input
              prefix={<MailOutlined />}
              defaultValue="admin@stpaulsschool.uk"
              readOnly
              style={{ height: "56px", borderRadius: "8px" }}
            />
          </div>

          <div className="mb-4">
            <Text>Password</Text>
            <Input.Password
              defaultValue="SPS@2025"
              readOnly
              style={{ height: "56px", borderRadius: "8px" }}
            />
          </div>

          <Row justify="space-between" className="mb-6">
            <Checkbox>Remember me</Checkbox>
            <Link href="/forget-password" style={{ color: "#B9B92B" }}>
              Forget password?
            </Link>
          </Row>

          <Button
            type="primary"
            block
            size="large"
            style={{
              height: "56px",
              backgroundColor: "#ffff00",
              borderColor: "#ffff00",
              color: "black",
              fontWeight: "bold",
              borderRadius: "12px",
            }}
          >
            Log in
          </Button>

          <div className="my-4 text-center text-gray-500">or</div>

          <Button
            block
            size="large"
            style={{
              height: "56px",
              borderColor: "#d9d9d9",
              borderRadius: "12px",
            }}
          >
            Continue with Google
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default WrongPassword;