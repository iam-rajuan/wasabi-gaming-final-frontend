// src/page/auth/ResetPassword.jsx
import { Button, Col, Row, Typography, message } from "antd";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/shared/logo/Logo";
import { ICONS, IMAGES } from "../../assets";
import { secureStorage } from "../../utils/secureStorage";
import { ActiveSection } from "../../constant/navConstant";
import { useState } from "react";

const { Title, Text, Link } = Typography;

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    secureStorage.getItem("activeSection") || ActiveSection.Students
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const password = watch("password");
  const email = location.state?.email || "user@example.com";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    secureStorage.setItem("activeSection", tab);
  };

  const onSubmit = (data) => {
    console.log("Reset password data:", { ...data, email });
    // ----> Replace with real API call <----
    message.success("Password reset successfully!");
    navigate("/login");
  };

  return (
    <Row className="bg-[#f0f2f5] min-h-screen">
      {/* LEFT: Reset Password Form */}
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
            Reset Your Password
          </Title>
          <Text className="block text-center text-gray-600 mb-8">
            Create a new password for your account: <strong>{email}</strong>
          </Text>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffff00] ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum 8 characters" },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message: "Must include letters, numbers, and symbols",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <img
                    src={showPassword ? ICONS.eyeOpen : ICONS.eyeClose}
                    alt="toggle"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffff00] ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <img
                    src={showConfirmPassword ? ICONS.eyeOpen : ICONS.eyeClose}
                    alt="toggle"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

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
              Reset Password
            </Button>
          </form>
        </div>
      </Col>

      {/* RIGHT: Hero */}
      <Col xs={24} md={12} className="p-6 md:p-12 flex flex-col justify-center">
        <Title level={3} className="mb-4">
          Create a Strong Password
        </Title>
        <Text className="block mb-8 text-gray-700">
          Choose a strong, unique password to protect your account. A good password includes:
        </Text>

        <div className="space-y-3 mb-8">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-[#ffff00] flex items-center justify-center mr-3">
              <span className="text-xs">✓</span>
            </div>
            <Text>At least 8 characters long</Text>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-[#ffff00] flex items-center justify-center mr-3">
              <span className="text-xs">✓</span>
            </div>
            <Text>Includes uppercase and lowercase letters</Text>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-[#ffff00] flex items-center justify-center mr-3">
              <span className="text-xs">✓</span>
            </div>
            <Text>Contains numbers and special characters</Text>
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
          alt="Password Security"
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </Col>
    </Row>
  );
};

export default ResetPassword;