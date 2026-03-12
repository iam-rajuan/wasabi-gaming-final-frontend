import { Button, Col, Row, Typography } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { secureStorage } from "../../../utils/secureStorage";
import { ActiveSection } from "../../../constant/navConstant";
import FormInput from "../../shared/form/FormInput";
import Logo from "../../shared/logo/Logo";
import { ICONS, IMAGES } from "../../../assets";

const { Title, Text, Link } = Typography;

const ManualSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    secureStorage.getItem("activeSection") || ActiveSection.Students
  );
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const formData =
      activeTab === ActiveSection.Students
        ? {
            email: data.email,
            phone: data.phone,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
          }
        : {
            email: data.email,
            phone: data.phone,
            password: data.password,
            schoolName: data.schoolName,
          };

    console.log("Form data:", formData);
    navigate("/verify-identity");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    secureStorage.setItem("activeSection", tab);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Row className="bg-[#f0f2f5] min-h-screen">
      {/* Left: Form */}
      <Col xs={24} md={12} className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-xl">
          <Link href="/" className="flex justify-center mb-8">
            <Logo height={120} mobileHeight={70} name="Aspiring Legal Network" />
          </Link>

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
            {activeTab === ActiveSection.Students
              ? "Ready to Start Your Journey in Law?"
              : "Ready to land an apprenticeship?"}
          </Title>
          <Text className="block text-center text-gray-600 mb-8">
            {activeTab === ActiveSection.Students
              ? "Learn, Connect, and Build Your Legal Career."
              : "Quickly find and apply to thousands of apprenticeship in one-click."}
          </Text>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Row gutter={16}>
              {activeTab === ActiveSection.Students ? (
                <>
                  <Col xs={24} sm={12}>
                    <FormInput
                      id="firstName"
                      textBlack
                      label="First name"
                      placeholder="John"
                      register={register}
                      validation={{ required: "First name is required" }}
                      error={errors.firstName}
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <FormInput
                    textBlack
                      id="lastName"
                      label="Last name"
                      placeholder="Doe"
                      register={register}
                      validation={{ required: "Last name is required" }}
                      error={errors.lastName}
                    />
                  </Col>
                </>
              ) : (
                <Col xs={24}>
                  <FormInput
                  textBlack
                    id="schoolName"
                    label="School name"
                    placeholder="St Paul's School"
                    register={register}
                    validation={{ required: "School name is required" }}
                    error={errors.schoolName}
                  />
                </Col>
              )}
            </Row>

            <FormInput
            textBlack
              id="email"
              label="Email address"
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

            <FormInput
            textBlack
              id="phone"
              label="Phone number"
              placeholder="+447480734898"
              icon={ICONS.phone}
              register={register}
              validation={{ required: "Phone is required" }}
              error={errors.phone}
            />

            {/* Password with Toggle */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffff00] pr-10 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
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

            <Text className="block text-[#808080] text-sm">
              By creating an account, you agree to the{" "}
              <Link style={{ color: "#B9B92B" }} href="#">
                Terms & conditions
              </Link>{" "}
              and{" "}
              <Link style={{ color: "#B9B92B" }} href="#">
                Privacy policies
              </Link>
            </Text>

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
              Sign up
            </Button>

            <Text className="block text-center text-[#808080]">
              Already have an account?{" "}
              <Link style={{ color: "#B9B92B" }} href="/login">
                Log in
              </Link>
            </Text>
          </form>
        </div>
      </Col>

      {/* Right: Hero */}
      <Col xs={24} md={12} className="p-6 md:p-12 flex flex-col justify-center">
        <Title level={3} className="mb-4">
          {activeTab === ActiveSection.Students
            ? "Your All-in-One Platform For Aspiring Legal Professionals!"
            : "Aspiring — Your All-in-One School Management Platform"}
        </Title>
        <Text className="block mb-8 text-gray-700">
          {activeTab === ActiveSection.Students
            ? "The Aspiring Legal Network helps you explore, prepare, and succeed in law with tools, courses, and mentoring that build confidence."
            : "Aspiring is a simple yet powerful system that helps schools manage students, teachers, and activities with ease."}
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
          alt="Hero"
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </Col>
    </Row>
  );
};

export default ManualSignupForm;