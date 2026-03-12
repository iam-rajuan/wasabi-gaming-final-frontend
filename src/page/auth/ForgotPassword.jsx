import { Button, Col, Row, Typography, message } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/shared/logo/Logo";
import FormInput from "../../components/shared/form/FormInput";
import { ICONS, IMAGES } from "../../assets";
import { secureStorage } from "../../utils/secureStorage";
import { ActiveSection } from "../../constant/navConstant";
import { useState } from "react";

const { Title, Text, Link } = Typography;

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState(
    secureStorage.getItem("activeSection") || ActiveSection.Students
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    secureStorage.setItem("activeSection", tab);
  };

  const onSubmit = (data) => {
    console.log("Forgot password email:", data.email);
    // ----> Replace with real API to send reset code <----
    message.success(`Reset code sent to ${data.email}`);
    navigate("/verify-identity", { state: { email: data.email } });
  };

  return (
    <Row className="bg-[#f0f2f5] min-h-screen">
      {/* LEFT: Forgot Password Form */}
      <Col
        xs={24}
        md={12}
        className="flex items-center justify-center p-6 md:p-12 bg-white"
      >
        <div className="w-full max-w-xl">
          <Link href="/" className="flex justify-center mb-8">
            <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
          </Link>

          {/* Tabs */}
          {/* <Row justify="center" className="mb-6">
            {["Students", "School"].map((tab) => (
              <Button
                key={tab}
                type={activeTab === ActiveSection[tab] ? "primary" : "default"}
                size="large"
                className="mx-1 rounded-lg font-bold"
                style={{
                  backgroundColor:
                    activeTab === ActiveSection[tab] ? "#ffff00" : "white",
                  borderColor:
                    activeTab === ActiveSection[tab] ? "#ffff00" : "#d9d9d9",
                  color: activeTab === ActiveSection[tab] ? "black" : "inherit",
                }}
                onClick={() => handleTabChange(ActiveSection[tab])}
              >
                {tab === "Students" ? "Student" : "School"}
              </Button>
            ))}
          </Row> */}

          <Title level={2} className="text-center mb-2">
            Forgot Password
          </Title>
          <Text className="block text-center text-gray-600 mb-8">
            Enter your email address and we'll send you a code to reset your password
          </Text>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              id="email"
              label="Email address"
              type="email"
              textBlack
              placeholder="johndoe@example.com"
              icon={ICONS.email}
              register={register}
              validation={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              }}
              error={errors.email}
            />

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                height: "48px",
                backgroundColor: "#ffff00",
                borderColor: "#ffff00",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Send Reset Code
            </Button>

            <Text className="block text-center text-gray-600 mt-6">
              Remember your password?{" "}
              <Link href="/login" style={{ color: "#B9B92B" }}>
                Log in
              </Link>
            </Text>
          </form>
        </div>
      </Col>

      {/* RIGHT: Hero Section */}
      <Col xs={24} md={12} className="p-6 md:p-12 flex flex-col justify-center">
        <Title level={3} className="mb-4">
          Secure Password Recovery
        </Title>
        <Text className="block mb-8 text-gray-700">
          We'll send a verification code to your email to ensure the security of your account. 
          Follow the instructions in the email to reset your password securely.
        </Text>

        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#ffff00] flex items-center justify-center mr-3">
              <span className="text-xs font-bold">1</span>
            </div>
            <Text>Enter your registered email address</Text>
          </div>
          
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#cccccc] flex items-center justify-center mr-3">
              <span className="text-xs font-bold">2</span>
            </div>
            <Text>Check your email for verification code</Text>
          </div>
          
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#cccccc] flex items-center justify-center mr-3">
              <span className="text-xs font-bold">3</span>
            </div>
            <Text>Enter the code and set new password</Text>
          </div>
        </div>

        <div className="flex space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-[#ffff00]" />
          <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
          <div className="w-3 h-3 rounded-full bg-[#cccccc]" />
        </div>

        <img
          src={
            activeTab === ActiveSection.Students
              ? IMAGES.signup_Image_Student
              : IMAGES.signup_Image_School
          }
          alt="Password Recovery"
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </Col>
    </Row>
  );
};

export default ForgotPassword;