import React, { useState } from "react";
import { Modal, Row, Col, Typography, Button, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export const SubscriptionPlanModal = ({ visible, onClose, onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (planType) => {
    if (onSelectPlan) {
      onSelectPlan(planType);
    }
    onClose();
  };

  const premiumPrice = isYearly ? "£150" : "£15";
  const premiumPeriod = isYearly ? "/year" : "/month";

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: "20px",
            color: "#1e1e1e",
          }}
        />
      }
      styles={{
        content: {
          background: "transparent",
          padding: 0,
          borderRadius: "30px",
          boxShadow: "none",
        },
        body: {
          padding: "40px 24px",
          background:
            "linear-gradient(180deg, rgba(254,230,77,1) 0%, rgba(255,255,212,1) 100%)",
          borderRadius: "30px",
        },
      }}
    >
      {/* Header */}
      <Row justify="center" style={{ marginBottom: 40 }}>
        <Col span={24}>
          <Title
            level={1}
            style={{
              color: "#1c283c",
              textAlign: "center",
              fontSize: "clamp(24px, 3vw, 32px)",
              marginBottom: 12,
              fontWeight: "bold",
            }}
          >
            Unlock Your Legal Future With The Aspiring Legal Network
          </Title>
          <Paragraph
            style={{
              color: "#45556c",
              textAlign: "center",
              fontSize: "clamp(16px, 2vw, 20px)",
              margin: 0,
            }}
          >
            Smart tools and support for aspiring solicitors and apprentices
          </Paragraph>
        </Col>
      </Row>

      {/* Toggle Switch */}
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col>
          <div
            style={{
              backgroundColor: "#fce037",
              borderRadius: "50px",
              padding: "2px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  padding: "13px 30px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: isYearly ? "#1c283c" : "#1c283c",
                  backgroundColor: isYearly ? "transparent" : "white",
                  borderRadius: "50px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </div>
              <div
                style={{
                  padding: "13px 30px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: isYearly ? "#1c283c" : "#1c283c",
                  backgroundColor: isYearly ? "white" : "transparent",
                  borderRadius: "50px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onClick={() => setIsYearly(true)}
              >
                Yearly
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Save Note */}
      {/* <Row justify="center" style={{ marginBottom: 40 }}>
        <Col>
          <Text
            style={{
              color: "#1a1a1a",
              fontSize: "16px",
              textAlign: "center",
              display: "block",
            }}
          >
            Save 2 months when you choose yearly membership
          </Text>
        </Col>
      </Row> */}

      {/* Plans */}
      <Row justify="center" gutter={[20, 24]} align="center">
        {/* Free Plan */}
        <Col xs={24} md={7}>
          <Card
            style={{
              height: "auto",
              borderRadius: "16px",
              border: "1px solid #ffff00",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: "20px", display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Row justify="center" style={{ marginBottom: 12 }}>
              <Title
                level={2}
                style={{ textAlign: "center", margin: 0, fontWeight: "bold", fontSize: "20px" }}
              >
                Free Plan
              </Title>
            </Row>
            <Row justify="center" style={{ marginBottom: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#45556c",
                  fontSize: "15px",
                }}
              >
                Perfect for getting started on your legal journey
              </Text>
            </Row>

            <div className="flex flex-col gap-2" style={{ marginBottom: 20, flex: 1 }}>
              {[
                "Community Access",
                "Access to All Legal Opportunities",
                "Limited Law Firm Profile Opportunities",
                "Application Tracker",
                "CV Builder (1 use every 24 hours)",
                "Mock Interview (1 practice every 24 hours)",
                "Learning Resources",
              ].map((feature, index) => (
                <Row
                  key={index}
                  gutter={8}
                  style={{ marginBottom: 6, alignItems: "flex-start" }}
                >
                  <Col flex="auto">
                    <Text
                      className="flex items-center gap-2"
                      style={{ color: "#45556c", fontSize: "15px", }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                          fill="#008236"
                        />
                      </svg>
                      {feature}
                    </Text>
                  </Col>
                </Row>
              ))}
            </div>

            <Row justify="center">
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#fed822",
                  borderColor: "#fed822",
                  color: "#1e1e1e",
                  fontWeight: "600",
                  borderRadius: "20px",
                  width: "100%",
                  height: "44px",
                  fontSize: "15px",
                }}
                onClick={() => handlePlanSelect("free")}
              >
                Get Started
              </Button>
            </Row>
          </Card>
        </Col>

        {/* Premium Plan - Highlighted and Larger */}
        <Col xs={24} md={10}>
          <div
            style={{
              border: "2px solid #fce035",
              background:
                "linear-gradient(180deg, rgba(252,223,50,1) 0%, rgba(255,255,255,1) 100%)",
              padding: "28px",
              borderRadius: "18px",
              height: "auto",
              boxShadow: "0 10px 28px rgba(252, 223, 50, 0.35)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Row justify="center" style={{ marginBottom: 18 }}>
              <Title
                level={1}
                style={{
                  textAlign: "center",
                  margin: 0,
                  color: "#1c283c",
                  fontWeight: "bold",
                  fontSize: "28px",
                }}
              >
                Premium Plan
              </Title>
            </Row>

            <Row justify="center" style={{ marginBottom: 10 }}>
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "52px",
                    fontWeight: "bold",
                    color: "#1a1a1a",
                  }}
                >
                  {premiumPrice}
                </span>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#1c283c",
                  }}
                >
                  {premiumPeriod}
                </span>
              </div>
            </Row>

            <Row justify="center" style={{ marginBottom: 24 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#45556c",
                  fontSize: "16px",
                }}
              >
                Everything you need to land your dream legal role
              </Text>
            </Row>

            <div className="flex flex-col gap-1" style={{ marginBottom: 24, flex: 1 }}>
              {[
                "Unlimited AI CV & Cover Letter Builder",
                "Access to All Law Firm Profiles",
                "Educational Video Courses",
                "Mock Interviews with Instant AI Feedback (Behavioural, Situational, Technical, and Motivational)",
              ].map((feature, index) => (
                <Row
                  key={index}
                  gutter={8}
                  style={{ marginBottom: 10, alignItems: "flex-start" }}
                >
                  <Col flex="auto">
                    <Text
                      className="flex items-start justify-start gap-2"
                      style={{ color: "#45556c", fontSize: "14px", lineHeight: "1.5" }}
                    >
                      <div style={{ marginTop: "2px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                            fill="#008236"
                          />
                        </svg>
                      </div>
                      {feature}
                    </Text>
                  </Col>
                </Row>
              ))}
              
              {/* Assessment Centre Suite */}
              <Row style={{ marginTop: 10, marginBottom: 5 }}>
                <Col span={24}>
                  <Text style={{ color: "#1c283c", fontSize: "15px", fontWeight: "600" }}>
                    Assessment Centre Suite:
                  </Text>
                </Col>
              </Row>
              {[
                "Written Case Study Exercise",
                "In-Tray Email Exercise",
                "Case Law Summary Exercise",
                "Written Presentation Exercise",
              ].map((feature, index) => (
                <Row
                  key={`assessment-${index}`}
                  gutter={8}
                  style={{ marginBottom: 10, alignItems: "flex-start", paddingLeft: "16px" }}
                >
                  <Col flex="auto">
                    <Text
                      className="flex items-start justify-start gap-2"
                      style={{ color: "#45556c", fontSize: "14px", lineHeight: "1.5" }}
                    >
                      <div style={{ marginTop: "2px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                            fill="#008236"
                          />
                        </svg>
                      </div>
                      {feature}
                    </Text>
                  </Col>
                </Row>
              ))}

              {/* Test Suite */}
              <Row style={{ marginTop: 10, marginBottom: 5 }}>
                <Col span={24}>
                  <Text style={{ color: "#1c283c", fontSize: "15px", fontWeight: "600" }}>
                    Test Suite:
                  </Text>
                </Col>
              </Row>
              {[
                "Watson Glaser Test",
                "Situational Judgement Test",
                "Verbal Reasoning Test",
                "Abstract Reasoning Test",
                "Numerical Reasoning Test",
              ].map((feature, index) => (
                <Row
                  key={`test-${index}`}
                  gutter={8}
                  style={{ marginBottom: 10, alignItems: "flex-start", paddingLeft: "16px" }}
                >
                  <Col flex="auto">
                    <Text
                      className="flex items-start justify-start gap-2"
                      style={{ color: "#45556c", fontSize: "14px", lineHeight: "1.5" }}
                    >
                      <div style={{ marginTop: "2px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                            fill="#008236"
                          />
                        </svg>
                      </div>
                      {feature}
                    </Text>
                  </Col>
                </Row>
              ))}
            </div>

            <Row justify="center">
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#fed822",
                  borderColor: "#fed822",
                  color: "#1e1e1e",
                  fontWeight: "600",
                  borderRadius: "20px",
                  width: "100%",
                  height: "48px",
                  fontSize: "16px",
                }}
                onClick={() => handlePlanSelect("premium")}
              >
                Free 24 hours trial
              </Button>
            </Row>
          </div>
        </Col>

        {/* Schools Plan */}
        <Col xs={24} md={6}>
          <Card
            style={{
              height: "auto",
              borderRadius: "16px",
              border: "1px solid #ffff00",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transform: "scale(0.95)",
            }}
            bodyStyle={{ padding: "20px", display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Row justify="center" style={{ marginBottom: 12 }}>
              <Title
                level={2}
                style={{ textAlign: "center", margin: 0, fontWeight: "bold", fontSize: "20px" }}
              >
                Schools Plan
              </Title>
            </Row>
            <Row justify="center" style={{ marginBottom: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#45556c",
                  fontSize: "15px",
                }}
              >
                Empower your students with The Aspiring Legal Network
              </Text>
            </Row>

            <div className="flex flex-col gap-1" style={{ marginBottom: 20, flex: 1 }}>
              {[
                "Everything in the premium plan",
                "School dashboard access",
                "Cohort Management & Analytics",
                "Student Progress Tracking",
                "Executive School Events",
                "Dedicated Human Support",
                "Learning Resources",
              ].map((feature, index) => (
                <Row
                  key={index}
                  gutter={8}
                  style={{ marginBottom: 6, alignItems: "flex-start" }}
                >
                  <Col flex="auto">
                    <Text
                      className="flex items-start justify-start gap-2"
                      style={{ color: "#45556c", fontSize: "15px" }}
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                            fill="#008236"
                          />
                        </svg>
                      </div>
                      {feature}
                    </Text>
                  </Col>
                </Row>
              ))}
            </div>

            <Row justify="center">
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#fed822",
                  borderColor: "#fed822",
                  color: "#1e1e1e",
                  fontWeight: "600",
                  borderRadius: "20px",
                  width: "100%",
                  height: "44px",
                  fontSize: "15px",
                }}
                onClick={() => handlePlanSelect("schools")}
              >
                Contact Us
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};
