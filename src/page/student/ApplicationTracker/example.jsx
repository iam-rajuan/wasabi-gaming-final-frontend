import React, { useState, useMemo } from "react";
import {
  Card,
  Button,
  Badge,
  Progress,
  Row,
  Col,
  Typography,
  Tabs,
  Modal,
  Descriptions,
  Tag,
  Upload,
  message,
  Input,
} from "antd";
import {
  CalendarOutlined,
  BulbOutlined,
  PlusOutlined,
  FolderOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CloseOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  BookOutlined,
  UploadOutlined,
  FileTextOutlined as FileTextIcon,
  SearchOutlined,
} from "@ant-design/icons";




const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

// Stats Data
const statsData = [
  {
    icon: <FileTextOutlined />,
    label: "Applications Sent",
    value: "10",
    subtitle: "Great start!",
  },
  {
    icon: <CalendarOutlined />,
    label: "Interviews Scheduled",
    value: "3",
    subtitle: "You're making progress!",
  },
  {
    icon: <CheckCircleOutlined />,
    label: "Offers Received",
    value: "1",
    subtitle: "Success is near!",
  },
  {
    icon: <ClockCircleOutlined />,
    label: "Pending Responses",
    value: "5",
    subtitle: "Keep applying!",
  },
];

// Updated applicationsData - ONLY "Offer" status jobs
const applicationsData = [
  {
    id: 1,
    company: "JIES LEGAL SERVICES LIMITED",
    position: "Legal Assistant Apprentice",
    date: "Oct 1, 2025",
    status: "Offer",
    note: "Congratulations! Offer received. Review by Jan 10, 2026",
    hasNote: true,
    level: "Level 6",
    location: "South East",
    industry: "Law",
    salary: "$15,704.00 - $15,704.00 Yearly",
    startDate: "1/5/2026",
    deadline: "1/10/2026", // Future → Open
    jobId: "9040",
  },
  {
    id: 2,
    company: "Smith & Partners LLP",
    position: "Junior Associate",
    date: "Nov 15, 2025",
    status: "Offer",
    note: "Offer extended. Respond by Dec 20, 2025",
    hasNote: true,
    deadline: "12/20/2025", // Past (current date: Dec 22, 2025) → Closed
  },
  {
    id: 3,
    company: "Johnson Legal Group",
    position: "Paralegal",
    date: "Dec 10, 2025",
    status: "Offer",
    note: "Formal offer sent. Great fit!",
    hasNote: true,
    deadline: "1/5/2026", // Future → Open
  },
  {
    id: 4,
    company: "Davis Moore Attorneys",
    position: "Legal Assistant",
    date: "Sep 25, 2025",
    status: "Offer",
    note: "Offer received and accepted verbally",
    hasNote: true,
    deadline: "10/15/2025", // Past → Closed
  },
  {
    id: 5,
    company: "Carter & Wells",
    position: "Summer Clerk",
    date: "Nov 20, 2025",
    status: "Offer",
    note: "Conditional offer pending reference check",
    hasNote: true,
    deadline: "12/28/2025", // Future → Open
  },
  {
    id: 6,
    company: "Elite Law Chambers",
    position: "Intellectual Property Associate",
    date: "Dec 5, 2025",
    status: "Offer",
    note: "High-priority candidate. Fast-track offer",
    hasNote: true,
    deadline: "12/25/2025", // Past → Closed
  },
];

// Status color mapping (updated for Offer only)
const getStatusStyle = (status) => {
  switch (status) {
    case "Offer":
      return { backgroundColor: "#DCFCE7", color: "#016630" };
    default:
      return { backgroundColor: "#F3F4F6", color: "#4A5565" };
  }
};

// Helper function to check if job is closed based on deadline
const isJobClosed = (job) => {
  if (!job.deadline) return false;

  const today = new Date("2025-12-22"); // Current date as specified
  const deadline = new Date(job.deadline);

  return deadline < today;
};

// Helper function to check if job can be responded to
const canApplyToJob = (job) => {
  return !isJobClosed(job);
};

// Job Details Modal Component
const JobDetailsModal = ({ visible, onClose, job, isApplicable, onApply }) => {
  if (!job) return null;

  const isClosed = isJobClosed(job);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{
        maxWidth: "800px",
        top: 20,
      }}
      bodyStyle={{
        padding: "0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      closeIcon={<CloseOutlined className="text-gray-600" />}
    >
      <div className="bg-white">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <Title level={1} className="!text-2xl !text-[#1e1e1e] !mb-2">
                Job details
              </Title>
              <div className="flex items-center gap-4">
                <Title level={3} className="!text-xl !text-[#1e1e1e] !mb-0">
                  {job.position}
                </Title>
                <Badge
                  color={isApplicable ? "green" : "red"}
                  text={isApplicable ? "Open" : "Closed"}
                />
              </div>
              <Text className="!text-base !text-[#495565]">{job.level}</Text>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="p-6 border-b border-gray-200">
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Company" span={1}>
              {job.company}
            </Descriptions.Item>
            <Descriptions.Item label="Location" span={1}>
              <EnvironmentOutlined className="mr-1" />
              {job.location || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Industry" span={1}>
              {job.industry || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Salary" span={1}>
              <DollarOutlined className="mr-1" />
              {job.salary || "Not specified"}
            </Descriptions.Item>
          </Descriptions>
        </div>

        {/* Dates */}
        <div className="p-6 border-b border-gray-200">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div>
                <Text strong className="block !text-sm !text-[#697282]">
                  Start date
                </Text>
                <Text className="!text-base !text-[#1e1e1e]">
                  {job.startDate || "Not specified"}
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Text strong className="block !text-sm !text-[#697282]">
                  Response deadline
                </Text>
                <Text className="!text-base !text-[#1e1e1e]">
                  {job.deadline || "Not specified"}
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Text strong className="block !text-sm !text-[#697282]">
                  Job ID
                </Text>
                <Text className="!text-base !text-[#1e1e1e]">
                  {job.jobId || "N/A"}
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-3">
            <Button
              type="primary"
              size="large"
              disabled={!isApplicable}
              style={{
                backgroundColor: isApplicable ? "#ffff00" : "#f5f5f5",
                color: isApplicable ? "black" : "#d9d9d9",
                borderColor: isApplicable ? "#ffff00" : "#d9d9d9",
              }}
              className="flex-1 border-[#ffff00] font-semibold h-12"
              onClick={isApplicable ? onApply : undefined}
            >
              {isApplicable ? "Accept Offer" : "Offer Expired"}
            </Button>
            <Button
              style={{
                border: "1px solid #d9d9d9",
                color: isApplicable ? "black" : "#d9d9d9",
              }}
              size="large"
              disabled={!isApplicable}
              className="flex-1 border-[#d9d9d9] h-12"
            >
              Save
            </Button>
          </div>
          {!isApplicable && (
            <Text className="!text-sm !text-[#ff4d4f] mt-2 block">
              This offer has expired. The response deadline has passed.
            </Text>
          )}
        </div>

        {/* Job Description */}
        <div className="p-6 border-b border-gray-200">
          <Title level={3} className="!text-lg !text-[#1e1e1e] !mb-4">
            About The Job
          </Title>
          <Paragraph className="!text-base !text-[#495565] leading-6">
            Reporting directly to JLES' Legal Services Manager, you will take on
            responsibilities to manage and oversee legal hindrances to highway
            and sewer adoptions! Liaising with local authorities, clients and
            third parties' legal teams as required. Negotiating legal
            requirements with local authorities, researching alternative
            approaches, and assisting presenting these findings and solutions to
            both internal and external clients.
          </Paragraph>
        </div>

        {/* Education */}
        <div className="p-6">
          <Title level={3} className="!text-lg !text-[#1e1e1e] !mb-4">
            Education
          </Title>
          <div className="mb-6">
            <Title level={4} className="!text-base !text-[#1e1e1e] !mb-3">
              Key Responsibilities
            </Title>
            <Text className="!text-base !text-[#495565]">Unknown</Text>
          </div>
          <div>
            <Title level={4} className="!text-base !text-[#1e1e1e] !mb-3">
              Skills
            </Title>
            <div className="flex items-center gap-2 mb-2">
              <BookOutlined />
              <Text strong className="!text-base !text-[#1e1e1e]">
                BTEC/T-levels
              </Text>
            </div>
            <Text className="!text-base !text-[#495565]">
              No, we do not accept BTEC/T-levels
            </Text>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// CV Upload Modal Component (updated for accepting offer)
const CVUploadModal = ({
  visible,
  onClose,
  jobTitle = "Legal Assistant Apprentice",
  companyName = "JLES Legal Services Limited",
}) => {
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      const isDOC =
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (!isPDF && !isDOC) {
        message.error("You can only upload PDF, DOC, or DOCX files!");
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("File must be smaller than 5MB!");
        return false;
      }

      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleApply = () => {
    if (fileList.length === 0) {
      message.error("Please upload any required documents!");
      return;
    }
    message.success("Offer accepted successfully!");
    setFileList([]);
    onClose();
  };

  const handleUseBuiltResume = () => {
    message.info("Redirecting to CV Builder...");
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{
        maxWidth: "600px",
        top: 20,
      }}
      bodyStyle={{
        padding: "0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      closeIcon={<CloseOutlined className="text-gray-600" />}
    >
      <div className="bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Title level={2} className="!text-2xl !text-[#1e1e1e] !mb-0">
              Accept Your Offer
            </Title>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-b from-[#fffef0] to-white border-2 border-[#ffffb2] rounded-[20px] p-8">
            <div className="flex flex-col items-center gap-6">
              <div className="bg-[#ffff00] rounded-full p-4">
                <CheckCircleOutlined style={{ fontSize: "40px", color: "#1E1E1E" }} />
              </div>

              <div className="text-center">
                <Title level={3} className="!text-2xl !text-[#1e1e1e] !mb-2">
                  Upload Required Documents
                </Title>
                <Paragraph className="!text-sm !text-[#495565] !mb-0">
                  Upload any documents to accept the offer for {jobTitle} at {companyName}
                </Paragraph>
              </div>

              <Dragger
                {...uploadProps}
                className={`w-full border-2 border-dashed rounded-[16px] p-8 text-center transition-colors ${
                  fileList.length > 0
                    ? "border-green-500 bg-green-50"
                    : "border-[#e5e500] bg-[#fef9c2]/30"
                }`}
              >
                {fileList.length > 0 ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-green-100 rounded-full p-3">
                      <CheckCircleOutlined className="w-6 h-6 text-green-600" />
                    </div>
                    <Text strong className="!text-sm !text-[#1e1e1e]">
                      {fileList[0].name}
                    </Text>
                    <Text className="!text-xs !text-[#697282]">
                      {(fileList[0].size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <FileTextIcon className="w-10 h-10 text-[#e5e500]" />
                    <div>
                      <Text strong className="!text-sm !text-[#1e1e1e] block">
                        Drag and drop your file here
                      </Text>
                      <Text className="!text-xs !text-[#697282] block mt-1">
                        or
                      </Text>
                    </div>
                  </div>
                )}
              </Dragger>

              {fileList.length === 0 && (
                <Button
                  onClick={() => document.querySelector(".ant-upload input")?.click()}
                  className="h-10 bg-[#ffff00] hover:bg-[#e5e500] rounded-[14px] text-[#1e1e1e] font-medium"
                  style={{ backgroundColor: "#ffff00", color: "black" }}
                >
                  Choose File
                </Button>
              )}

              <Text className="!text-xs !text-[#697282]">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </Text>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button
              onClick={handleApply}
              disabled={fileList.length === 0}
              className="w-full h-10 bg-[#ffff00] hover:bg-[#e5e500] disabled:bg-gray-200 disabled:text-gray-400 rounded-[14px] text-[#1e1e1e] font-medium text-sm"
            >
              Accept Offer
            </Button>
            <Button
              onClick={handleUseBuiltResume}
              className="w-full h-10 border border-[#1e1e1e] bg-white hover:bg-gray-50 rounded-[14px] text-[#1e1e1e] font-medium text-sm"
            >
              Use Built Resume
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Main Application Tracker Component
export const ApplicationTracker = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [isCVModalVisible, setIsCVModalVisible] = useState(false);

  // Filter applications: search + tab + offer-only logic
  const filteredApplications = useMemo(() => {
    let filtered = applicationsData;

    // Search filter
    if (searchText.trim()) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(lowerSearch) ||
          app.position.toLowerCase().includes(lowerSearch)
      );
    }

    // Tab filtering
    if (activeTab === "all") {
      return filtered;
    } else if (activeTab === "open") {
      return filtered.filter((app) => !isJobClosed(app));
    } else if (activeTab === "closed") {
      return filtered.filter((app) => isJobClosed(app));
    }

    return filtered;
  }, [activeTab, searchText]);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsJobModalVisible(true);
  };

  const handleApplyClick = (job) => {
    if (canApplyToJob(job)) {
      setSelectedJob(job);
      setIsCVModalVisible(true);
    }
  };

  const handleModalApply = () => {
    setIsJobModalVisible(false);
    setIsCVModalVisible(true);
  };

  const handleCloseModals = () => {
    setIsJobModalVisible(false);
    setIsCVModalVisible(false);
    setSelectedJob(null);
  };

  const tabItems = [
    { key: "all", label: "All Offers" },
    { key: "open", label: "Open Offers" },
    { key: "closed", label: "Closed Offers" },
  ];

  return (
    <section className="w-full flex flex-col items-start gap-8 mt-8 p-4 md:p-12 pt-0">
      {/* Header with Search Bar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title level={1} className="text-2xl md:!text-4xl !text-[#1e1e1e] !mb-2">
            Explore Legal Opportunities
          </Title>
          <Paragraph className="!text-base !text-[#495565] !mb-0">
            From work experience to newly qualified roles, find your next step in
            law.
          </Paragraph>
        </div>

        {/* Search Bar */}
        <Input
          placeholder="Search offers by company or position..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-96 h-12 rounded-2xl border-2 border-transparent bg-[#FAFAFA] focus:border-[#ffff00] focus:shadow-md transition"
          allowClear
        />
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="w-full custom-tabs"
        items={tabItems}
        tabBarStyle={{ borderBottom: "1px solid #f0f0f0" }}
      />

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="w-full">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="h-full border-2 border-[#ffffb2] shadow-sm rounded-[20px] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-black text-lg"
                  style={{ backgroundColor: "#FFFF00" }}
                >
                  {stat.icon}
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <Text className="!text-sm !text-[#495565]">{stat.label}</Text>
                  <Title level={2} className="!text-3xl !text-[#1e1e1e] !my-0">
                    {stat.value}
                  </Title>
                  <Text className="!text-xs !text-[#697282] !italic">
                    {stat.subtitle}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Offers Section */}
      <div className="w-full">
        <Title level={2} className="!text-2xl !text-[#1e1e1e] !mb-6">
          Your Offers
        </Title>

        <Row gutter={[16, 16]} className="w-full">
          {filteredApplications.length === 0 ? (
            <Col span={24}>
              <div className="text-center py-12">
                <Text className="!text-lg !text-[#697282]">
                  {searchText
                    ? "No offers match your search."
                    : activeTab === "open"
                    ? "You have no open offers at the moment."
                    : activeTab === "closed"
                    ? "No closed offers."
                    : "You haven't received any offers yet."}
                </Text>
              </div>
            </Col>
          ) : (
            filteredApplications.map((app, index) => {
              const statusStyle = getStatusStyle(app.status);
              const isApplicable = canApplyToJob(app);

              return (
                <Col xs={24} sm={12} lg={8} key={app.id}>
                  <Card className="h-full border-2 rounded-[20px] hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                          >
                            <path
                              d="M11.6667 14H16.3334"
                              stroke="#4A5565"
                              strokeWidth="2.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.6667 9.33203H16.3334"
                              stroke="#4A5565"
                              strokeWidth="2.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.3334 24.5013V21.0013C16.3334 20.3825 16.0876 19.789 15.65 19.3514C15.2124 18.9138 14.6189 18.668 14.0001 18.668C13.3812 18.668 12.7878 18.9138 12.3502 19.3514C11.9126 19.789 11.6667 20.3825 11.6667 21.0013V24.5013"
                              stroke="#4A5565"
                              strokeWidth="2.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.99992 11.668H4.66659C4.04775 11.668 3.45425 11.9138 3.01667 12.3514C2.57908 12.789 2.33325 13.3825 2.33325 14.0013V22.168C2.33325 22.7868 2.57908 23.3803 3.01667 23.8179C3.45425 24.2555 4.04775 24.5013 4.66659 24.5013H23.3333C23.9521 24.5013 24.5456 24.2555 24.9832 23.8179C25.4208 23.3803 25.6666 22.7868 25.6666 22.168V10.5013C25.6666 9.88246 25.4208 9.28897 24.9832 8.85139C24.5456 8.4138 23.9521 8.16797 23.3333 8.16797H20.9999"
                              stroke="#4A5565"
                              strokeWidth="2.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 24.5V5.83333C7 5.21449 7.24583 4.621 7.68342 4.18342C8.121 3.74583 8.71449 3.5 9.33333 3.5H18.6667C19.2855 3.5 19.879 3.74583 20.3166 4.18342C20.7542 4.621 21 5.21449 21 5.83333V24.5"
                              stroke="#4A5565"
                              strokeWidth="2.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <Tag
                          style={statusStyle}
                          className="px-3 py-1 text-xs border-0"
                        >
                          {app.status}
                        </Tag>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Title level={4} className="!text-base !text-[#1e1e1e] !mb-0">
                          {app.company}
                        </Title>
                        <Text className="!text-sm !text-[#495565]">
                          {app.position}
                        </Text>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-[#697282]" />
                        <Text className="!text-sm !text-[#697282]">
                          {app.date}
                        </Text>
                      </div>

                      {app.hasNote && (
                        <div className="bg-gray-50 rounded-2xl p-3">
                          <Text className="!text-xs !text-[#495565]">
                            {app.note}
                          </Text>
                        </div>
                      )}

                      <div className="flex gap-2 pt-4 border-t border-[#f2f4f6]">
                        <Button
                          style={{ color: "black", border: "1px solid #e5e500" }}
                          className="flex-1 border border-[#e5e500] rounded-[14px] h-8 text-[#1e1e1e] font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(app);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M1.37468 8.23029C1.31912 8.08061 1.31912 7.91596 1.37468 7.76629C1.91581 6.45419 2.83435 5.33231 4.01386 4.54289C5.19336 3.75346 6.58071 3.33203 8.00001 3.33203C9.41932 3.33203 10.8067 3.75346 11.9862 4.54289C13.1657 5.33231 14.0842 6.45419 14.6253 7.76629C14.6809 7.91596 14.6809 8.08061 14.6253 8.23029C14.0842 9.54238 13.1657 10.6643 11.9862 11.4537C10.8067 12.2431 9.41932 12.6645 8.00001 12.6645C6.58071 12.6645 5.19336 12.2431 4.01386 11.4537C2.83435 10.6643 1.91581 9.54238 1.37468 8.23029Z"
                              stroke="#1E1E1E"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                              stroke="#1E1E1E"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          View Details
                        </Button>
                        {isApplicable && (
                          <Button
                            type="primary"
                            style={{ backgroundColor: "#ffff00", color: "black" }}
                            className="flex-1 !bg-[#ffff00] !hover:bg-[#e5e500] border-[#ffff00] rounded-[14px] h-8 text-[#1e1e1e] font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApplyClick(app);
                            }}
                          >
                            Accept Offer
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </div>

      {/* Career Insights Card */}
      <Card
        className="w-full border-2 border-[#ffff00] bg-gradient-to-br from-[#fefce8] to-white rounded-[20px]"
        bodyStyle={{ padding: "32px" }}
      >
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-full bg-[#ffff00] flex items-center justify-center text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 24.0013V6.66797"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 17.3333C18.8464 16.9961 17.8331 16.2942 17.112 15.3327C16.3909 14.3712 16.0007 13.2019 16 12C15.9993 13.2019 15.6091 14.3712 14.888 15.3327C14.1669 16.2942 13.1536 16.9961 12 17.3333"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.464 8.66814C23.7708 8.1368 23.9513 7.54199 23.9914 6.92974C24.0316 6.31749 23.9303 5.7042 23.6956 5.13734C23.4608 4.57047 23.0987 4.06521 22.6374 3.66065C22.1761 3.25609 21.6279 2.96307 21.0353 2.80427C20.4426 2.64546 19.8214 2.62513 19.2196 2.74483C18.6178 2.86454 18.0517 3.12108 17.5649 3.49461C17.0781 3.86813 16.6838 4.34863 16.4125 4.89893C16.1411 5.44923 16 6.05458 16 6.66814C16 6.05458 15.8589 5.44923 15.5875 4.89893C15.3162 4.34863 14.9219 3.86813 14.4351 3.49461C13.9483 3.12108 13.3822 2.86454 12.7804 2.74483C12.1786 2.62513 11.5574 2.64546 10.9647 2.80427C10.3721 2.96307 9.82387 3.25609 9.36257 3.66065C8.90127 4.06521 8.53923 4.57047 8.30444 5.13734C8.06965 5.7042 7.96842 6.31749 8.00858 6.92974C8.04873 7.54199 8.22919 8.1368 8.536 8.66814"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.9961 6.83203C24.7798 7.03355 25.5074 7.41076 26.1238 7.93511C26.7401 8.45946 27.2291 9.1172 27.5536 9.8585C27.8782 10.5998 28.0297 11.4052 27.9969 12.2138C27.9641 13.0223 27.7477 13.8128 27.3641 14.5254"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 23.9989C25.174 23.9988 26.3152 23.6114 27.2466 22.8967C28.178 22.182 28.8475 21.1799 29.1514 20.0459C29.4552 18.9119 29.3764 17.7093 28.9272 16.6247C28.4779 15.54 27.6834 14.6339 26.6667 14.0469"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.6226 23.3125C26.716 24.0355 26.6603 24.7699 26.4587 25.4705C26.2572 26.1711 25.9142 26.823 25.4509 27.3858C24.9876 27.9486 24.4138 28.4105 23.765 28.7428C23.1161 29.0752 22.4061 29.2711 21.6786 29.3183C20.9511 29.3655 20.2217 29.2631 19.5354 29.0173C18.8491 28.7716 18.2204 28.3877 17.6882 27.8895C17.1561 27.3913 16.7317 26.7893 16.4413 26.1206C16.1509 25.4519 16.0007 24.7308 15.9999 24.0018C15.9991 24.7308 15.8489 25.4519 15.5585 26.1206C15.2681 26.7893 14.8438 27.3913 14.3116 27.8895C13.7794 28.3877 13.1508 28.7716 12.4644 29.0173C11.7781 29.2631 11.0487 29.3655 10.3212 29.3183C9.59375 29.2711 8.88369 29.0752 8.23487 28.7428C7.58606 28.4105 7.01228 27.9486 6.54896 27.3858C6.08564 26.823 5.74263 26.1711 5.5411 25.4705C5.33957 24.7699 5.2838 24.0355 5.37725 23.3125"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00009 23.9989C6.82609 23.9988 5.6849 23.6114 4.75351 22.8967C3.82213 22.182 3.15259 21.1799 2.84873 20.0459C2.54487 18.9119 2.62367 17.7093 3.07291 16.6247C3.52216 15.54 4.31674 14.6339 5.33343 14.0469"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00399 6.83203C7.22026 7.03355 6.49266 7.41076 5.8763 7.93511C5.25993 8.45946 4.77097 9.1172 4.44645 9.8585C4.12192 10.5998 3.97033 11.4052 4.00317 12.2138C4.03601 13.0223 4.25241 13.8128 4.63599 14.5254"
                stroke="#1E1E1E"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <Title level={3} className="!text-xl !text-[#1e1e1e] !mb-4">
              Your Career Insights
            </Title>

            <Row gutter={[24, 16]} className="mb-4">
              <Col xs={24} md={12}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Text className="!text-sm !text-[#495565]">
                      Resume Completion
                    </Text>
                    <Text strong className="!text-base !text-[#1e1e1e]">
                      85%
                    </Text>
                  </div>
                  <Progress
                    percent={85}
                    strokeColor="#ffff00"
                    trailColor="#fffe0033"
                    showInfo={false}
                    className="h-2"
                  />
                  <Text className="!text-xs !text-[#697282]">
                    Add 2 more skills to reach 100%
                  </Text>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Text className="!text-sm !text-[#495565]">
                      Psychometric Score
                    </Text>
                    <Text strong className="!text-base !text-[#1e1e1e]">
                      92/100
                    </Text>
                  </div>
                  <Progress
                    percent={92}
                    strokeColor="#ffff00"
                    trailColor="#fffe0033"
                    showInfo={false}
                    className="h-2"
                  />
                  <Text className="!text-xs !text-[#697282]">
                    Strong in abstract reasoning
                  </Text>
                </div>
              </Col>
            </Row>

            {/* Personalized Tip */}
            <Card
              className="bg-white border border-[#e5e500] rounded-[20px]"
              bodyStyle={{ padding: "17px" }}
            >
              <div className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.3333 5.83203H18.3333V10.832"
                    stroke="#1E1E1E"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3334 5.83203L11.2501 12.9154L7.08341 8.7487L1.66675 14.1654"
                    stroke="#1E1E1E"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Text className="!text-sm !text-[#1e1e1e]">
                  <strong>Personalized Tip:</strong> Based on your psychometric
                  results, you're strong in abstract reasoning — perfect for
                  analytical roles! Consider applying to more data-focused
                  positions.
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* CTA Section */}
      <div className="w-full rounded-2xl shadow-lg bg-gradient-to-b from-[#ffff00] to-[#e6e600] p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Title level={2} className="!text-2xl !text-[#1e1e1e] !mb-0">
            Ready to Take the Next Step?
          </Title>
          <Paragraph className="!text-base !text-[#1e1e1e] !mb-0">
            Track progress. Stay organized. Keep growing with Aspiring.
          </Paragraph>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Button size="large" className="h-10 bg-white hover:bg-gray-50 shadow-md rounded-[14px] text-[#1e1e1e] font-medium flex items-center">
              <PlusOutlined className="mr-2" />
              Add New Application
            </Button>
            <Button size="large" className="h-10 border border-[#1e1e1e] bg-transparent hover:bg-[#1e1e1e]/10 rounded-[14px] text-[#1e1e1e] font-medium flex items-center">
              <FolderOutlined className="mr-2" />
              View Recommended Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <JobDetailsModal
        visible={isJobModalVisible}
        onClose={handleCloseModals}
        job={selectedJob}
        isApplicable={selectedJob ? canApplyToJob(selectedJob) : false}
        onApply={handleModalApply}
      />

      <CVUploadModal
        visible={isCVModalVisible}
        onClose={handleCloseModals}
        jobTitle={selectedJob?.position}
        companyName={selectedJob?.company}
      />

      {/* Custom CSS */}
      <style jsx>{`
        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #b2b200 !important;
        }
        .custom-tabs .ant-tabs-ink-bar {
          background: #b2b200 !important;
        }
      `}</style>
    </section>
  );
};

export default ApplicationTracker;