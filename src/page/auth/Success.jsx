
import { Button, Card, Typography } from "antd";

import { useNavigate } from "react-router-dom";
import Logo from "../../components/shared/logo/Logo";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Success = ({ onGoHome }) => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg text-center">
        <div className="flex justify-center mb-6">
          <Logo height={88} mobileHeight={88} name="Aspiring Legal Network" />
        </div>

        <Title level={3} className="mb-2">
          Congratulations!
        </Title>
        <Text className="block text-gray-600 mb-8">
          You have successfully completed your login process
        </Text>

        <CheckCircleOutlined
          style={{ fontSize: "80px", color: "#52c41a" }}
          className="mb-8"
        />

        <Button
          type="primary"
          block
          size="large"
          className="h-12 rounded-lg"
          style={{ background: "#ffff00", borderColor: "#ffff00", color: "#1e1e1e" }}
          onClick={() => navigate("/") || onGoHome}
        >
          Go to home
        </Button>
      </Card>
    </div>
  );
};

export default Success;