import {
  CheckCircleOutlined,
  CloseOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

export default function Results({ sessionData, interview, onPracticeAgain }) {
  if (!sessionData) return null;

  // Dynamic data from session
  const aiFeedback = sessionData.aiFeedback || [
    { type: "positive", text: "Great use of specific examples and metrics in your answers" },
    { type: "positive", text: "Your answers followed the STAR method effectively" },
    { type: "improvement", text: "Try to be more concise - aim for 1-2 minute responses" },
    { type: "improvement", text: "Consider adding more details about collaboration" },
  ];

  const successTips = [
    {
      title: "Use the STAR Method",
      desc: "Structure your answers with Situation, Task, Action, Result",
    },
    {
      title: "Be Specific",
      desc: "Use concrete examples and quantify your achievements",
    },
    {
      title: "Practice Out Loud",
      desc: "Speaking your answers helps build confidence and fluency",
    },
    {
      title: "Time Management",
      desc: "Keep answers concise, aim for 1-2 minutes per response",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card
        className="relative"
        bordered={true}
        style={{ 
          width: "100%", 
          maxWidth: 771, 
          borderRadius: "16px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}
        bodyStyle={{ padding: "32px" }}
      >
        {/* Close Button */}
        <div style={{ position: "absolute", top: 17, right: 25 }}>
          <CloseOutlined
            style={{ fontSize: "16px", color: "#1e1e1e", opacity: 0.7, cursor: "pointer" }}
            // onClick={() => window.history.back()}
            onClick={onPracticeAgain}
          />
        </div>

        {/* Header */}
        <Row style={{ marginBottom: 32 }}>
          <Col span={24}>
            <Title level={2} style={{ marginBottom: 8, fontSize: "28px", fontWeight: "700" }}>
              Interview Practice Complete! 🎉
            </Title>
            <Paragraph style={{ marginTop: 8, fontSize: "16px", color: "#666", marginBottom: 0 }}>
              Great job! Here's how you performed in this mock interview session.
            </Paragraph>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row gutter={16} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={8} style={{ marginBottom: 16 }}>
            <Card
              bordered={true}
              style={{
                borderColor: "#b8f7cf",
                background: "linear-gradient(117deg, rgba(240,253,244,1) 0%, rgba(236,253,245,1) 100%)",
                borderRadius: "20px",
                height: "100%"
              }}
              bodyStyle={{ padding: "20px", textAlign: "center" }}
            >
              <Title level={1} style={{ color: "#008235", marginBottom: 8, fontSize: "36px" }}>
                {sessionData.questionsAnswered || 2}
              </Title>
              <Text style={{ fontSize: "14px", color: "#1e1e1e" }}>Questions Answered</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8} style={{ marginBottom: 16 }}>
            <Card
              bordered={true}
              style={{
                borderColor: "#bddaff",
                background: "linear-gradient(117deg, rgba(239,246,255,1) 0%, rgba(236,254,255,1) 100%)",
                borderRadius: "20px",
                height: "100%"
              }}
              bodyStyle={{ padding: "20px", textAlign: "center" }}
            >
              <Title level={1} style={{ color: "#1447e6", marginBottom: 8, fontSize: "36px" }}>
                {sessionData.completionRate || 100}%
              </Title>
              <Text style={{ fontSize: "14px", color: "#1e1e1e" }}>Completion Rate</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8} style={{ marginBottom: 16 }}>
            <Card
              bordered={true}
              style={{
                borderColor: "#e9d4ff",
                background: "linear-gradient(117deg, rgba(250,245,255,1) 0%, rgba(253,242,248,1) 100%)",
                borderRadius: "20px",
                height: "100%"
              }}
              bodyStyle={{ padding: "20px", textAlign: "center" }}
            >
              <Title level={1} style={{ color: "#8200db", marginBottom: 8, fontSize: "36px" }}>
                {sessionData.grade || "C"}
              </Title>
              <Text style={{ fontSize: "14px", color: "#1e1e1e" }}>Overall Grade</Text>
            </Card>
          </Col>
        </Row>

        {/* AI Feedback Card */}
        <Card
          bordered={true}
          style={{
            borderColor: "#feef85",
            background: "linear-gradient(117deg, rgba(254,252,232,1) 0%, rgba(255,247,237,1) 100%)",
            borderRadius: "20px",
            marginBottom: 24,
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <Row style={{ marginBottom: 20, alignItems: "center" }}>
            <Col flex="none">
              <span style={{ fontSize: "20px", marginRight: 8 }}>✿</span>
            </Col>
            <Col flex="auto">
              <Text strong style={{ fontSize: "18px", color: "#1e1e1e" }}>
                AI Feedback & Recommendations
              </Text>
            </Col>
          </Row>
          <Row gutter={[0, 16]}>
            {aiFeedback.map((item, index) => (
              <Col span={24} key={index}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  {item.type === "positive" ? (
                    <CheckCircleOutlined style={{ 
                      fontSize: "16px", 
                      color: "#1e1e1e", 
                      marginRight: 12,
                      marginTop: 2 
                    }} />
                  ) : (
                    <CloseOutlined style={{ 
                      fontSize: "16px", 
                      color: "#1e1e1e", 
                      marginRight: 12,
                      marginTop: 2 
                    }} />
                  )}
                  <Text style={{ 
                    fontSize: "14px", 
                    color: "#1e1e1e",
                    lineHeight: "1.5"
                  }}>
                    {item.text}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Interview Success Tips Card */}
        <Card
          bordered={true}
          style={{
            borderColor: "#e9d4ff",
            background: "linear-gradient(117deg, rgba(250,245,255,1) 0%, rgba(239,246,255,1) 100%)",
            borderRadius: "20px",
            marginBottom: 32,
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <Row style={{ marginBottom: 20, alignItems: "center" }}>
            <Col flex="none">
              <span style={{ fontSize: "20px", marginRight: 8 }}>✨</span>
            </Col>
            <Col flex="auto">
              <Text strong style={{ fontSize: "18px", color: "#1e1e1e" }}>
                Interview Success Tips
              </Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {successTips.map((tip, index) => (
              <Col xs={24} sm={12} key={index} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <CheckCircleOutlined style={{ 
                    fontSize: "16px", 
                    color: "#1e1e1e", 
                    marginRight: 12,
                    marginTop: 2,
                    flexShrink: 0
                  }} />
                  <div>
                    <Text strong style={{ 
                      fontSize: "14px", 
                      color: "#1e1e1e",
                      display: "block",
                      marginBottom: 4
                    }}>
                      {tip.title}
                    </Text>
                    <Paragraph style={{ 
                      margin: 0, 
                      fontSize: "13px", 
                      color: "#666",
                      lineHeight: "1.4",
                      marginLeft: 0
                    }}>
                      {tip.desc}
                    </Paragraph>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Practice Again Button */}
        <Row justify="center">
          <Button
            type="primary"
            shape="round"
            icon={<ReloadOutlined />}
            size="large"
            onClick={onPracticeAgain}
            style={{
              backgroundColor: "#ffff00",
              borderColor: "#ffff00",
              color: "#1e1e1e",
              height: "48px",
              padding: "0 32px",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Practice Again
          </Button>
        </Row>
      </Card>
    </div>
  );
}