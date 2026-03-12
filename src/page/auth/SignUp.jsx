import { Col, Row, Typography } from "antd";
import { useState } from "react";
import Logo from "../../components/shared/logo/Logo";
import SocialLogin from "../../components/auth/signup/SocialLogin";
import ManualSignupForm from "../../components/auth/signup/ManualSignupForm";

const { Title, Text, Link } = Typography;

const SignUp = () => {
  const [showManualForm, setShowManualForm] = useState(false);

  if (!showManualForm) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
      >
        <Col
          xs={24}
          sm={16}
          md={12}
          lg={7}
          style={{
            backgroundColor: "white",
            padding: "60px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex justify-center mb-6">
            <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
          </div>

          <Title level={3} className="text-center mb-2">
            Sign up to The Aspiring Legal Network
          </Title>

          <Text className="block text-center text-gray-600 mb-6">
            Already have an account?{" "}
            <Link style={{ color: "#B9B92B" }} href="/login">
              log in
            </Link>
          </Text>

          <SocialLogin onManualContinue={() => setShowManualForm(true)} />

          <Text className="block text-center text-xs text-gray-500 mt-6">
            By creating an account, you agree to the{" "}
            <Link style={{ color: "#B9B92B" }} href="#">
              Terms & conditions
            </Link>{" "}
            and{" "}
            <Link style={{ color: "#B9B92B" }} href="#">
              Privacy policies
            </Link>
          </Text>
        </Col>
      </Row>
    );
  }

  return <ManualSignupForm />;
};

export default SignUp;
