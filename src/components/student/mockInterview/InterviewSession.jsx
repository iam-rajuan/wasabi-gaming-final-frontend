import { useState, useEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, Layout, Row, Typography, Alert } from "antd";

const { Content } = Layout;
const { Text, Title } = Typography;

// Mock interview data
const INTERVIEW_DATA = {
  currentQuestion: {
    prompt: "Tell me about a time you had a disagreement or conflict with a coworker or team member regarding a project or task. What was the nature of the conflict, how did you approach the situation, and what was the ultimate resolution? What did you learn from that experience?",
    totalTime: 120, // 2 minutes total
  },
  conversation: [
    {
      speaker: "ai",
      text: "Tell me about a time when you had to work under pressure. How did you handle it, and what was the result?",
      timestamp: "0:55"
    },
    {
      speaker: "user",
      text: "There was a situation during my university group project where our deadline was moved up unexpectedly. I organized quick daily check-ins with my team, reassigned a few tasks based on everyone's strengths, and created a progress tracker to keep us aligned. By improving communication, we completed the project on time and even received positive feedback from our professor.",
      timestamp: "2:45"
    }
  ]
};

export default function InterviewSession({ interview, onFinish, onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [transcript, setTranscript] = useState("");
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const conversationEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [INTERVIEW_DATA.conversation, transcript]);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      if (isRecording) {
        handleStopRecording();
      }
      return;
    }

    if (timeRemaining <= 10 && !showTimeWarning) {
      setShowTimeWarning(true);
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isRecording]);

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // Simulate speech-to-text processing
        simulateSpeechToText();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setCurrentStep(2); // Move to speaking step
    } catch (error) {
      console.error("Error starting recording:", error);
      // Fallback to simulated response
      simulateSpeechToText();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setCurrentStep(3); // Move to review step
  };

  const simulateSpeechToText = () => {
    // Simulated transcript that matches your design
    const simulatedTranscript = "These were a situation during my university group project where our deadline was moved to unexpectedly. I organised quick daily check-ins with my team, reassigned a few tasks based on everyone's strengths, and created a progress made in keeping aligned. By improving communication, we completed the project on time and even received positive feedback from our professor.";
    setTranscript(simulatedTranscript);
    setUserAnswer(simulatedTranscript);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      Alert.warning("Please provide an answer before submitting.");
      return;
    }

    // Add user's answer to conversation
    const newConversation = [
      ...INTERVIEW_DATA.conversation,
      {
        speaker: "user",
        text: userAnswer,
        timestamp: "2:45"
      }
    ];
    INTERVIEW_DATA.conversation = newConversation;

    // Simulate AI response after submission
    setTimeout(() => {
      const updatedConversation = [
        ...newConversation,
        {
          speaker: "ai",
          text: "That's a great example. Now, tell me about a time when you had to persuade a team to adopt your idea.",
          timestamp: "1:30"
        }
      ];
      INTERVIEW_DATA.conversation = updatedConversation;
      
      // Reset for next question
      setTimeRemaining(20);
      setShowTimeWarning(false);
      setTranscript("");
      setUserAnswer("");
      setCurrentStep(1);
    }, 2000);
  };

  const handleFinishInterview = () => {
    const results = {
      interview: interview.type,
      questionsAnswered: INTERVIEW_DATA.conversation.filter(msg => msg.speaker === 'ai').length,
      completionRate: 100,
      grade: "B+",
      answers: INTERVIEW_DATA.conversation.filter(msg => msg.speaker === 'user').map(msg => msg.text),
      timestamp: new Date().toISOString(),
      aiFeedback: [
        { type: "positive", text: "Good use of specific examples from university projects" },
        { type: "improvement", text: "Try to structure answers more clearly using the STAR method" }
      ]
    };
    onFinish(results);
  };

  const handleSkipQuestion = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      setCurrentStep(3);
      // Simulate moving to next question
      setTimeout(() => {
        const newConversation = [
          ...INTERVIEW_DATA.conversation,
          {
            speaker: "ai",
            text: "Let's move to the next question. Describe a situation where you faced a conflict with a colleague.",
            timestamp: "1:15"
          }
        ];
        INTERVIEW_DATA.conversation = newConversation;
        setTimeRemaining(20);
        setShowTimeWarning(false);
        setTranscript("");
        setUserAnswer("");
        setCurrentStep(1);
      }, 2000);
    }
  };

  // Render step indicators
  const renderStepIndicators = () => {
    const steps = ["Preparation Time", "Speaking", "Review Answer"];
    return (
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Text strong style={{ fontSize: "16px", color: "#1e1e1e" }}>
          {steps[currentStep - 1]}
        </Text>
      </div>
    );
  };

  return (
    <Layout style={{ background: "white", minHeight: "100vh" }}>
      <div className="px-4 md:px-8 lg:px-16">

      <Content style={{ padding: "20px 0px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <Title level={1} style={{ color: "#1e1e1e", marginBottom: "8px", fontSize: "24px" }}>
            Mock Interview Simulation
          </Title>
          <Text style={{ color: "#495565", fontSize: "16px", display: "block" }}>
            {INTERVIEW_DATA.currentQuestion.prompt}
          </Text>
        </div>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* Left Column - Conversation */}
          <Col xs={24} lg={16}>
            <Card style={{ 
              background: "#020202", 
              borderRadius: "8px",
              border: "none",
              height: "500px",
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Conversation Header */}
              <Card
                style={{
                  background: "#282828",
                  borderRadius: "8px",
                  margin: "0 0 16px 0",
                  border: "none",
                  flexShrink: 0
                }}
                bodyStyle={{ padding: "12px 16px" }}
              >
                <Text style={{ color: "white", fontSize: "14px" }}>
                  Interview in Progress
                </Text>
              </Card>

              {/* Scrollable Conversation Area */}
              <div style={{ 
                flex: 1,
                overflowY: "auto",
                padding: "0 16px",
                maxHeight: "350px"
              }}>
                {INTERVIEW_DATA.conversation.map((message, index) => (
                  <Card
                    key={index}
                    style={{
                      background: "#3d3d3d",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      border: "none"
                    }}
                    bodyStyle={{ padding: "16px" }}
                  >
                    <Row align="middle" style={{ marginBottom: "8px" }}>
                      <Col>
                        <div style={{
                          background: "#484848",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <Text style={{ 
                            color: "white", 
                            fontSize: "14px",
                            fontWeight: "bold"
                          }}>
                            {message.speaker === "ai" ? "AI" : "U"}
                          </Text>
                        </div>
                      </Col>
                      <Col flex="auto" style={{ paddingLeft: "12px", minWidth: 0 }}>
                        <Text style={{ 
                          color: "#bababa", 
                          fontSize: "14px", 
                          fontWeight: "500",
                          wordBreak: "break-word"
                        }}>
                          {message.speaker === "ai" ? "AI Aspiring" : "User"}
                        </Text>
                      </Col>
                      <Col style={{ flexShrink: 0 }}>
                        <Text style={{ color: "white", fontSize: "12px" }}>
                          {message.timestamp}
                        </Text>
                      </Col>
                    </Row>
                    <Text style={{ 
                      color: "#bababa", 
                      fontSize: "14px", 
                      lineHeight: "1.5",
                      display: "block",
                      wordBreak: "break-word"
                    }}>
                      {message.speaker === "ai" && (
                        <span style={{ color: "#FFFF00", marginRight: "8px" }}>
                          ({Math.ceil((index + 1) / 2)})
                        </span>
                      )}
                      {message.text}
                    </Text>
                  </Card>
                ))}

                {/* Current recording transcript */}
                {transcript && (
                  <Card
                    style={{
                      background: "#3d3d3d",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      border: "2px solid #FFFF00"
                    }}
                    bodyStyle={{ padding: "16px" }}
                  >
                    <Row align="middle" style={{ marginBottom: "8px" }}>
                      <Col>
                        <div style={{
                          background: "#484848",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <Text style={{ 
                            color: "white", 
                            fontSize: "14px",
                            fontWeight: "bold"
                          }}>
                            U
                          </Text>
                        </div>
                      </Col>
                      <Col flex="auto" style={{ paddingLeft: "12px", minWidth: 0 }}>
                        <Text style={{ 
                          color: "#FFFF00", 
                          fontSize: "14px", 
                          fontWeight: "500",
                          wordBreak: "break-word"
                        }}>
                          User (Live)
                        </Text>
                      </Col>
                      <Col style={{ flexShrink: 0 }}>
                        <Text style={{ color: "#FFFF00", fontSize: "12px" }}>
                          Now
                        </Text>
                      </Col>
                    </Row>
                    <Text style={{ 
                      color: "#FFFF00", 
                      fontSize: "14px", 
                      lineHeight: "1.5",
                      fontStyle: "italic",
                      wordBreak: "break-word"
                    }}>
                      [{transcript}]
                    </Text>
                  </Card>
                )}
                <div ref={conversationEndRef} />
              </div>

              {/* Voice Visualization Area */}
              <div style={{ 
                textAlign: "center", 
                padding: "20px 16px",
                borderTop: "1px solid #333",
                flexShrink: 0
              }}>
                {/* Voice visualization bars */}
                <div style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "6px",
                  height: "60px"
                }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                    <div
                      key={bar}
                      style={{
                        width: "6px",
                        height: isRecording ? `${Math.random() * 40 + 10}px` : "8px",
                        background: isRecording ? "#FFFF00" : "#3d3d3d",
                        borderRadius: "3px",
                        transition: "height 0.2s ease, background 0.3s ease"
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Column - Timer and Controls */}
          <Col xs={24} lg={8}>
            <Card
              style={{
                background: "#f0f0f0",
                borderRadius: "8px",
                textAlign: "center",
                border: "none",
                height: "500px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Timer Visualization */}
              <div style={{ 
                position: "relative", 
                height: "180px", 
                marginBottom: "20px",
                flexShrink: 0
              }}>
                {/* Circular Timer */}
                <div style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: `conic-gradient(#FFFF00 ${(20 - timeRemaining) * 18}deg, #e0e0e0 0deg)`,
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}>
                  <div style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}>
                    <Text style={{ 
                      fontSize: "24px", 
                      fontWeight: "bold", 
                      color: "#1e1e1e",
                      fontFamily: "monospace"
                    }}>
                      {timeRemaining}s
                    </Text>
                    <Text style={{ fontSize: "12px", color: "#666" }}>
                      Time Left
                    </Text>
                  </div>
                </div>
              </div>

              {/* Step Indicators */}
              {renderStepIndicators()}

              {/* Time Warning */}
              {showTimeWarning && (
                <Card
                  style={{
                    background: "#ffe5e5",
                    borderRadius: "8px",
                    margin: "16px 0",
                    border: "none"
                  }}
                  bodyStyle={{ padding: "12px" }}
                >
                  <Row align="middle" justify="space-between">
                    <Text style={{ color: "#bc0000", fontSize: "12px", flex: 1 }}>
                      You have {timeRemaining}s left before the interview ended
                    </Text>
                    <Button
                      type="text"
                      icon={<CloseOutlined style={{ color: "#bc0000" }} />}
                      onClick={() => setShowTimeWarning(false)}
                      size="small"
                    />
                  </Row>
                </Card>
              )}

              {/* Answer Input for Manual Entry */}
              {(currentStep === 2 || currentStep === 3) && (
                <div style={{ margin: "16px 0", flexShrink: 0 }}>
                  <Text strong style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                    Your Answer:
                  </Text>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here or use voice recording..."
                    style={{
                      width: "100%",
                      height: "80px",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #d9d9d9",
                      fontSize: "14px",
                      resize: "vertical"
                    }}
                  />
                </div>
              )}

              {/* Recording Controls */}
              <div style={{ marginTop: "auto", flexShrink: 0 }}>
                {currentStep === 1 && !isRecording && (
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      background: "#FFFF00",
                      borderColor: "#FFFF00",
                      color: "#1e1e1e",
                      borderRadius: "14px",
                      width: "100%",
                      height: "45px",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                    onClick={startRecording}
                  >
                    🎤 Start Speaking
                  </Button>
                )}

                {currentStep === 2 && isRecording && (
                  <Button
                    type="primary"
                    danger
                    size="large"
                    style={{
                      background: "#ff4444",
                      borderColor: "#ff4444",
                      borderRadius: "14px",
                      width: "100%",
                      height: "45px",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                    onClick={handleStopRecording}
                  >
                    ⏹️ Stop Recording
                  </Button>
                )}

                {(currentStep === 2 || currentStep === 3) && (
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      background: "#22c55e",
                      borderColor: "#22c55e",
                      borderRadius: "14px",
                      width: "100%",
                      height: "45px",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginTop: "8px"
                    }}
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim()}
                  >
                    ✓ Submit Answer
                  </Button>
                )}

                <Button
                  type="default"
                  size="large"
                  style={{
                    background: "transparent",
                    border: "1px solid #d9d9d9",
                    borderRadius: "14px",
                    width: "100%",
                    height: "40px",
                    marginTop: "8px",
                    fontSize: "14px"
                  }}
                  onClick={handleSkipQuestion}
                >
                  Skip Question
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Bottom Actions */}
        <Row justify="center" style={{ marginTop: "32px" }}>
          <Col xs={24} sm={12} md={8} lg={6} style={{ padding: "0 8px" }}>
            <Button
              type="primary"
              size="large"
              style={{
                background: "#ffff00",
                color: "#1e1e1e",
                borderRadius: "14px",
                width: "100%",
                height: "45px",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "8px"
              }}
              onClick={handleFinishInterview}
            >
              Finish Interview
            </Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} style={{ padding: "0 8px" }}>
            <Button
              type="default"
              size="large"
              style={{
                background: "#fef9c2",
                border: "1px solid #ffff00",
                color: "#1e1e1e",
                borderRadius: "14px",
                width: "100%",
                height: "45px",
                fontSize: "16px",
                fontWeight: "600"
              }}
              onClick={onBack}
            >
              Back to Dashboard
            </Button>
          </Col>
        </Row>
      </Content>
      </div>
    </Layout>
  );
}