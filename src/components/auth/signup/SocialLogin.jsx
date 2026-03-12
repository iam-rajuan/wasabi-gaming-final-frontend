import { GoogleOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";

const SocialLogin = ({ onManualContinue }) => {
  return (
    <div className="w-full space-y-4">
      <Button
        icon={<GoogleOutlined />}
        block
        size="large"
        style={{
          height: "44px",
          backgroundColor: "#ffff00",
          borderColor: "#ffff00",
          color: "#000",
          fontWeight: "bold",
          fontSize: "16px",
        }}
        className="flex items-center justify-center"
      >
        Continue with Google
      </Button>

      <Divider plain>or</Divider>

      <Button
        block
        size="large"
        style={{
          height: "44px",
          borderColor: "#D9D9D9",
          color: "#000",
          fontWeight: "bold",
          fontSize: "16px",
        }}
        onClick={onManualContinue}
      >
        Continue manually
      </Button>
    </div>
  );
};

export default SocialLogin;
