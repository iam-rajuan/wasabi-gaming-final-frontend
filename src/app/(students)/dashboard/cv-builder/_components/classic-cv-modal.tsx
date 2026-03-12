// "use client";

// import React, { useRef } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";
// import { toast } from "sonner";
// import { CvBuilderFormType } from "./cv-making-form";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// interface ClassicCvModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cvData: CvBuilderFormType | null;
// }

// const ClassicCvModal = ({ isOpen, onClose, cvData }: ClassicCvModalProps) => {
//   const cvRef = useRef<HTMLDivElement>(null);

//   if (!cvData) return null;

//   const handleDownloadPDF = async () => {
//     if (!cvRef.current) return;
//     try {
//       toast.loading("Generating PDF...");
//       const canvas = await html2canvas(cvRef.current, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       pdf.addImage(
//         imgData,
//         "PNG",
//         0,
//         0,
//         210,
//         (canvas.height * 210) / canvas.width,
//       );
//       pdf.save(`${cvData.firstName}_CV.pdf`);
//       toast.dismiss();
//       toast.success("Downloaded!");
//     } catch (e) {
//       toast.dismiss();
//       toast.error("Error generating PDF");
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-zinc-100 p-10">
//         <div
//           ref={cvRef}
//           className="p-12 mx-auto text-black bg-white shadow-lg"
//           style={{ width: "210mm", minHeight: "297mm", fontFamily: "serif" }}
//         >
//           {/* HEADER SECTION */}
//           <div className="mb-6 text-center">
//             <h1 className="text-3xl font-bold tracking-tight uppercase">
//               {cvData.firstName} {cvData.lastName}
//             </h1>
//             <div className="flex justify-center gap-4 mt-1 text-sm text-blue-600 underline">
//               <span>{cvData.email}</span>
//               <span className="text-black no-underline">{cvData.phone}</span>
//             </div>
//           </div>

//           {/* EDUCATION SECTION */}
//           <section className="mb-6">
//             <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
//               Education
//             </h3>
//             {cvData.educationLevel.map((edu, i) => (
//               <div key={i} className="mb-3">
//                 <div className="flex justify-between ">
//                   <span className="font-semibold">{edu.institution}</span>
//                   <span>
//                     {edu.startYear} - {edu.endYear}
//                   </span>
//                 </div>
//                 <div className="italic">
//                   <span>
//                     {edu.educationLevel} in {edu.subject}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-sm">Grade: {edu.grade}</p>
//               </div>
//             ))}
//           </section>

//           {/* WORK EXPERIENCE SECTION */}
//           <section className="mb-6">
//             <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
//               Work Experience
//             </h3>
//             {cvData.legalWorkExperience.map((exp, i) => (
//               <div key={i} className="mb-4">
//                 <div className="flex justify-between ">
//                   <span className="font-semibold">{exp.organization}</span>
//                   <span>
//                     {exp.startYear} - {exp.endYear}
//                   </span>
//                 </div>
//                 <div className="flex justify-between italic">
//                   <span>{exp.jobTitle}</span>
//                 </div>
//                 <ul className="mt-1 ml-5 space-y-1 text-sm list-disc">
//                   {exp.keyResponsibilities.split("\n").map((line, j) => (
//                     <li key={j}>{line}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </section>

//           {/* LEADERSHIP / OTHER SECTION */}
//           {cvData.leadership.length > 0 && (
//             <section className="mb-6">
//               <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
//                 Leadership / Other Experience
//               </h3>
//               {cvData.leadership.map((lead, i) => (
//                 <div key={i} className="mb-3">
//                   <div className="flex justify-between ">
//                     <span className="font-semibold">{lead.organization}</span>
//                     <span>{lead.dateYear}</span>
//                   </div>
//                   <div className="flex justify-between italic">
//                     <span>{lead.role}</span>
//                   </div>
//                   <p className="mt-1 text-sm">{lead.description}</p>
//                 </div>
//               ))}
//             </section>
//           )}

//           {/* SKILLS & INTERESTS */}
//           <section className="mb-6">
//             <h3 className="mb-2 text-lg font-bold uppercase border-b border-black">
//               Skills, Activities & Interests
//             </h3>
//             <div className="space-y-1 text-sm">
//               <p>
//                 <span className="font-bold">Technical Skills: </span>
//                 {cvData.achievements.skills.join(", ")}
//               </p>
//               <p>
//                 <span className="font-bold">Activities & Interests: </span>
//                 {cvData.summary}{" "}
//                 {/* Or use a specific interests field if available */}
//               </p>
//             </div>
//           </section>
//         </div>

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
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ClassicCvModal;





// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Download, Edit3, Save, X, Plus, Trash2 } from "lucide-react";
// import { toast } from "sonner";
// import { CvBuilderFormType } from "./cv-making-form";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// // ────────────────────────────────────────────────
// // Editable helpers
// // ────────────────────────────────────────────────
// function EditableText({
//   value,
//   onChange,
//   isEditing,
//   className = "",
//   inputClassName = "",
//   placeholder,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   isEditing: boolean;
//   className?: string;
//   inputClassName?: string;
//   placeholder?: string;
// }) {
//   if (!isEditing) return <span className={className}>{value}</span>;

//   return (
//     <input
//       className={`w-full border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-black/10 ${inputClassName}`}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//     />
//   );
// }

// function EditableTextarea({
//   value,
//   onChange,
//   isEditing,
//   className = "",
//   textareaClassName = "",
//   placeholder,
//   minHeight = 80,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   isEditing: boolean;
//   className?: string;
//   textareaClassName?: string;
//   placeholder?: string;
//   minHeight?: number;
// }) {
//   if (!isEditing) return <p className={className}>{value}</p>;

//   return (
//     <textarea
//       className={`w-full border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-black/10 resize-none ${textareaClassName}`}
//       style={{ minHeight }}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//     />
//   );
// }

// // ────────────────────────────────────────────────
// // Props
// // ────────────────────────────────────────────────
// interface ClassicCvModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cvData: CvBuilderFormType | null;
//   // onSave?: (data: CvBuilderFormType) => void; // optional if you want parent save
// }

// const ClassicCvModal = ({ isOpen, onClose, cvData }: ClassicCvModalProps) => {
//   const cvRef = useRef<HTMLDivElement>(null);

//   const [isEditing, setIsEditing] = useState(false);
//   const [draft, setDraft] = useState<CvBuilderFormType | null>(null);

//   // refresh draft on open/data change
//   useEffect(() => {
//     if (!cvData) {
//       setDraft(null);
//       setIsEditing(false);
//       return;
//     }
//     setDraft(JSON.parse(JSON.stringify(cvData)));
//     setIsEditing(false);
//   }, [cvData, isOpen]);

//   const updateField = <K extends keyof CvBuilderFormType>(
//     key: K,
//     value: CvBuilderFormType[K]
//   ) => {
//     setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
//   };

//   const handleCancelEdit = () => {
//     if (!cvData) return;
//     setDraft(JSON.parse(JSON.stringify(cvData)));
//     setIsEditing(false);
//     toast.message("Edits cancelled");
//   };

//   const handleSaveEdit = () => {
//     setIsEditing(false);
//     toast.success("Saved in preview (download will use updated data)");
//     // if (draft) onSave?.(draft);
//   };

//   // safe arrays
//   const education = draft?.educationLevel ?? [];
//   const work = draft?.legalWorkExperience ?? [];
//   const leadership = draft?.leadership ?? [];
//   const skills = draft?.achievements?.skills ?? [];

//   // ────────────────────────────────────────────────
//   // Array updaters
//   // ────────────────────────────────────────────────
//   const updateEducation = (i: number, patch: any) => {
//     if (!draft) return;
//     const updated = [...education];
//     updated[i] = { ...updated[i], ...patch };
//     updateField("educationLevel" as any, updated as any);
//   };
//   const addEducation = () => {
//     if (!draft) return;
//     updateField("educationLevel" as any, [
//       ...education,
//       {
//         educationLevel: "",
//         institution: "",
//         startYear: "",
//         endYear: "",
//         subject: "",
//         grade: "",
//       },
//     ] as any);
//   };
//   const removeEducation = (i: number) => {
//     if (!draft) return;
//     updateField(
//       "educationLevel" as any,
//       education.filter((_, idx) => idx !== i) as any
//     );
//   };

//   const updateWork = (i: number, patch: any) => {
//     if (!draft) return;
//     const updated = [...work];
//     updated[i] = { ...updated[i], ...patch };
//     updateField("legalWorkExperience" as any, updated as any);
//   };
//   const addWork = () => {
//     if (!draft) return;
//     updateField("legalWorkExperience" as any, [
//       ...work,
//       {
//         organization: "",
//         jobTitle: "",
//         startYear: "",
//         endYear: "",
//         keyResponsibilities: "",
//       },
//     ] as any);
//   };
//   const removeWork = (i: number) => {
//     if (!draft) return;
//     updateField(
//       "legalWorkExperience" as any,
//       work.filter((_, idx) => idx !== i) as any
//     );
//   };

//   const updateLeadership = (i: number, patch: any) => {
//     if (!draft) return;
//     const updated = [...leadership];
//     updated[i] = { ...updated[i], ...patch };
//     updateField("leadership" as any, updated as any);
//   };
//   const addLeadership = () => {
//     if (!draft) return;
//     updateField("leadership" as any, [
//       ...leadership,
//       { organization: "", role: "", dateYear: "", description: "" },
//     ] as any);
//   };
//   const removeLeadership = (i: number) => {
//     if (!draft) return;
//     updateField(
//       "leadership" as any,
//       leadership.filter((_, idx) => idx !== i) as any
//     );
//   };

//   const updateSkill = (i: number, value: string) => {
//     if (!draft) return;
//     const updated = [...skills];
//     updated[i] = value;
//     updateField("achievements" as any, { ...draft.achievements, skills: updated } as any);
//   };
//   const addSkill = () => {
//     if (!draft) return;
//     updateField("achievements" as any, { ...draft.achievements, skills: [...skills, ""] } as any);
//   };
//   const removeSkill = (i: number) => {
//     if (!draft) return;
//     updateField(
//       "achievements" as any,
//       { ...draft.achievements, skills: skills.filter((_, idx) => idx !== i) } as any
//     );
//   };

//   // ────────────────────────────────────────────────
//   // PDF Download (same-to-same preview)
//   // ────────────────────────────────────────────────
// const handleDownloadPDF = async () => {
//   if (!cvRef.current || !draft) return;

//   try {
//     toast.loading("Generating PDF...");

//     const cvElement = cvRef.current;

//     // ✅ Clone (do not change layout styles like padding)
//     const cloned = cvElement.cloneNode(true) as HTMLElement;
//     cloned.style.position = "fixed";
//     cloned.style.left = "-9999px";
//     cloned.style.top = "0";

//     // ✅ Keep A4 exactly like preview (same as your preview div)
//     cloned.style.width = "210mm";
//     cloned.style.minHeight = "297mm";
//     cloned.style.background = "white";
//     cloned.style.boxShadow = "none"; // optional

//     // ✅ IMPORTANT: do NOT overwrite padding/margin here
//     // cloned.style.padding = "0"; ❌ remove this (causes border shift)
//     // cloned.style.margin = "0";  ❌ remove this too if you use p-12 and layout depends

//     // keep text sizing stable
//     (cloned.style as any).webkitTextSizeAdjust = "100%";

//     // inputs -> look like text in PDF
//     const inputs = cloned.querySelectorAll("input, textarea");
//     inputs.forEach((el) => {
//       const node = el as HTMLInputElement | HTMLTextAreaElement;
//       node.style.border = "none";
//       node.style.outline = "none";
//       node.style.boxShadow = "none";
//       node.style.padding = "0";
//       node.style.background = "transparent";
//     });

//     document.body.appendChild(cloned);

//     // ✅ wait for fonts (spacing mismatch fix)
//     // @ts-ignore
//     if (document.fonts?.ready) {
//       // @ts-ignore
//       await document.fonts.ready;
//     }

//     // ✅ canvas capture
//     const canvas = await html2canvas(cloned, {
//       scale: 3, // fixed scale = stable output
//       useCORS: true,
//       logging: false,
//       backgroundColor: "#ffffff",
//       scrollX: 0,
//       scrollY: 0,
//     });

//     document.body.removeChild(cloned);

//     // ✅ A4 PDF
//     const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

//     const pageW = 210;
//     const pageH = 297;

//     // ✅ SAME-TO-SAME: no margins (otherwise it scales)
//     const marginX = 0;
//     const marginTop = 0;
//     const marginBottom = 0;

//     const contentW = pageW - marginX * 2;
//     const contentH = pageH - marginTop - marginBottom;

//     const pxPerMm = canvas.width / contentW;
//     const pagePxHeight = Math.floor(contentH * pxPerMm);

//     let yOffsetPx = 0;
//     let pageIndex = 0;

//     while (yOffsetPx < canvas.height) {
//       const sliceCanvas = document.createElement("canvas");
//       sliceCanvas.width = canvas.width;
//       sliceCanvas.height = Math.min(pagePxHeight, canvas.height - yOffsetPx);

//       const ctx = sliceCanvas.getContext("2d");
//       if (!ctx) break;

//       ctx.drawImage(
//         canvas,
//         0,
//         yOffsetPx,
//         canvas.width,
//         sliceCanvas.height,
//         0,
//         0,
//         canvas.width,
//         sliceCanvas.height
//       );

//       const imgData = sliceCanvas.toDataURL("image/png", 1.0);

//       if (pageIndex > 0) pdf.addPage();

//       pdf.setFillColor(255, 255, 255);
//       pdf.rect(0, 0, pageW, pageH, "F");

//       const sliceH_mm = sliceCanvas.height / pxPerMm;

//       pdf.addImage(imgData, "PNG", marginX, marginTop, contentW, sliceH_mm, undefined, "FAST");

//       yOffsetPx += pagePxHeight;
//       pageIndex += 1;
//     }

//     pdf.save(`${draft.firstName}_${draft.lastName}_CV.pdf`);

//     toast.dismiss();
//     toast.success("Downloaded!");
//   } catch (e) {
//     toast.dismiss();
//     toast.error("Error generating PDF");
//   }
// };


//   if (!draft) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-zinc-100 p-10">
//         {/* CV PAGE */}
//         <div
//           ref={cvRef}
//           className="p-12 mx-auto text-black bg-white shadow-lg"
//           style={{ width: "210mm", minHeight: "297mm", fontFamily: "serif" }}
//         >
//           {/* HEADER SECTION */}
//           <div className="mb-6 text-center">
//             {isEditing ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-[520px] mx-auto">
//                 <EditableText
//                   value={draft.firstName || ""}
//                   onChange={(v) => updateField("firstName" as any, v as any)}
//                   isEditing={true}
//                   placeholder="First name"
//                   inputClassName="text-center"
//                 />
//                 <EditableText
//                   value={draft.lastName || ""}
//                   onChange={(v) => updateField("lastName" as any, v as any)}
//                   isEditing={true}
//                   placeholder="Last name"
//                   inputClassName="text-center"
//                 />
//               </div>
//             ) : (
//               <h1 className="text-3xl font-bold tracking-tight uppercase">
//                 {draft.firstName} {draft.lastName}
//               </h1>
//             )}

//             <div className="flex justify-center gap-4 mt-1 text-sm">
//               {isEditing ? (
//                 <>
//                   <div className="w-[240px]">
//                     <EditableText
//                       value={draft.email || ""}
//                       onChange={(v) => updateField("email" as any, v as any)}
//                       isEditing={true}
//                       placeholder="Email"
//                       inputClassName="text-center"
//                     />
//                   </div>
//                   <div className="w-[180px]">
//                     <EditableText
//                       value={draft.phone || ""}
//                       onChange={(v) => updateField("phone" as any, v as any)}
//                       isEditing={true}
//                       placeholder="Phone"
//                       inputClassName="text-center"
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex justify-center gap-4 text-blue-600 underline">
//                   <span>{draft.email}</span>
//                   <span className="text-black no-underline">{draft.phone}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* EDUCATION SECTION */}
//           <section className="mb-6">
//             <div className="flex items-center justify-between">
//               <h3 className="mb-2 text-lg font-bold uppercase border-b border-black w-full">
//                 Education
//               </h3>
//               {isEditing && (
//                 <Button variant="outline" size="sm" onClick={addEducation} className="ml-3">
//                   <Plus className="w-4 h-4 mr-1" /> Add
//                 </Button>
//               )}
//             </div>

//             {education.map((edu: any, i: number) => (
//               <div key={i} className="mb-3 relative">
//                 {isEditing && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     className="absolute -left-10 top-0 text-red-600"
//                     onClick={() => removeEducation(i)}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 )}

//                 <div className="flex justify-between gap-4">
//                   <div className="flex-1">
//                     {isEditing ? (
//                       <EditableText
//                         value={edu.institution || ""}
//                         onChange={(v) => updateEducation(i, { institution: v })}
//                         isEditing={true}
//                         placeholder="Institution"
//                       />
//                     ) : (
//                       <span className="font-semibold">{edu.institution}</span>
//                     )}
//                   </div>

//                   <div className="min-w-[180px] text-right">
//                     {isEditing ? (
//                       <div className="grid grid-cols-2 gap-2">
//                         <EditableText
//                           value={edu.startYear || ""}
//                           onChange={(v) => updateEducation(i, { startYear: v })}
//                           isEditing={true}
//                           placeholder="Start"
//                           inputClassName="text-center"
//                         />
//                         <EditableText
//                           value={edu.endYear || ""}
//                           onChange={(v) => updateEducation(i, { endYear: v })}
//                           isEditing={true}
//                           placeholder="End"
//                           inputClassName="text-center"
//                         />
//                       </div>
//                     ) : (
//                       <span>
//                         {edu.startYear} - {edu.endYear}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="italic mt-1">
//                   {isEditing ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       <EditableText
//                         value={edu.educationLevel || ""}
//                         onChange={(v) => updateEducation(i, { educationLevel: v })}
//                         isEditing={true}
//                         placeholder="Degree/Level"
//                       />
//                       <EditableText
//                         value={edu.subject || ""}
//                         onChange={(v) => updateEducation(i, { subject: v })}
//                         isEditing={true}
//                         placeholder="Subject"
//                       />
//                     </div>
//                   ) : (
//                     <span>
//                       {edu.educationLevel} in {edu.subject}
//                     </span>
//                   )}
//                 </div>

//                 <div className="mt-1 text-sm">
//                   {isEditing ? (
//                     <div className="max-w-[240px]">
//                       <EditableText
//                         value={edu.grade || ""}
//                         onChange={(v) => updateEducation(i, { grade: v })}
//                         isEditing={true}
//                         placeholder="Grade"
//                       />
//                     </div>
//                   ) : (
//                     <p>Grade: {edu.grade}</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </section>

//           {/* WORK EXPERIENCE SECTION */}
//           <section className="mb-6">
//             <div className="flex items-center justify-between">
//               <h3 className="mb-2 text-lg font-bold uppercase border-b border-black w-full">
//                 Work Experience
//               </h3>
//               {isEditing && (
//                 <Button variant="outline" size="sm" onClick={addWork} className="ml-3">
//                   <Plus className="w-4 h-4 mr-1" /> Add
//                 </Button>
//               )}
//             </div>

//             {work.map((exp: any, i: number) => (
//               <div key={i} className="mb-4 relative">
//                 {isEditing && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     className="absolute -left-10 top-0 text-red-600"
//                     onClick={() => removeWork(i)}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 )}

//                 <div className="flex justify-between gap-4">
//                   <div className="flex-1">
//                     {isEditing ? (
//                       <EditableText
//                         value={exp.organization || ""}
//                         onChange={(v) => updateWork(i, { organization: v })}
//                         isEditing={true}
//                         placeholder="Organization"
//                       />
//                     ) : (
//                       <span className="font-semibold">{exp.organization}</span>
//                     )}
//                   </div>

//                   <div className="min-w-[180px] text-right">
//                     {isEditing ? (
//                       <div className="grid grid-cols-2 gap-2">
//                         <EditableText
//                           value={exp.startYear || ""}
//                           onChange={(v) => updateWork(i, { startYear: v })}
//                           isEditing={true}
//                           placeholder="Start"
//                           inputClassName="text-center"
//                         />
//                         <EditableText
//                           value={exp.endYear || ""}
//                           onChange={(v) => updateWork(i, { endYear: v })}
//                           isEditing={true}
//                           placeholder="End"
//                           inputClassName="text-center"
//                         />
//                       </div>
//                     ) : (
//                       <span>
//                         {exp.startYear} - {exp.endYear}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="italic mt-1">
//                   {isEditing ? (
//                     <div className="max-w-[320px]">
//                       <EditableText
//                         value={exp.jobTitle || ""}
//                         onChange={(v) => updateWork(i, { jobTitle: v })}
//                         isEditing={true}
//                         placeholder="Job Title"
//                       />
//                     </div>
//                   ) : (
//                     <span>{exp.jobTitle}</span>
//                   )}
//                 </div>

//                 <div className="mt-1 text-sm">
//                   {isEditing ? (
//                     <EditableTextarea
//                       value={exp.keyResponsibilities || ""}
//                       onChange={(v) => updateWork(i, { keyResponsibilities: v })}
//                       isEditing={true}
//                       placeholder="Responsibilities (one per line)"
//                       minHeight={90}
//                     />
//                   ) : (
//                     <ul className="mt-1 ml-5 space-y-1 text-sm list-none">
//                       {(exp.keyResponsibilities || "")
//                         .split("\n")
//                         .filter(Boolean)
//                         .map((line: string, j: number) => (
//                           <li key={j}>{line}</li>
//                         ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </section>

//           {/* LEADERSHIP / OTHER SECTION */}
//           <section className="mb-6">
//             <div className="flex items-center justify-between">
//               <h3 className="mb-2 text-lg font-bold uppercase border-b  border-black w-full">
//                 Leadership / Other Experience
//               </h3>
//               {isEditing && (
//                 <Button variant="outline" size="sm" onClick={addLeadership} className="ml-3">
//                   <Plus className="w-4 h-4 mr-1" /> Add
//                 </Button>
//               )}
//             </div>

//             {leadership.length === 0 ? (
//               <p className="text-sm text-gray-500">No leadership added.</p>
//             ) : (
//               leadership.map((lead: any, i: number) => (
//                 <div key={i} className="mb-3 relative">
//                   {isEditing && (
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       className="absolute -left-10 top-0 text-red-600"
//                       onClick={() => removeLeadership(i)}
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   )}

//                   <div className="flex justify-between gap-4">
//                     <div className="flex-1">
//                       {isEditing ? (
//                         <EditableText
//                           value={lead.organization || ""}
//                           onChange={(v) => updateLeadership(i, { organization: v })}
//                           isEditing={true}
//                           placeholder="Organization"
//                         />
//                       ) : (
//                         <span className="font-semibold">{lead.organization}</span>
//                       )}
//                     </div>

//                     <div className="min-w-[160px] text-right">
//                       {isEditing ? (
//                         <EditableText
//                           value={lead.dateYear || ""}
//                           onChange={(v) => updateLeadership(i, { dateYear: v })}
//                           isEditing={true}
//                           placeholder="Year"
//                           inputClassName="text-center"
//                         />
//                       ) : (
//                         <span>{lead.dateYear}</span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="italic mt-1">
//                     {isEditing ? (
//                       <div className="max-w-[320px]">
//                         <EditableText
//                           value={lead.role || ""}
//                           onChange={(v) => updateLeadership(i, { role: v })}
//                           isEditing={true}
//                           placeholder="Role"
//                         />
//                       </div>
//                     ) : (
//                       <span>{lead.role}</span>
//                     )}
//                   </div>

//                   <div className="mt-1 text-sm">
//                     <EditableTextarea
//                       value={lead.description || ""}
//                       onChange={(v) => updateLeadership(i, { description: v })}
//                       isEditing={isEditing}
//                       placeholder="Description..."
//                       minHeight={70}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </section>

//           {/* SKILLS & INTERESTS */}
//           <section className="mb-6">
//             <div className="flex items-center justify-between">
//               <h3 className="mb-2 text-lg font-bold uppercase border-b border-black w-full">
//                 Skills, Activities & Interests
//               </h3>
//               {isEditing && (
//                 <Button variant="outline" size="sm" onClick={addSkill} className="ml-3">
//                   <Plus className="w-4 h-4 mr-1" /> Add Skill
//                 </Button>
//               )}
//             </div>

//             {/* Skills */}
//             <div className="space-y-2 text-sm">
//               <div>
//                 <span className="font-bold">Technical Skills: </span>
//                 {isEditing ? (
//                   <div className="mt-2 space-y-2">
//                     {skills.length === 0 ? (
//                       <p className="text-gray-500">Add skills...</p>
//                     ) : (
//                       skills.map((s: string, i: number) => (
//                         <div key={i} className="flex items-center gap-2">
//                           <EditableText
//                             value={s}
//                             onChange={(v) => updateSkill(i, v)}
//                             isEditing={true}
//                             placeholder="Skill"
//                           />
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             className="text-red-600"
//                             onClick={() => removeSkill(i)}
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 ) : (
//                   <span>{skills.join(", ")}</span>
//                 )}
//               </div>

//               {/* Activities/Interests (using summary as your original) */}
//               <div className="mt-2">
//                 <span className="font-bold">Activities & Interests: </span>
//                 <div className="mt-1">
//                   <EditableTextarea
//                     value={draft.summary || ""}
//                     onChange={(v) => updateField("summary" as any, v as any)}
//                     isEditing={isEditing}
//                     placeholder="Activities & interests..."
//                     minHeight={70}
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3 mt-3">
//           <Button variant="outline" onClick={onClose}>
//             Close Preview
//           </Button>

//           {!isEditing ? (
//             <Button
//               variant="outline"
//               onClick={() => setIsEditing(true)}
//               className="flex items-center gap-2"
//             >
//               <Edit3 className="w-4 h-4" />
//               Edit
//             </Button>
//           ) : (
//             <>
//               <Button
//                 variant="outline"
//                 onClick={handleCancelEdit}
//                 className="flex items-center gap-2"
//               >
//                 <X className="w-4 h-4" />
//                 Cancel
//               </Button>
//               <Button onClick={handleSaveEdit} className="flex items-center gap-2">
//                 <Save className="w-4 h-4" />
//                 Save
//               </Button>
//             </>
//           )}

//           <Button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-primary">
//             <Download className="w-4 h-4" />
//             Download PDF
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ClassicCvModal;











"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CvBuilderFormType } from "./cv-making-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ────────────────────────────────────────────────
// Editable helpers
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
      className={`w-full border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-black/10 ${inputClassName}`}
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
  minHeight = 80,
}: {
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  className?: string;
  textareaClassName?: string;
  placeholder?: string;
  minHeight?: number;
}) {
  if (!isEditing) return <p className={className}>{value}</p>;

  return (
    <textarea
      className={`w-full border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-black/10 resize-none ${textareaClassName}`}
      style={{ minHeight }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// ────────────────────────────────────────────────
// Props
// ────────────────────────────────────────────────
interface ClassicCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CvBuilderFormType | null;
  // onSave?: (data: CvBuilderFormType) => void;
}

const ClassicCvModal = ({ isOpen, onClose, cvData }: ClassicCvModalProps) => {
  const cvRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<CvBuilderFormType | null>(null);

  // refresh draft on open/data change
  useEffect(() => {
    if (!cvData) {
      setDraft(null);
      setIsEditing(false);
      return;
    }
    setDraft(JSON.parse(JSON.stringify(cvData)));
    setIsEditing(false);
  }, [cvData, isOpen]);

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
    // if (draft) onSave?.(draft);
  };

  // safe arrays
  const education = draft?.educationLevel ?? [];
  const work = draft?.legalWorkExperience ?? [];
  const leadership = draft?.leadership ?? [];
  const skills = draft?.achievements?.skills ?? [];

  // ────────────────────────────────────────────────
  // Array updaters
  // ────────────────────────────────────────────────
  const updateEducation = (i: number, patch: any) => {
    if (!draft) return;
    const updated = [...education];
    updated[i] = { ...updated[i], ...patch };
    updateField("educationLevel" as any, updated as any);
  };
  const addEducation = () => {
    if (!draft) return;
    updateField(
      "educationLevel" as any,
      [
        ...education,
        {
          educationLevel: "",
          institution: "",
          startYear: "",
          endYear: "",
          subject: "",
          grade: "",
        },
      ] as any
    );
  };
  const removeEducation = (i: number) => {
    if (!draft) return;
    updateField(
      "educationLevel" as any,
      education.filter((_, idx) => idx !== i) as any
    );
  };

  const updateWork = (i: number, patch: any) => {
    if (!draft) return;
    const updated = [...work];
    updated[i] = { ...updated[i], ...patch };
    updateField("legalWorkExperience" as any, updated as any);
  };
  const addWork = () => {
    if (!draft) return;
    updateField(
      "legalWorkExperience" as any,
      [
        ...work,
        {
          organization: "",
          jobTitle: "",
          startYear: "",
          endYear: "",
          keyResponsibilities: "",
        },
      ] as any
    );
  };
  const removeWork = (i: number) => {
    if (!draft) return;
    updateField(
      "legalWorkExperience" as any,
      work.filter((_, idx) => idx !== i) as any
    );
  };

  const updateLeadership = (i: number, patch: any) => {
    if (!draft) return;
    const updated = [...leadership];
    updated[i] = { ...updated[i], ...patch };
    updateField("leadership" as any, updated as any);
  };
  const addLeadership = () => {
    if (!draft) return;
    updateField(
      "leadership" as any,
      [
        ...leadership,
        { organization: "", role: "", dateYear: "", description: "" },
      ] as any
    );
  };
  const removeLeadership = (i: number) => {
    if (!draft) return;
    updateField(
      "leadership" as any,
      leadership.filter((_, idx) => idx !== i) as any
    );
  };

  const updateSkill = (i: number, value: string) => {
    if (!draft) return;
    const updated = [...skills];
    updated[i] = value;
    updateField(
      "achievements" as any,
      { ...draft.achievements, skills: updated } as any
    );
  };
  const addSkill = () => {
    if (!draft) return;
    updateField(
      "achievements" as any,
      { ...draft.achievements, skills: [...skills, ""] } as any
    );
  };
  const removeSkill = (i: number) => {
    if (!draft) return;
    updateField(
      "achievements" as any,
      {
        ...draft.achievements,
        skills: skills.filter((_, idx) => idx !== i),
      } as any
    );
  };

  // ────────────────────────────────────────────────
  // PDF Download (same-to-same preview)
  // ────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    if (!cvRef.current || !draft) return;

    try {
      toast.loading("Generating PDF...");

      const cvElement = cvRef.current;

      // ✅ export should match preview exactly (A4 @ 96dpi)
      const EXPORT_W = 794; // px
      const PAGE_W_MM = 210;
      const PAGE_H_MM = 297;

      // ✅ Clone (avoid UI jump + keep layout)
      const cloned = cvElement.cloneNode(true) as HTMLElement;
      cloned.style.position = "fixed";
      cloned.style.left = "-9999px";
      cloned.style.top = "0";
      cloned.style.width = `${EXPORT_W}px`;
      cloned.style.minHeight = "auto";
      cloned.style.background = "#ffffff";
      cloned.style.boxShadow = "none";
      cloned.style.margin = "0";
      cloned.style.boxSizing = "border-box";
      (cloned.style as any).webkitTextSizeAdjust = "100%";

      // ✅ inputs -> look like text (avoid box shift)
      const inputs = cloned.querySelectorAll("input, textarea");
      inputs.forEach((el) => {
        const node = el as HTMLInputElement | HTMLTextAreaElement;
        node.style.border = "none";
        node.style.outline = "none";
        node.style.boxShadow = "none";
        node.style.background = "transparent";
        node.style.padding = "0";
        node.style.margin = "0";
      });

      document.body.appendChild(cloned);

      // ✅ wait for fonts (big cause of mismatch)
      // @ts-ignore
      if (document.fonts?.ready) {
        // @ts-ignore
        await document.fonts.ready;
      }

      const canvas = await html2canvas(cloned, {
        scale: 2, // stable output
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: EXPORT_W,
        windowWidth: EXPORT_W,
        scrollX: 0,
        scrollY: 0,
      });

      document.body.removeChild(cloned);

      // ✅ PDF (no margins => same-to-same)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const mmPerPx = PAGE_W_MM / canvas.width;
      const pagePxHeight = Math.floor(PAGE_H_MM / mmPerPx);

      let y = 0;
      let pageIndex = 0;

      while (y < canvas.height) {
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = Math.min(pagePxHeight, canvas.height - y);

        const ctx = slice.getContext("2d");
        if (!ctx) break;

        ctx.drawImage(
          canvas,
          0,
          y,
          canvas.width,
          slice.height,
          0,
          0,
          canvas.width,
          slice.height
        );

        const imgData = slice.toDataURL("image/png", 1.0);

        if (pageIndex > 0) pdf.addPage();

        const sliceH_mm = slice.height * mmPerPx;
        pdf.addImage(imgData, "PNG", 0, 0, PAGE_W_MM, sliceH_mm, undefined, "FAST");

        y += pagePxHeight;
        pageIndex++;
      }

      pdf.save(`${draft.firstName}_${draft.lastName}_CV.pdf`);

      toast.dismiss();
      toast.success("Downloaded!");
    } catch (e) {
      toast.dismiss();
      toast.error("Error generating PDF");
    }
  };

  if (!draft) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-zinc-100 p-10">
        {/* CV PAGE */}
        <div
          ref={cvRef}
          className="p-12 mx-auto text-black bg-white shadow-lg print:shadow-none"
          // ✅ A4 preview in px => export same-to-same
          style={{
            width: "794px",
            minHeight: "1123px",
            fontFamily: "serif",
            boxSizing: "border-box",
          }}
        >
          {/* HEADER SECTION */}
          <div className="mb-6 text-center">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-[520px] mx-auto">
                <EditableText
                  value={draft.firstName || ""}
                  onChange={(v) => updateField("firstName" as any, v as any)}
                  isEditing={true}
                  placeholder="First name"
                  inputClassName="text-center"
                />
                <EditableText
                  value={draft.lastName || ""}
                  onChange={(v) => updateField("lastName" as any, v as any)}
                  isEditing={true}
                  placeholder="Last name"
                  inputClassName="text-center"
                />
              </div>
            ) : (
              <h1 className="text-3xl font-bold tracking-tight uppercase">
                {draft.firstName} {draft.lastName}
              </h1>
            )}

            <div className="flex justify-center gap-4 mt-1 text-sm">
              {isEditing ? (
                <>
                  <div className="w-[240px]">
                    <EditableText
                      value={draft.email || ""}
                      onChange={(v) => updateField("email" as any, v as any)}
                      isEditing={true}
                      placeholder="Email"
                      inputClassName="text-center"
                    />
                  </div>
                  <div className="w-[180px]">
                    <EditableText
                      value={draft.phone || ""}
                      onChange={(v) => updateField("phone" as any, v as any)}
                      isEditing={true}
                      placeholder="Phone"
                      inputClassName="text-center"
                    />
                  </div>
                </>
              ) : (
                <div className="flex justify-center gap-4 text-blue-600 underline">
                  <span>{draft.email}</span>
                  <span className="text-black no-underline">{draft.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* EDUCATION SECTION */}
          <section className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="mb-2 text-lg font-bold uppercase border-b pb-2 border-black w-full">
                Education
              </h3>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addEducation} className="ml-3">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              )}
            </div>

            {education.map((edu: any, i: number) => (
              <div key={i} className="mb-3 relative">
                {isEditing && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute -left-10 top-0 text-red-600"
                    onClick={() => removeEducation(i)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    {isEditing ? (
                      <EditableText
                        value={edu.institution || ""}
                        onChange={(v) => updateEducation(i, { institution: v })}
                        isEditing={true}
                        placeholder="Institution"
                      />
                    ) : (
                      <span className="font-semibold">{edu.institution}</span>
                    )}
                  </div>

                  <div className="min-w-[180px] text-right">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2">
                        <EditableText
                          value={edu.startYear || ""}
                          onChange={(v) => updateEducation(i, { startYear: v })}
                          isEditing={true}
                          placeholder="Start"
                          inputClassName="text-center"
                        />
                        <EditableText
                          value={edu.endYear || ""}
                          onChange={(v) => updateEducation(i, { endYear: v })}
                          isEditing={true}
                          placeholder="End"
                          inputClassName="text-center"
                        />
                      </div>
                    ) : (
                      <span>
                        {edu.startYear} - {edu.endYear}
                      </span>
                    )}
                  </div>
                </div>

                <div className="italic mt-1">
                  {isEditing ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <EditableText
                        value={edu.educationLevel || ""}
                        onChange={(v) => updateEducation(i, { educationLevel: v })}
                        isEditing={true}
                        placeholder="Degree/Level"
                      />
                      <EditableText
                        value={edu.subject || ""}
                        onChange={(v) => updateEducation(i, { subject: v })}
                        isEditing={true}
                        placeholder="Subject"
                      />
                    </div>
                  ) : (
                    <span>
                      {edu.educationLevel} in {edu.subject}
                    </span>
                  )}
                </div>

                <div className="mt-1 text-sm">
                  {isEditing ? (
                    <div className="max-w-[240px]">
                      <EditableText
                        value={edu.grade || ""}
                        onChange={(v) => updateEducation(i, { grade: v })}
                        isEditing={true}
                        placeholder="Grade"
                      />
                    </div>
                  ) : (
                    <p>Grade: {edu.grade}</p>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* WORK EXPERIENCE SECTION */}
          <section className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="mb-2 text-lg font-bold uppercase border-b pb-2 border-black w-full">
                Work Experience
              </h3>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addWork} className="ml-3">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              )}
            </div>

            {work.map((exp: any, i: number) => (
              <div key={i} className="mb-4 relative">
                {isEditing && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute -left-10 top-0 text-red-600"
                    onClick={() => removeWork(i)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    {isEditing ? (
                      <EditableText
                        value={exp.organization || ""}
                        onChange={(v) => updateWork(i, { organization: v })}
                        isEditing={true}
                        placeholder="Organization"
                      />
                    ) : (
                      <span className="font-semibold">{exp.organization}</span>
                    )}
                  </div>

                  <div className="min-w-[180px] text-right">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2">
                        <EditableText
                          value={exp.startYear || ""}
                          onChange={(v) => updateWork(i, { startYear: v })}
                          isEditing={true}
                          placeholder="Start"
                          inputClassName="text-center"
                        />
                        <EditableText
                          value={exp.endYear || ""}
                          onChange={(v) => updateWork(i, { endYear: v })}
                          isEditing={true}
                          placeholder="End"
                          inputClassName="text-center"
                        />
                      </div>
                    ) : (
                      <span>
                        {exp.startYear} - {exp.endYear}
                      </span>
                    )}
                  </div>
                </div>

                <div className="italic mt-1">
                  {isEditing ? (
                    <div className="max-w-[320px]">
                      <EditableText
                        value={exp.jobTitle || ""}
                        onChange={(v) => updateWork(i, { jobTitle: v })}
                        isEditing={true}
                        placeholder="Job Title"
                      />
                    </div>
                  ) : (
                    <span>{exp.jobTitle}</span>
                  )}
                </div>

                <div className="mt-1 text-sm">
                  {isEditing ? (
                    <EditableTextarea
                      value={exp.keyResponsibilities || ""}
                      onChange={(v) => updateWork(i, { keyResponsibilities: v })}
                      isEditing={true}
                      placeholder="Responsibilities (one per line)"
                      minHeight={90}
                    />
                  ) : (
                    <ul className="mt-1 ml-5 space-y-1 text-sm list-none">
                      {(exp.keyResponsibilities || "")
                        .split("\n")
                        .filter(Boolean)
                        .map((line: string, j: number) => (
                          <li key={j}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* LEADERSHIP / OTHER SECTION */}
          <section className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="mb-2 text-lg font-bold uppercase border-b pb-2 border-black w-full">
                Leadership / Other Experience
              </h3>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addLeadership} className="ml-3">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              )}
            </div>

            {leadership.length === 0 ? (
              <p className="text-sm text-gray-500">No leadership added.</p>
            ) : (
              leadership.map((lead: any, i: number) => (
                <div key={i} className="mb-3 relative">
                  {isEditing && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute -left-10 top-0 text-red-600"
                      onClick={() => removeLeadership(i)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <EditableText
                          value={lead.organization || ""}
                          onChange={(v) => updateLeadership(i, { organization: v })}
                          isEditing={true}
                          placeholder="Organization"
                        />
                      ) : (
                        <span className="font-semibold">{lead.organization}</span>
                      )}
                    </div>

                    <div className="min-w-[160px] text-right">
                      {isEditing ? (
                        <EditableText
                          value={lead.dateYear || ""}
                          onChange={(v) => updateLeadership(i, { dateYear: v })}
                          isEditing={true}
                          placeholder="Year"
                          inputClassName="text-center"
                        />
                      ) : (
                        <span>{lead.dateYear}</span>
                      )}
                    </div>
                  </div>

                  <div className="italic mt-1">
                    {isEditing ? (
                      <div className="max-w-[320px]">
                        <EditableText
                          value={lead.role || ""}
                          onChange={(v) => updateLeadership(i, { role: v })}
                          isEditing={true}
                          placeholder="Role"
                        />
                      </div>
                    ) : (
                      <span>{lead.role}</span>
                    )}
                  </div>

                  <div className="mt-1 text-sm">
                    <EditableTextarea
                      value={lead.description || ""}
                      onChange={(v) => updateLeadership(i, { description: v })}
                      isEditing={isEditing}
                      placeholder="Description..."
                      minHeight={70}
                    />
                  </div>
                </div>
              ))
            )}
          </section>

          {/* SKILLS & INTERESTS */}
          <section className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="mb-2 text-lg font-bold uppercase border-b pb-2 border-black w-full">
                Skills, Activities & Interests
              </h3>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addSkill} className="ml-3">
                  <Plus className="w-4 h-4 mr-1" /> Add Skill
                </Button>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-bold">Technical Skills: </span>
                {isEditing ? (
                  <div className="mt-2 space-y-2">
                    {skills.length === 0 ? (
                      <p className="text-gray-500">Add skills...</p>
                    ) : (
                      skills.map((s: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <EditableText
                            value={s}
                            onChange={(v) => updateSkill(i, v)}
                            isEditing={true}
                            placeholder="Skill"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-red-600"
                            onClick={() => removeSkill(i)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <span>{skills.join(", ")}</span>
                )}
              </div>

              <div className="mt-2">
                <span className="font-bold">Activities & Interests: </span>
                <div className="mt-1">
                  <EditableTextarea
                    value={draft.summary || ""}
                    onChange={(v) => updateField("summary" as any, v as any)}
                    isEditing={isEditing}
                    placeholder="Activities & interests..."
                    minHeight={70}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Buttons */}
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
              <Button onClick={handleSaveEdit} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </>
          )}

          <Button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-primary">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        {/* Print Styles (optional) */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .cv-content,
            .cv-content * {
              visibility: visible;
            }
            button {
              display: none !important;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default ClassicCvModal;
