import { GoogleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Row, Typography, message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ICONS, IMAGES } from "../../assets";
import Logo from "../../components/shared/logo/Logo";
import FormInput from "../../components/shared/form/FormInput";
import { secureStorage } from "../../utils/secureStorage";
import { ActiveSection } from "../../constant/navConstant";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

const SocialLoginButton = () => (
  <Button
    icon={<GoogleOutlined />}
    block
    size="large"
    style={{
      height: "48px",
      backgroundColor: "#fff",
      borderColor: "#d9d9d9",
      color: "#000",
      fontWeight: "500",
    }}
    className="flex items-center justify-center"
  >
    Continue with Google
  </Button>
);

const Login = () => {
  const [activeTab, setActiveTab] = useState(
    secureStorage.getItem("activeSection") || ActiveSection.Students,
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  // console.log(isError, error)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    secureStorage.setItem("activeSection", tab);
  };

  const onSubmit = async (data) => {
    console.log("Login data:", { ...data });
    // Simulate successful login with dummy token since backend is not ready
    try {
      // Dummy token setting
      const dummyToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      const role = activeTab === ActiveSection.Students ? "student" : "school";
      secureStorage.setItem("token", `Bearer ${dummyToken}`);
      secureStorage.setItem("user", { role });

      // message.success("Login successful!");

      const currentTab = secureStorage.getItem("activeSection");
      if (currentTab === ActiveSection.Students) {
        navigate("/dashboard");
      } else if (currentTab === ActiveSection.School) {
        navigate("/manage-students");
      }
    } catch (err) {
      message.error("Login failed. Please try again.", err);
    }
  };
  return (
    <Row className="bg-[#f0f2f5] min-h-screen">
      {/* LEFT: Login Form */}
      <Col
        xs={24}
        md={12}
        className="flex items-center justify-center p-6 md:p-12 bg-white"
      >
        <div className="w-full max-w-xl">
          <div className="flex justify-center mb-8">
            <Logo height={88} mobileHeight={70} name="Aspiring Legal Network" />
          </div>
          {/* Tabs */}
          <Row justify="center" className="mb-6">
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
          </Row>
          <Title level={2} className="text-center mb-2">
            Welcome back, Future Legal Professional!
          </Title>
          <Text className="block text-center text-gray-600 mb-8">
            Welcome back to The Aspiring Legal Network. Pick up where you left
            off and keep building your future in law.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              id="email"
              label="Email address"
              textBlack
              type="email"
              placeholder="johndoe@example.com"
              icon={ICONS.email}
              register={register}
              validation={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              }}
              error={errors.email}
            />
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffff00] ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" },
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
            <Row justify="space-between" align="middle">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
              <Link href="/forgot-password" style={{ color: "#B9B92B" }}>
                Forgot password?
              </Link>
            </Row>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              // loading={isLoading}
              style={{
                height: "48px",
                backgroundColor: "#ffff00",
                borderColor: "#ffff00",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Log in
            </Button>
            <Divider plain>or</Divider>
            <SocialLoginButton />
            <Text className="block text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link href="/signUp" style={{ color: "#B9B92B" }}>
                Sign up
              </Link>
            </Text>
          </form>
        </div>
      </Col>
      {/* RIGHT: Hero */}
      <Col xs={24} md={12} className="p-6 md:p-12 flex flex-col justify-center">
        <Title level={3} className="mb-4">
          {activeTab === ActiveSection.Students
            ? "Your All-in-one Platform for Aspiring Legal Professionals!"
            : "Aspiring — Your All-in-One School Management Platform"}
        </Title>
        <Text className="block mb-8 text-gray-700">
          {activeTab === ActiveSection.Students
            ? "Aspiring is a simple, powerful tool that helps you create a professional resume in minutes. With modern templates and smart guidance, it lets you showcase your skills confidently and take the next step in your career."
            : "Aspiring is a simple yet powerful system that helps schools manage students, teachers, and activities with ease. With smart tools and a modern interface, it lets you organize efficiently and focus on better learning outcomes."}
        </Text>
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
          alt="Legal professionals"
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </Col>
    </Row>
  );
};
export default Login;
