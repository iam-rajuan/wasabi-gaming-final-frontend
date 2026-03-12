'use client';
import React, { useEffect, useMemo, useState } from "react";
import { LeftOutlined, CalendarOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row, Typography, Modal, Card, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";


const { Title, Paragraph, Text } = Typography;

type ApiEvent = {
  _id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  eventType?: string;
  thumbnail?: string;
};

type EventsApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  data: ApiEvent[];
};

type EventItem = {
  id: string;
  title: string;
  eventType: string;
  image: string;
  dateDisplay: string;
  time?: string;
  preview: string;
  description: string;
};

const FALLBACK_IMAGE = "/event1.png";

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const buildPreview = (html: string, maxLength = 160) => {
  const text = stripHtml(html || "");
  if (!text) return "No description available.";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

const formatEventDate = (dateIso: string, time?: string) => {
  if (!dateIso) return time ? `• ${time}` : "Date not available";
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) return time ? `• ${time}` : "Date not available";
  const formatted = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
  return time ? `${formatted} • ${time}` : formatted;
};

type RichTextContentProps = {
  content: string;
};

const RichTextContent: React.FC<RichTextContentProps> = ({ content }) => {
  return (
    <div
      className="rich-text-content"
      style={{
        fontFamily: "'Source Sans Pro', Helvetica, Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#000",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

type EventDetailModalProps = {
  event: EventItem | null;
  visible: boolean;
  onClose: () => void;
  onRegister: () => void;
};

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  visible,
  onClose,
  onRegister,
}) => {
  if (!event) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ maxWidth: 800, top: 20 }}
      styles={{
        body: {
          padding: 0,
          borderRadius: 8,
          overflow: "hidden",
        },
      }}
    >
      <div style={{ backgroundColor: "#fff" }}>
        {/* Header Image */}
        <div
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 300,
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 24,
          }}
        >
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.7)",
              borderRadius: 8,
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <LeftOutlined /> Back
          </Button>
        </div>

        {/* Content Section */}
        <div style={{ padding: 40, backgroundColor: "#fff" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
              <Text style={{ color: "#666", fontSize: 13, display: "block" }}>
                <CalendarOutlined style={{ marginRight: 6 }} />
                {event.dateDisplay}
              </Text>
              <Title level={3} style={{ marginTop: 12, marginBottom: 8 }}>
                {event.title}
              </Title>
              <Text style={{ fontSize: 14, color: "#666" }}>
                {event.eventType || "Event"}
              </Text>
            </div>
            <RichTextContent content={event.description} />

            <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
              <Button
                type="primary"
                size="large"
                onClick={onRegister}
                style={{
                  backgroundColor: "#ffff00",
                  borderColor: "#ffff00",
                  color: "#000",
                  borderRadius: 24,
                  height: 48,
                  padding: "0 32px",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Register for Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

type RegistrationFormState = {
  name: string;
  email: string;
  phone: string;
};

type EventRegistrationModalProps = {
  event: EventItem | null;
  visible: boolean;
  onClose: () => void;
  formState: RegistrationFormState;
  onChange: (field: keyof RegistrationFormState, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
};

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  visible,
  onClose,
  formState,
  onChange,
  onSubmit,
  isSubmitting,
}) => {
  if (!event) return null;

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: 500,
    marginBottom: 6,
  };

  const inputStyle: React.CSSProperties = {
    height: 48,
    borderRadius: 8,
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ maxWidth: 560, top: 24 }}
      styles={{
        body: {
          padding: 0,
          borderRadius: 12,
          overflow: "hidden",
        },
      }}
    >
      <div style={{ backgroundColor: "#fff" }}>
        <div
         className="bg-[#FFFF00] p-2 mt-5 rounded-tl-[8px] rounded-tr-[8px]"
        >
          <Text style={{ fontSize: 12, color: "#8c8c8c", letterSpacing: 1 }}>
            EVENT REGISTRATION
          </Text>
          <Title level={4} style={{ marginTop: 6, marginBottom: 8 }}>
            {event.title}
          </Title>
          <Text style={{ color: "#666", fontSize: 13 }}>
            <CalendarOutlined style={{ marginRight: 6 }} />
            {event.dateDisplay}
          </Text>
        </div>

        <form onSubmit={onSubmit} style={{ padding: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <Text style={labelStyle}>Full Name</Text>
              <Input
                value={formState.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="e.g. Mahabur Rahman"
                size="large"
                style={inputStyle}
                className="event-register-input"
              />
            </div>

            <div>
              <Text style={labelStyle}>Email Address</Text>
              <Input
                type="email"
                value={formState.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="e.g. mahabur24cse@gmail.com"
                size="large"
                style={inputStyle}
                className="event-register-input"
              />
            </div>

            <div>
              <Text style={labelStyle}>Phone Number</Text>
              <Input
                value={formState.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                placeholder="e.g. 01712345678"
                size="large"
                style={inputStyle}
                className="event-register-input"
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Text style={{ fontSize: 12, color: "#8c8c8c" }}>
              We will send confirmation to your email.
            </Text>
            <div style={{ display: "flex", gap: 12 }}>
              <Button className="h-[48px] " onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="h-[48px]"
                style={{
                  backgroundColor: "#ffff00",
                  borderColor: "#ffff00",
                  color: "#000",
                  borderRadius: 24,
                  fontWeight: 600,
                  padding: "0 24px",
                }}
              >
                Submit Registration
              </Button>
            </div>
          </div>
        </form>
      </div>
      <style jsx global>{`
        .event-register-input.ant-input:focus,
        .event-register-input.ant-input-focused,
        .event-register-input.ant-input:hover {
          box-shadow: none !important;
          border-color: #d9d9d9 !important;
        }
      `}</style>
    </Modal>
  );
};

type EventCardProps = {
  event: EventItem;
  onClick: (event: EventItem) => void;
};

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <Card
      hoverable
      style={{
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: "2px solid #f0f0f0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      styles={{
        body: {
          padding: 24,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Event Image */}
      <div
        style={{
          margin: "-24px -24px 20px -24px",
          height: 200,
          overflow: "hidden",
        }}
      >
        <Image
          src={event.image}
          alt={event.title}
          preview={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Event Date */}
      <Text
        style={{
          color: "#666",
          fontSize: 13,
          display: "block",
          marginBottom: 8,
        }}
      >
        <CalendarOutlined style={{ marginRight: 6 }} />
        {event.dateDisplay}
      </Text>

      {/* Event Type */}
      <div style={{ marginBottom: 12 }}>
        <span
          style={{
            backgroundColor: "#fff9e6",
            color: "#d4a017",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            border: "1px solid #ffecb3",
          }}
        >
          {event.eventType}
        </span>
      </div>

      {/* Event Title */}
      <Title
        level={4}
        style={{
          fontSize: 18,
          marginBottom: 12,
          lineHeight: 1.4,
          flex: 1,
        }}
      >
        {event.title}
      </Title>

      {/* Event Preview */}
      <Paragraph
        style={{
          fontSize: 14,
          color: "#666",
          lineHeight: 1.6,
          marginBottom: 20,
          flex: 2,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {event.preview}
      </Paragraph>

      {/* Action Button */}
      <div style={{ marginTop: "auto" }}>
        <Button
          type="default"
          style={{
            width: "100%",
            backgroundColor: "#ffff00",
            borderColor: "#ffff00",
            color: "#000",
            borderRadius: 8,
            height: 40,
            fontWeight: 600,
            fontSize: 14,
            transition: "all 0.3s ease",
          }}
          onClick={() => onClick(event)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f2f200";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ffff00";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Details →
        </Button>
      </div>
    </Card>
  );
};

const EventPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [registrationForm, setRegistrationForm] =
    useState<RegistrationFormState>({
      name: "",
      email: "",
      phone: "",
    });
  const session = useSession();
  const token = session.data?.accessToken || "";
  const islogin = session.status;
  
  const isSessionReady = session.status !== "loading";

  const { data: eventsResponse, isLoading, isError } = useQuery<EventsApiResponse>({
    queryKey: ["events", token],
    queryFn: async () => {
      const headers: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/event`, {
        method: "GET",
        headers,
      });
      if (!res.ok) throw new Error("Failed to load events");
      return res.json();
    },
    enabled: isSessionReady,
  });

  const eventsData = useMemo<EventItem[]>(() => {
    const rawEvents = eventsResponse?.data || [];
    return rawEvents.map((event) => ({
      id: event._id,
      title: event.title,
      eventType: event.eventType || "Event",
      image: event.thumbnail || FALLBACK_IMAGE,
      dateDisplay: formatEventDate(event.date, event.time),
      time: event.time,
      preview: buildPreview(event.description),
      description: event.description || "",
    }));
  }, [eventsResponse]);

  const handleEventClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenRegisterModal = () => {
    if (!selectedEvent) return;
    if (islogin === "unauthenticated") {
      toast.error("Please login and register.");
      return;
    }
    setRegistrationForm({
      name: session.data?.user?.name || "",
      email: session.data?.user?.email || "",
      phone: "",
    });
    setIsRegisterModalVisible(true);
    setIsModalVisible(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalVisible(false);
  };

  useEffect(() => {
    if (!isModalVisible && !isRegisterModalVisible) {
      setSelectedEvent(null);
    }
  }, [isModalVisible, isRegisterModalVisible]);

  const handleRegisterChange = (
    field: keyof RegistrationFormState,
    value: string
  ) => {
    setRegistrationForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (islogin === "unauthenticated") {
      toast.error("Please login and register.");
      return;
    }
    if (!selectedEvent) {
      toast.error("Please select an event to register.");
      return;
    }

    const payload = {
      name: registrationForm.name.trim(),
      email: registrationForm.email.trim(),
      phone: registrationForm.phone.trim(),
      eventId: selectedEvent.id,
    };

    if (!payload.name || !payload.email || !payload.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const toastId = toast.loading("Submitting registration...");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/event-management`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
      }

      toast.success(
        data?.message || "Registration submitted successfully.",
        { id: toastId }
      );
      setIsRegisterModalVisible(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          padding: "80px 20px",
          textAlign: "center",
          color: "#666",
        }}
      >
        Loading events...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          padding: "80px 20px",
          textAlign: "center",
          color: "#b91c1c",
        }}
      >
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingBottom: 60,
      }}
    >
      {/* Events Section */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "60px 20px 0 20px",
        }}
      >
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Title
            level={2}
            style={{
              fontSize: 36,
              color: "#1a1a1a",
              marginBottom: 16,
            }}
          >
            Past Events
          </Title>
          <Paragraph
            style={{
              fontSize: 16,
              color: "#666",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Join our curated events to learn, network, and advance your legal
            career journey.
          </Paragraph>
        </div>

        {/* Events Grid */}
        <Row gutter={[32, 32]} justify="center">
          {eventsData.length === 0 ? (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Card
                style={{
                  borderRadius: 16,
                  border: "2px solid #f0f0f0",
                  textAlign: "center",
                  padding: 24,
                }}
              >
                <Paragraph style={{ marginBottom: 0, color: "#666" }}>
                  No events available.
                </Paragraph>
              </Card>
            </Col>
          ) : (
            eventsData.map((event) => (
              <Col
                key={event.id}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                xl={8}
                xxl={8}
              >
                <EventCard event={event} onClick={handleEventClick} />
              </Col>
            ))
          )}
        </Row>
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        visible={isModalVisible}
        onClose={handleCloseModal}
        onRegister={handleOpenRegisterModal}
      />

      <EventRegistrationModal
        event={selectedEvent}
        visible={isRegisterModalVisible}
        onClose={handleCloseRegisterModal}
        formState={registrationForm}
        onChange={handleRegisterChange}
        onSubmit={handleRegisterSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EventPage;
