// "use client";

// import React, { useRef } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Download, X, Printer, Mail } from "lucide-react";
// import { toast } from "sonner";
// import { CvBuilderFormType } from "./cv-making-form";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// interface ModernCvModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cvData: CvBuilderFormType | null;
// }

// const ModernCvModal = ({ isOpen, onClose, cvData }: ModernCvModalProps) => {
//   const cvRef = useRef<HTMLDivElement>(null);

//   if (!cvData) return null;

//   const formatDateRange = (start: string, end: string) => {
//     return `${start} - ${end}`;
//   };

//   const handleDownloadPDF = async () => {
//     if (!cvRef.current) {
//       toast.error("CV content not found");
//       return;
//     }

//     try {
//       toast.loading("Generating PDF... Please wait.");

//       // Capture only the CV content, not the buttons
//       const cvElement = cvRef.current;

//       // Store original styles
//       const originalBoxShadow = cvElement.style.boxShadow;
//       const originalMarginTop = cvElement.style.marginTop;

//       // Temporarily adjust styles for better PDF output
//       cvElement.style.boxShadow = "none";
//       cvElement.style.marginTop = "0";
//       cvElement.style.padding = "40px";

//       // Clone the element to avoid affecting the visible version
//       const clonedElement = cvElement.cloneNode(true) as HTMLElement;
//       clonedElement.style.position = "fixed";
//       clonedElement.style.left = "-9999px";
//       clonedElement.style.top = "0";
//       clonedElement.style.width = "794px"; // A4 width in pixels
//       clonedElement.style.backgroundColor = "white";
//       document.body.appendChild(clonedElement);

//       // Use html2canvas with specific options to preserve layout
//       const canvas = await html2canvas(clonedElement, {
//         scale: 3, // Very high resolution for crisp text
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#ffffff",
//         width: 794, // A4 width
//         height: clonedElement.scrollHeight,
//         windowWidth: 794,
//         onclone: (clonedDoc, element) => {
//           // Ensure all text is visible
//           const allElements = element.querySelectorAll("*");
//           allElements.forEach((el) => {
//             const htmlEl = el as HTMLElement;
//             htmlEl.style.boxShadow = "none";
//           });
//         },
//       });

//       // Clean up cloned element
//       document.body.removeChild(clonedElement);

//       // Restore original styles
//       cvElement.style.boxShadow = originalBoxShadow;
//       cvElement.style.marginTop = originalMarginTop;
//       cvElement.style.padding = "";

//       // Calculate PDF dimensions (A4 format)
//       const imgWidth = 210; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       // Create PDF with proper margins
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       // Add white background
//       pdf.setFillColor(255, 255, 255);
//       pdf.rect(0, 0, 210, 297, "F");

//       // Add image to PDF with proper positioning
//       const imgData = canvas.toDataURL("image/png", 1.0);
//       pdf.addImage(imgData, "PNG", 10, 10, 190, imgHeight * (190 / imgWidth));

//       // Download PDF
//       pdf.save(`${cvData.firstName}_${cvData.lastName}_CV.pdf`);

//       toast.dismiss();
//       toast.success("PDF downloaded successfully!");
//     } catch (error) {
//       toast.dismiss();
//       console.error("Error generating PDF:", error);
//       toast.error("Failed to generate PDF. Please try again.");
//     }
//   };

//   const handleShareEmail = () => {
//     const subject = `CV - ${cvData.firstName} ${cvData.lastName}`;
//     const body = `Please find my CV attached.\n\nName: ${cvData.firstName} ${cvData.lastName}\nEmail: ${cvData.email}\nPhone: ${cvData.phone}`;
//     window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
//         {/* CV Preview Content - Only this part goes to PDF */}
//         <div
//           ref={cvRef}
//           className="cv-content p-8 bg-white rounded-lg shadow-[0_0_10px_10px_rgba(0,0,0,0.1)] mt-5"
//           style={{
//             width: "850px",
//             margin: "0 auto",
//             boxSizing: "border-box",
//           }}
//         >
//           {/* Header Section */}
//           <div className="pb-3 mb-4 text-center border-b-2 border-black/50">
//             <h1 className="text-4xl font-bold text-gray-900">
//               {cvData.firstName} {cvData.lastName}
//             </h1>
//             <h2 className="mt-2 text-xl text-gray-800">{cvData.profession}</h2>

//             <div className="flex justify-between gap-4 mt-4 text-gray-600">
//               <div className="flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 <span>{cvData.email}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone className="w-4 h-4" />
//                 <span>{cvData.phone}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-4 h-4" />
//                 <span>{cvData.location}</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             {/* Left Column */}
//             <div className="space-y-4 lg:col-span-2">
//               {/* Professional Summary */}
//               <section>
//                 <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50">
//                   Professional Summary
//                 </h3>
//                 <p className="leading-relaxed text-gray-700">
//                   {cvData.summary}
//                 </p>
//               </section>

//               {/* Work Experience */}
//               {cvData.legalWorkExperience.length > 0 && (
//                 <section>
//                   <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 ">
//                     Work Experience
//                   </h3>
//                   <div className="space-y-6">
//                     {cvData.legalWorkExperience.map((exp, index) => (
//                       <div key={index}>
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h4 className="font-semibold text-gray-900">
//                               {exp.jobTitle}
//                             </h4>
//                             <p className="text-gray-500">{exp.organization}</p>
//                           </div>
//                           <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
//                             {formatDateRange(
//                               exp.startYear,
//                               exp.endYear as string,
//                             )}
//                           </span>
//                         </div>
//                         <p className="mt-2 text-gray-700">
//                           {exp.keyResponsibilities}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* Leadership Experience */}
//               {cvData.leadership.length > 0 && (
//                 <section>
//                   <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 ">
//                     Leadership Experience
//                   </h3>
//                   <div className="space-y-6">
//                     {cvData.leadership.map((lead, index) => (
//                       <div key={index}>
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h4 className="font-semibold text-gray-900">
//                               {lead.role}
//                             </h4>
//                             <p className="text-gray-500">{lead.organization}</p>
//                           </div>
//                           <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
//                             {lead.dateYear}
//                           </span>
//                         </div>
//                         <p className="mt-2 text-gray-700">{lead.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* Education */}
//               {cvData.educationLevel.length > 0 && (
//                 <section>
//                   <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50">
//                     Education
//                   </h3>
//                   <div className="space-y-6">
//                     {cvData.educationLevel.map((edu, index) => (
//                       <div key={index}>
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h4 className="font-semibold text-gray-900">
//                               {edu.educationLevel}
//                             </h4>
//                             <p className="text-gray-500">{edu.institution}</p>
//                           </div>
//                           <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
//                             {formatDateRange(edu.startYear, edu.endYear)}
//                           </span>
//                         </div>
//                         <div className="mt-2 space-y-1">
//                           <p className="text-gray-700">
//                             <span className="font-medium">Subject:</span>{" "}
//                             {edu.subject}
//                           </p>
//                           <p className="text-gray-700">
//                             <span className="font-medium">Grade:</span>{" "}
//                             {edu.grade}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* Skills */}
//               <section>
//                 <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50">
//                   Skills
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {cvData.achievements.skills.map((skill, index) => (
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-black/80"></div>
//                       <span key={index} className="text-black/75">
//                         {skill}
//                       </span>
//                     </div>
//                   ))}
//                   {cvData.achievements.recommendedSkills.map((skill, index) => (
//                     <span
//                       key={`rec-${index}`}
//                       className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons - These won't appear in PDF */}
//         <div className="flex justify-end gap-3 mt-3">
//           <Button variant="outline" onClick={onClose}>
//             Close Preview
//           </Button>

//           <Button
//             onClick={handleDownloadPDF}
//             className="flex items-center gap-2 bg-primary"
//           >
//             <Download className="w-4 h-4" />
//             Download PDF
//           </Button>
//         </div>

//         {/* Print Styles */}
//         <style jsx global>{`
//           @media print {
//             body * {
//               visibility: hidden;
//             }
//             .cv-content,
//             .cv-content * {
//               visibility: visible;
//             }
//             .cv-content {
//               position: absolute;
//               left: 0;
//               top: 0;
//               width: 100%;
//               box-shadow: none !important;
//               margin: 0 !important;
//               padding: 20px !important;
//             }
//             button,
//             .border-t {
//               display: none !important;
//             }
//           }
//         `}</style>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // Missing icons
// const Phone = ({ className }: { className?: string }) => (
//   <svg
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//     />
//   </svg>
// );

// const MapPin = ({ className }: { className?: string }) => (
//   <svg
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//     />
//   </svg>
// );

// export default ModernCvModal;








"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CvBuilderFormType } from "./cv-making-form";

// ────────────────────────────────────────────────
// Tiny “editable” helpers (same layout, edit mode = input/textarea)
// ────────────────────────────────────────────────
function EditableText({
  value,
  onChange,
  isEditing,
  className = "",
  inputClassName = "",
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}) {
  if (!isEditing) return <span className={className}>{value}</span>;

  return (
    <input
      className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 ${inputClassName}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

function EditableTextarea({
  value,
  onChange,
  isEditing,
  className = "",
  textareaClassName = "",
  placeholder,
  minHeight = 110,
}: {
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  className?: string;
  textareaClassName?: string;
  placeholder?: string;
  minHeight?: number;
}) {
  if (!isEditing)
    return <p className={className}>{value}</p>;

  return (
    <textarea
      className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 resize-none ${textareaClassName}`}
      style={{ minHeight }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// ────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────
interface ModernCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CvBuilderFormType | null;
  // চাইলে parent এ save করতে চাইলে:
  // onSave?: (data: CvBuilderFormType) => void;
}

export default function ModernCvModal({
  isOpen,
  onClose,
  cvData,
}: ModernCvModalProps) {
  const cvRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<CvBuilderFormType | null>(null);

  // modal open/cvData change হলে draft refresh
  useEffect(() => {
    if (!cvData) {
      setDraft(null);
      setIsEditing(false);
      return;
    }
    // deep copy safe-ish (form data object)
    setDraft(JSON.parse(JSON.stringify(cvData)));
    setIsEditing(false);
  }, [cvData, isOpen]);

  const formatDateRange = (start?: string, end?: string) => {
    const s = start?.trim() || "";
    const e = end?.trim() || "";
    if (!s && !e) return "";
    if (s && !e) return s;
    if (!s && e) return e;
    return `${s} - ${e}`;
  };

  const updateField = <K extends keyof CvBuilderFormType>(
    key: K,
    value: CvBuilderFormType[K]
  ) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleCancelEdit = () => {
    if (!cvData) return;
    setDraft(JSON.parse(JSON.stringify(cvData)));
    setIsEditing(false);
    toast.message("Edits cancelled");
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    toast.success("Saved in preview (download will use updated data)");
    // চাইলে parent এ পাঠাতে:
    // if (draft) onSave?.(draft);
  };

  // ────────────────────────────────────────────────
  // PDF Download (uses draft content)
  // ────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    if (!cvRef.current || !draft) {
      toast.error("CV content not found");
      return;
    }

    try {
      toast.loading("Generating PDF...");

      const cvElement = cvRef.current;

      // clone so UI doesn’t jump
      const cloned = cvElement.cloneNode(true) as HTMLElement;
      cloned.style.position = "fixed";
      cloned.style.left = "-9999px";
      cloned.style.top = "0";
      cloned.style.width = "794px"; // A4 width px (approx)
      cloned.style.background = "white";
      cloned.style.boxShadow = "none";
      cloned.style.margin = "0";
      cloned.style.padding = "40px";

      // IMPORTANT: edit mode inputs show in pdf as inputs.
      // So force "not editing view" inside clone (hide inputs/textarea borders)
      const inputs = cloned.querySelectorAll("input, textarea");
      inputs.forEach((el) => {
        const node = el as HTMLInputElement | HTMLTextAreaElement;
        node.style.border = "none";
        node.style.outline = "none";
        node.style.boxShadow = "none";
        node.style.padding = "0";
      });

      document.body.appendChild(cloned);

      const canvas = await html2canvas(cloned, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: 794,
        height: cloned.scrollHeight,
        windowWidth: 794,
      });

      document.body.removeChild(cloned);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4: 210 x 297 mm
      const pageW = 210;
      const pageH = 297;
      const margin = 10;

      const imgData = canvas.toDataURL("image/png", 1.0);

      // scale image to fit page width with margins
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;

      let y = margin;
      let remaining = imgH;

      // If content exceeds one page, split pages
      // We draw the big image multiple times with offset (simple approach)
      let position = 0;

      while (remaining > 0) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageW, pageH, "F");

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          y,
          imgW,
          imgH,
          undefined,
          "FAST",
          0
        );

        remaining -= pageH - margin * 2;
        position += pageH - margin * 2;

        if (remaining > 0) {
          pdf.addPage();
          // move image up for next page
          y = margin - position;
        }
      }

      pdf.save(`${draft.firstName}_${draft.lastName}_CV.pdf`);

      toast.dismiss();
      toast.success("PDF downloaded!");
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error("Failed to generate PDF");
    }
  };

  if (!draft) return null;

  // safe arrays (in case undefined)
  const legalWorkExperience = draft.legalWorkExperience ?? [];
  const leadership = draft.leadership ?? [];
  const educationLevel = draft.educationLevel ?? [];
  const skills = draft.achievements?.skills ?? [];
  const recSkills = draft.achievements?.recommendedSkills ?? [];

  // ────────────────────────────────────────────────
  // Actions for array items
  // ────────────────────────────────────────────────
  const updateWorkItem = (index: number, patch: any) => {
    const updated = [...legalWorkExperience];
    updated[index] = { ...updated[index], ...patch };
    updateField("legalWorkExperience" as any, updated as any);
  };

  const addWorkItem = () => {
    const updated = [
      ...legalWorkExperience,
      {
        jobTitle: "",
        organization: "",
        startYear: "",
        endYear: "",
        keyResponsibilities: "",
      },
    ];
    updateField("legalWorkExperience" as any, updated as any);
  };

  const removeWorkItem = (index: number) => {
    const updated = legalWorkExperience.filter((_, i) => i !== index);
    updateField("legalWorkExperience" as any, updated as any);
  };

  const updateLeadershipItem = (index: number, patch: any) => {
    const updated = [...leadership];
    updated[index] = { ...updated[index], ...patch };
    updateField("leadership" as any, updated as any);
  };

  const addLeadershipItem = () => {
    const updated = [
      ...leadership,
      { role: "", organization: "", dateYear: "", description: "" },
    ];
    updateField("leadership" as any, updated as any);
  };

  const removeLeadershipItem = (index: number) => {
    const updated = leadership.filter((_, i) => i !== index);
    updateField("leadership" as any, updated as any);
  };

  const updateEducationItem = (index: number, patch: any) => {
    const updated = [...educationLevel];
    updated[index] = { ...updated[index], ...patch };
    updateField("educationLevel" as any, updated as any);
  };

  const addEducationItem = () => {
    const updated = [
      ...educationLevel,
      {
        educationLevel: "",
        institution: "",
        startYear: "",
        endYear: "",
        subject: "",
        grade: "",
      },
    ];
    updateField("educationLevel" as any, updated as any);
  };

  const removeEducationItem = (index: number) => {
    const updated = educationLevel.filter((_, i) => i !== index);
    updateField("educationLevel" as any, updated as any);
  };

  const updateSkills = (idx: number, value: string) => {
    const updated = [...skills];
    updated[idx] = value;
    updateField("achievements" as any, { ...draft.achievements, skills: updated } as any);
  };

  const addSkill = () => {
    const updated = [...skills, ""];
    updateField("achievements" as any, { ...draft.achievements, skills: updated } as any);
  };

  const removeSkill = (idx: number) => {
    const updated = skills.filter((_, i) => i !== idx);
    updateField("achievements" as any, { ...draft.achievements, skills: updated } as any);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        {/* CV Preview Content */}
        <div
          ref={cvRef}
          className="cv-content p-8 bg-white rounded-lg shadow-[0_0_10px_10px_rgba(0,0,0,0.1)] mt-5"
          style={{
            width: "850px",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <div className="pb-3 mb-4 text-center border-b-2 border-black/50">
            {/* Name */}
            <div className="flex flex-col items-center gap-3">
              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[520px]">
                  <EditableText
                    value={draft.firstName || ""}
                    onChange={(v) => updateField("firstName" as any, v as any)}
                    isEditing={true}
                    placeholder="First name"
                  />
                  <EditableText
                    value={draft.lastName || ""}
                    onChange={(v) => updateField("lastName" as any, v as any)}
                    isEditing={true}
                    placeholder="Last name"
                  />
                </div>
              ) : (
                <h1 className="text-4xl font-bold text-gray-900">
                  {draft.firstName} {draft.lastName}
                </h1>
              )}

              {/* Profession */}
              {isEditing ? (
                <div className="w-full max-w-[520px]">
                  <EditableText
                    value={draft.profession || ""}
                    onChange={(v) => updateField("profession" as any, v as any)}
                    isEditing={true}
                    placeholder="Profession"
                    inputClassName="text-center"
                  />
                </div>
              ) : (
                <h2 className="text-xl text-gray-800">{draft.profession}</h2>
              )}

              {/* Contact line */}
              <div className="w-full mt-3">
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <EditableText
                      value={draft.email || ""}
                      onChange={(v) => updateField("email" as any, v as any)}
                      isEditing={true}
                      placeholder="Email"
                    />
                    <EditableText
                      value={draft.phone || ""}
                      onChange={(v) => updateField("phone" as any, v as any)}
                      isEditing={true}
                      placeholder="Phone"
                    />
                    <EditableText
                      value={draft.location || ""}
                      onChange={(v) => updateField("location" as any, v as any)}
                      isEditing={true}
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  <div className="flex justify-between gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>{draft.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{draft.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{draft.location}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <section>
            <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50">
              Professional Summary
            </h3>

            <EditableTextarea
              value={draft.summary || ""}
              onChange={(v) => updateField("summary" as any, v as any)}
              isEditing={isEditing}
              className="leading-relaxed text-gray-700"
              placeholder="Write summary..."
              minHeight={120}
            />
          </section>

          {/* Work Experience */}
          <section className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 w-full">
                Work Experience
              </h3>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  className="ml-3 mb-4"
                  onClick={addWorkItem}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              )}
            </div>

            {legalWorkExperience.length === 0 ? (
              <p className="text-gray-500 text-sm">
                {isEditing ? "Add your first work experience." : "No work experience added."}
              </p>
            ) : (
              <div className="space-y-6">
                {legalWorkExperience.map((exp: any, index: number) => (
                  <div key={index} className="relative">
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute left-[-40px] -top-2 text-red-600"
                        onClick={() => removeWorkItem(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="w-full">
                        {isEditing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <EditableText
                              value={exp.jobTitle || ""}
                              onChange={(v) => updateWorkItem(index, { jobTitle: v })}
                              isEditing={true}
                              placeholder="Job title"
                            />
                            <EditableText
                              value={exp.organization || ""}
                              onChange={(v) => updateWorkItem(index, { organization: v })}
                              isEditing={true}
                              placeholder="Organization"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="font-semibold text-gray-900">{exp.jobTitle}</h4>
                            <p className="text-gray-500">{exp.organization}</p>
                          </>
                        )}
                      </div>

                      <span className="px-3 py-1 text-sm text-gray-500 whitespace-nowrap">
                        {formatDateRange(exp.startYear, exp.endYear)}
                      </span>
                    </div>

                    <div className="mt-2">
                      <EditableTextarea
                        value={exp.keyResponsibilities || ""}
                        onChange={(v) => updateWorkItem(index, { keyResponsibilities: v })}
                        isEditing={isEditing}
                        className="text-gray-700"
                        placeholder="Key responsibilities..."
                        minHeight={90}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Leadership */}
          <section className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 w-full">
                Leadership Experience
              </h3>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  className="ml-3 mb-4"
                  onClick={addLeadershipItem}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              )}
            </div>

            {leadership.length === 0 ? (
              <p className="text-gray-500 text-sm">
                {isEditing ? "Add leadership experience." : "No leadership experience added."}
              </p>
            ) : (
              <div className="space-y-6">
                {leadership.map((lead: any, index: number) => (
                  <div key={index} className="relative">
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute left-[-40px] top-2 text-red-600"
                        onClick={() => removeLeadershipItem(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="w-full">
                        {isEditing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <EditableText
                              value={lead.role || ""}
                              onChange={(v) => updateLeadershipItem(index, { role: v })}
                              isEditing={true}
                              placeholder="Role"
                            />
                            <EditableText
                              value={lead.organization || ""}
                              onChange={(v) =>
                                updateLeadershipItem(index, { organization: v })
                              }
                              isEditing={true}
                              placeholder="Organization"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="font-semibold text-gray-900">{lead.role}</h4>
                            <p className="text-gray-500">{lead.organization}</p>
                          </>
                        )}
                      </div>

                      <span className="px-3 py-1 text-sm text-gray-500  whitespace-nowrap">
                        {lead.dateYear || ""}
                      </span>
                    </div>

                    <div className="mt-2">
                      <EditableTextarea
                        value={lead.description || ""}
                        onChange={(v) => updateLeadershipItem(index, { description: v })}
                        isEditing={isEditing}
                        className="text-gray-700"
                        placeholder="Description..."
                        minHeight={90}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Education */}
          <section className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 w-full">
                Education
              </h3>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  className="ml-3 mb-4"
                  onClick={addEducationItem}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              )}
            </div>

            {educationLevel.length === 0 ? (
              <p className="text-gray-500 text-sm">
                {isEditing ? "Add education details." : "No education added."}
              </p>
            ) : (
              <div className="space-y-6">
                {educationLevel.map((edu: any, index: number) => (
                  <div key={index} className="relative ">
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute left-[-40px] top-2 text-red-600"
                        onClick={() => removeEducationItem(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="w-full">
                        {isEditing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <EditableText
                              value={edu.educationLevel || ""}
                              onChange={(v) =>
                                updateEducationItem(index, { educationLevel: v })
                              }
                              isEditing={true}
                              placeholder="Degree / Level"
                            />
                            <EditableText
                              value={edu.institution || ""}
                              onChange={(v) =>
                                updateEducationItem(index, { institution: v })
                              }
                              isEditing={true}
                              placeholder="Institution"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="font-semibold text-gray-900">
                              {edu.educationLevel}
                            </h4>
                            <p className="text-gray-500">{edu.institution}</p>
                          </>
                        )}

                        {/* Subject / Grade */}
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {isEditing ? (
                            <>
                              <EditableText
                                value={edu.subject || ""}
                                onChange={(v) =>
                                  updateEducationItem(index, { subject: v })
                                }
                                isEditing={true}
                                placeholder="Subject"
                              />
                              <EditableText
                                value={edu.grade || ""}
                                onChange={(v) =>
                                  updateEducationItem(index, { grade: v })
                                }
                                isEditing={true}
                                placeholder="Grade"
                              />
                            </>
                          ) : (
                            <>
                              <p className="text-gray-700">
                                <span className="font-medium">Subject:</span>{" "}
                                {edu.subject}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Grade:</span>{" "}
                                {edu.grade}
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      <span className="px-3 py-1 text-sm text-gray-500 whitespace-nowrap">
                        {formatDateRange(edu.startYear, edu.endYear)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Skills */}
          <section className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="pb-4 mb-4 text-xl font-semibold text-gray-900 border-b-2 border-gray-300/50 w-full">
                Skills
              </h3>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  className="ml-3 mb-4"
                  onClick={addSkill}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {/* Editable list for skills */}
              {skills.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  {isEditing ? "Add skills." : "No skills added."}
                </p>
              ) : (
                skills.map((s: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    {/* <div className="w-2 h-2 rounded-full bg-black/80" /> */}
                    {isEditing ? (
                      <>
                        <EditableText
                          value={s}
                          onChange={(v) => updateSkills(idx, v)}
                          isEditing={true}
                          placeholder="Skill"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => removeSkill(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <span className="text-black/75">{s}</span>
                    )}
                  </div>
                ))
              )}

              {/* Recommended skills: show as chips (usually not editable) */}
              {recSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {recSkills.map((skill: string, index: number) => (
                    <span
                      key={`rec-${index}`}
                      className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Buttons (outside cv-content so pdf doesn’t capture) */}
        <div className="flex justify-end gap-3 mt-3">
          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>

          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </>
          )}

          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .cv-content,
            .cv-content * {
              visibility: visible;
            }
            .cv-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 20px !important;
            }
            button {
              display: none !important;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}



