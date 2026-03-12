import { useState, useEffect, useRef } from "react";
import { Button, Card, Row, Typography, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/shared/logo/Logo";

const { Title, Text, Link } = Typography;

const VerifyIdentity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [isInvalid, setIsInvalid] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);

  // Get email from location state or use default
  const email = location.state?.email || "johndoe@example.com";

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Digit change + auto-focus
  const handleDigitChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const newCode = [...code];
    newCode[i] = v;
    setCode(newCode);
    setIsInvalid(false);

    if (v && i < 4) inputRefs.current[i + 1]?.focus();
  };

  // Handle backspace key
  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      if (code[i] === '' && i > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        inputRefs.current[i - 1]?.focus();
      } else {
        // If current input has value, clear it
        const newCode = [...code];
        newCode[i] = '';
        setCode(newCode);
      }
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Only accept numbers and limit to 5 digits
    const numbersOnly = pastedData.replace(/\D/g, '').slice(0, 5);
    
    if (numbersOnly.length === 5) {
      const newCode = numbersOnly.split('');
      setCode(newCode);
      setIsInvalid(false);
      
      // Focus the last input after paste
      setTimeout(() => {
        inputRefs.current[4]?.focus();
      }, 0);
    }
  };

  // Auto-submit when all digits are filled (optional)
  useEffect(() => {
    if (code.every(digit => digit !== '') && code.join('').length === 5) {
      handleSubmit();
    }
  }, [code]);

  // Submit
  const handleSubmit = () => {
    const entered = code.join("");
    if (entered.length < 5) return message.error("Please enter all 5 digits");

    // ----> replace with real API <----
    if (entered === "12345") { // demo code
      message.success("Code verified successfully!");
      navigate("/reset-password", { state: { email } });
    } else {
      setIsInvalid(true);
      message.error("Invalid Code!");
    }
  };

  // Resend
  const handleResend = () => {
    setIsResending(true);
    setCountdown(60);
    setCode(["", "", "", "", ""]);
    setIsInvalid(false);
    // ----> API call to resend <----
    message.success(`Code resent to ${email}!`);
    setTimeout(() => setIsResending(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <Link href="/" className="flex justify-center mb-6">
          <Logo height={88} mobileHeight={88} name="Aspiring Legal Network" />
        </Link>

        <Title level={3} className="text-center mb-2">
          Verify Identity
        </Title>
        <Text className="block text-center text-gray-600 mb-8">
          Please input the verification code sent to your email <strong>{email}</strong>
        </Text>

        {/* OTP Inputs */}
        <Row justify="center" gutter={12} className="mb-4">
          {code.map((d, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[i] = el)}
              className={`w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 transition-all ${
                isInvalid ? "border-red-500" : "border-gray-300"
              } focus:border-yellow-400 focus:outline-none`}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </Row>

        {/* Invalid Message */}
        {isInvalid && (
          <Text type="danger" className="block text-center mb-4">
            Invalid Code!
          </Text>
        )}

        {/* Submit Button */}
        <Button
          type="primary"
          block
          size="large"
          className="h-12 rounded-lg mb-3"
          style={{ background: "#ffff00", borderColor: "#ffff00", color: "#1e1e1e" }}
          onClick={handleSubmit}
        >
          Verify Code
        </Button>

        {/* Resend Button */}
        <Button
          type="default"
          block
          size="large"
          className="h-12 rounded-lg border-gray-300 text-gray-600 hover:border-gray-400"
          icon={<ReloadOutlined />}
          disabled={countdown > 0 || isResending}
          onClick={handleResend}
        >
          {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
        </Button>
      </Card>
    </div>
  );
};

export default VerifyIdentity;