import { Button, Card, Input } from "antd";
import { useState } from "react";
import { UploadOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export function InvitationContent({ activeTab = "single" }) {
  const [copied, setCopied] = useState(false);
  const [singleForm, setSingleForm] = useState({
    studentName: "",
    email: "",
    message: "",
  });
  const [bulkForm, setBulkForm] = useState({
    csvFile: null,
    emails: "",
  });

  const handleCopyLink = () => {
    const link = "https://aspiringlegalnetwork.com/join/school-xyz-2024";
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentInvitations = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", time: "2 hours ago", status: "Accepted" },
    { id: 2, name: "Michael Chen", email: "michael.c@email.com", time: "5 hours ago", status: "Pending" },
    { id: 3, name: "Emma Williams", email: "emma.w@email.com", time: "1 day ago", status: "Accepted" },
    { id: 4, name: "James Brown", email: "james.b@email.com", time: "2 days ago", status: "Pending" },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Invitation Form Section */}
      <div>
        {activeTab === "single" ? (
          <Card className="p-8 bg-white border border-gray-200">
            <h3 className="text-xl font-semibold mb-6">Single Invitation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Student Name *</label>
                <Input
                  placeholder="Enter student name"
                  value={singleForm.studentName}
                  onChange={(e) => setSingleForm({ ...singleForm, studentName: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input
                  type="email"
                  placeholder="student@email.com"
                  value={singleForm.email}
                  onChange={(e) => setSingleForm({ ...singleForm, email: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Personal Message (Optional)</label>
                <TextArea
                  placeholder="Add a welcome message..."
                  value={singleForm.message}
                  onChange={(e) => setSingleForm({ ...singleForm, message: e.target.value })}
                  className="w-full min-h-24"
                  rows={4}
                />
              </div>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 h-auto border-none">
                Send Invitation
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 bg-white border border-gray-200">
            <h3 className="text-xl font-semibold mb-6">Bulk Invitation</h3>
            <div className="space-y-6">
              {/* CSV Upload */}
              <div>
                <label className="block text-sm font-medium mb-3">Upload CSV File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors cursor-pointer">
                  <UploadOutlined className="w-8 h-8 mx-auto mb-2 text-gray-500 text-2xl" />
                  <p className="text-sm font-medium">Drop your CSV file here or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">File should include: Name, Email</p>
                  <input type="file" accept=".csv" className="hidden" />
                </div>
                <Button className="w-full mt-3 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50">
                  Download Template
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or paste emails (one per line)</span>
                </div>
              </div>

              {/* Email Paste */}
              <div>
                <TextArea
                  placeholder="student1@email.com&#10;student2@email.com&#10;student3@email.com"
                  value={bulkForm.emails}
                  onChange={(e) => setBulkForm({ ...bulkForm, emails: e.target.value })}
                  className="w-full min-h-32"
                  rows={6}
                />
              </div>

              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 h-auto border-none">
                Send Bulk Invitations
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Share Invitation Link Section */}
      <Card className="p-8 bg-white border border-gray-200">
        <h3 className="text-xl font-semibold mb-2">Share Invitation Link</h3>
        <p className="text-sm text-gray-500 mb-6">
          Generate a unique link that students can use to join your program
        </p>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value="https://aspiringlegalnetwork.com/join/school-xyz-2024" 
              readOnly 
              className="flex-1 bg-gray-100"
            />
            <Button
              onClick={handleCopyLink}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 border-none"
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-gray-500">Students Joined</p>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold">48</p>
              <p className="text-xs text-gray-500">Link Clicks</p>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold">50%</p>
              <p className="text-xs text-gray-500">Conversion Rate</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Invitations Section */}
      <Card className="p-8 bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Recent Invitations</h3>
          <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">671</span>
        </div>

        <div className="space-y-3">
          {recentInvitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border border-dashed border-blue-300"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-sm">
                  {invitation.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{invitation.name}</p>
                  <p className="text-xs text-gray-500">{invitation.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xs text-gray-500">{invitation.time}</p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded ${
                    invitation.status === "Accepted" ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {invitation.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* CTA Section */}
      <div className="bg-yellow-400 rounded-lg p-8 text-center">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-yellow-400 text-lg">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">Start Building Your Student Network</h3>
        <p className="text-black text-sm">Invite students now and help them succeed in their career journey</p>
      </div>
    </div>
  );
}