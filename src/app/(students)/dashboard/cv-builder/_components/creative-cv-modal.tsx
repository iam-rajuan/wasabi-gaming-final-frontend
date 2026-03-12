// 'use client'

// import React, { useRef } from 'react'
// import { Dialog, DialogContent } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { Download, Mail, Phone, MapPin, Globe } from 'lucide-react'
// import { toast } from 'sonner'
// import { CvBuilderFormType } from './cv-making-form'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// interface ClassicCvProps {
//   isOpen: boolean
//   onClose: () => void
//   classicCvData: CvBuilderFormType | null
// }

// const CreativeCvModal = ({ isOpen, onClose, classicCvData }: ClassicCvProps) => {
//   const cvRef = useRef<HTMLDivElement>(null)

//   if (!classicCvData) return null

//   const handleDownloadPDF = async () => {
//     if (!cvRef.current) {
//       toast.error('CV content not found')
//       return
//     }
//     try {
//       toast.loading('Generating PDF...')
//       const canvas = await html2canvas(cvRef.current, {
//         scale: 2,
//         useCORS: true,
//       })
//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'mm', 'a4')
//       pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)
//       pdf.save(`${classicCvData.firstName}_CV.pdf`)
//       toast.dismiss()
//       toast.success('Downloaded!')
//     } catch (e) {
//       toast.dismiss()
//       toast.error('Download failed')
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-zinc-100 p-0 border-none">
//         <div className="flex flex-col items-center p-8">
//           {/* CV PAPER */}
//           <div
//             ref={cvRef}
//             className="bg-white text-[#4a4a4a] shadow-2xl"
//             style={{
//               width: '210mm',
//               minHeight: '297mm',
//               padding: '0',
//               fontFamily: "'Inter', sans-serif",
//             }}
//           >
//             {/* Header Section */}
//             <div className="px-12 pt-16 pb-8">
//               <div className="flex flex-col items-end pt-8 border-t-4 border-zinc-200">
//                 <h1 className="text-5xl font-light tracking-widest uppercase text-zinc-800">
//                   {classicCvData.firstName}{' '}
//                   <span className="font-bold">{classicCvData.lastName}</span>
//                 </h1>
//                 <p className="text-xl tracking-[0.2em] text-zinc-500 mt-2">
//                   {classicCvData.profession || 'Marketing Manager'}
//                 </p>
//               </div>
//             </div>

//             {/* Dark Contact Bar */}
//             <div className="bg-[#666666] text-white py-3 px-12 flex justify-between text-[10px] uppercase tracking-widest">
//               <div className="flex items-center gap-2">
//                 <MapPin size={12} />{' '}
//                 {classicCvData.location || '123 Anywhere St., Any City'}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Globe size={12} /> www.reallygreatsite.com
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail size={12} /> {classicCvData.email}
//               </div>
//             </div>

//             <div className="px-12 pt-8">
//               <section className="mb-10">
//                 <div className="flex items-center gap-4 mb-4">
//                   <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
//                     Profile Info
//                   </h3>
//                   <div className="h-[1px] bg-zinc-300 w-full"></div>
//                 </div>
//                 <p className="text-xs leading-relaxed text-zinc-600">
//                   {classicCvData.summary}
//                 </p>
//               </section>
//             </div>

//             <div className="grid grid-cols-12 gap-0">
//               {/* MAIN COLUMN (Left) */}
//               <div className="col-span-7 p-12 pt-0 pr-8 ">
//                 {/* Profile Info */}

//                 {/* Experience */}
//                 <section>
//                   <div className="flex items-center gap-4 mb-6">
//                     <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
//                       Experience
//                     </h3>
//                     <div className="h-[1px] bg-zinc-300 w-full"></div>
//                   </div>

//                   <div className="relative pl-6 ml-2 space-y-8 border-l border-zinc-300">
//                     {classicCvData.legalWorkExperience.map((exp, i) => (
//                       <div key={i} className="relative">
//                         {/* Bullet Point */}
//                         <div className="absolute -left-[31px] top-1 w-2 h-2 bg-zinc-500 border border-white"></div>

//                         <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
//                           {exp.startYear} - {exp.endYear || 'Present'}
//                         </span>
//                         <div className="mb-1 text-xs font-bold text-zinc-500">
//                           {exp.organization}
//                         </div>
//                         <h4 className="mb-2 font-bold text-zinc-800">
//                           {exp.jobTitle}
//                         </h4>
//                         <ul className="text-[11px] text-zinc-600 list-disc list-outside ml-3 space-y-1">
//                           <li>{exp.keyResponsibilities}</li>
//                         </ul>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               </div>

//               {/* SIDEBAR (Right) */}
//               <div className="min-h-full col-span-5 p-12 pl-8 bg-zinc-50">
//                 {/* Education */}
//                 <section className="mb-10">
//                   <div className="flex items-center gap-4 mb-4">
//                     <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
//                       Education
//                     </h3>
//                     <div className="h-[1px] bg-zinc-300 w-full"></div>
//                   </div>
//                   <div className="space-y-6">
//                     {classicCvData.educationLevel.map((edu, i) => (
//                       <div key={i}>
//                         <div className="text-[10px] font-bold text-zinc-400 mb-1">
//                           {edu.startYear} - {edu.endYear} | {edu.institution}
//                         </div>
//                         <div className="text-xs font-bold text-zinc-700">
//                           {edu.educationLevel}
//                         </div>
//                         <p className="text-[10px] text-zinc-500 mt-1">
//                           {edu.subject}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Skills */}
//                 <section className="mb-10">
//                   <div className="flex items-center gap-4 mb-4">
//                     <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
//                       Skills
//                     </h3>
//                     <div className="h-[1px] bg-zinc-300 w-full"></div>
//                   </div>
//                   <ul className="text-[11px] text-zinc-600 space-y-2">
//                     {classicCvData.achievements.skills.map((skill, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <span className="w-1 h-1 rounded-full bg-zinc-800"></span>{' '}
//                         {skill}
//                       </li>
//                     ))}
//                   </ul>
//                 </section>

//                 {/* Languages */}
//                 <section>
//                   <div className="flex items-center gap-4 mb-4">
//                     <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
//                       Languages
//                     </h3>
//                     <div className="h-[1px] bg-zinc-300 w-full"></div>
//                   </div>
//                   <ul className="text-[11px] text-zinc-600 space-y-2">
//                     <li className="flex items-center gap-2">
//                       <span className="w-1 h-1 rounded-full bg-zinc-800"></span>{' '}
//                       English
//                     </li>
//                     <li className="flex items-center gap-2 text-zinc-400">
//                       <span className="w-1 h-1 rounded-full bg-zinc-400"></span>{' '}
//                       Spanish (Basic)
//                     </li>
//                   </ul>
//                 </section>
//               </div>
//             </div>
//           </div>

//           {/* Floating Actions */}
//           <div className="flex justify-end w-full gap-3 mt-8">
//             <Button variant="outline" onClick={onClose}>
//               Close Preview
//             </Button>
//             <Button
//               onClick={handleDownloadPDF}
//               className="flex items-center gap-2 bg-primary"
//             >
//               <Download className="w-4 h-4 mr-2" /> Download PDF
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CreativeCvModal









'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, Edit3, Save, X, Plus, Trash2, Mail, MapPin, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { CvBuilderFormType } from './cv-making-form'

// ────────────────────────────────────────────────
// Editable helpers
// ────────────────────────────────────────────────
function EditableText({
  value,
  onChange,
  isEditing,
  className = '',
  inputClassName = '',
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  isEditing: boolean
  className?: string
  inputClassName?: string
  placeholder?: string
}) {
  if (!isEditing) return <span className={className}>{value}</span>

  return (
    <input
      className={`w-full border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-black/10 ${inputClassName}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function EditableTextarea({
  value,
  onChange,
  isEditing,
  className = '',
  textareaClassName = '',
  placeholder,
  minHeight = 80,
}: {
  value: string
  onChange: (v: string) => void
  isEditing: boolean
  className?: string
  textareaClassName?: string
  placeholder?: string
  minHeight?: number
}) {
  if (!isEditing) return <p className={className}>{value}</p>

  return (
    <textarea
      className={`w-full border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-black/10 resize-none ${textareaClassName}`}
      style={{ minHeight }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

interface CreativeCvProps {
  isOpen: boolean
  onClose: () => void
  classicCvData: CvBuilderFormType | null
}

const CreativeCvModal = ({ isOpen, onClose, classicCvData }: CreativeCvProps) => {
  const cvRef = useRef<HTMLDivElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<CvBuilderFormType | null>(null)

  useEffect(() => {
    if (!classicCvData) {
      setDraft(null)
      setIsEditing(false)
      return
    }
    setDraft(JSON.parse(JSON.stringify(classicCvData)))
    setIsEditing(false)
  }, [classicCvData, isOpen])

  const updateField = <K extends keyof CvBuilderFormType>(key: K, value: CvBuilderFormType[K]) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleCancelEdit = () => {
    if (!classicCvData) return
    setDraft(JSON.parse(JSON.stringify(classicCvData)))
    setIsEditing(false)
    toast.message('Edits cancelled')
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
    toast.success('Saved in preview (download will use updated data)')
  }

  // safe arrays
  const work = draft?.legalWorkExperience ?? []
  const education = draft?.educationLevel ?? []
  const skills = draft?.achievements?.skills ?? []

  // ────────────────────────────────────────────────
  // Array updaters
  // ────────────────────────────────────────────────
  const updateWork = (i: number, patch: any) => {
    if (!draft) return
    const updated = [...work]
    updated[i] = { ...updated[i], ...patch }
    updateField('legalWorkExperience' as any, updated as any)
  }
  const addWork = () => {
    if (!draft) return
    updateField(
      'legalWorkExperience' as any,
      [
        ...work,
        {
          organization: '',
          jobTitle: '',
          startYear: '',
          endYear: '',
          keyResponsibilities: '',
        },
      ] as any
    )
  }
  const removeWork = (i: number) => {
    if (!draft) return
    updateField(
      'legalWorkExperience' as any,
      work.filter((_, idx) => idx !== i) as any
    )
  }

  const updateEducation = (i: number, patch: any) => {
    if (!draft) return
    const updated = [...education]
    updated[i] = { ...updated[i], ...patch }
    updateField('educationLevel' as any, updated as any)
  }
  const addEducation = () => {
    if (!draft) return
    updateField(
      'educationLevel' as any,
      [
        ...education,
        {
          educationLevel: '',
          institution: '',
          startYear: '',
          endYear: '',
          subject: '',
          grade: '',
        },
      ] as any
    )
  }
  const removeEducation = (i: number) => {
    if (!draft) return
    updateField(
      'educationLevel' as any,
      education.filter((_, idx) => idx !== i) as any
    )
  }

  const updateSkill = (i: number, value: string) => {
    if (!draft) return
    const updated = [...skills]
    updated[i] = value
    updateField('achievements' as any, { ...draft.achievements, skills: updated } as any)
  }
  const addSkill = () => {
    if (!draft) return
    updateField('achievements' as any, { ...draft.achievements, skills: [...skills, ''] } as any)
  }
  const removeSkill = (i: number) => {
    if (!draft) return
    updateField(
      'achievements' as any,
      { ...draft.achievements, skills: skills.filter((_, idx) => idx !== i) } as any
    )
  }

  // ────────────────────────────────────────────────
  // ✅ BEST PDF: Browser Print Engine (single component)
  // ────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    if (!cvRef.current) {
      toast.error('CV content not found')
      return
    }

    try {
      toast.loading('Preparing PDF...')

      // hidden iframe
      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.right = '0'
      iframe.style.bottom = '0'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = '0'
      iframe.style.opacity = '0'
      iframe.setAttribute('aria-hidden', 'true')
      document.body.appendChild(iframe)

      const doc = iframe.contentDocument
      const win = iframe.contentWindow
      if (!doc || !win) throw new Error('Print window not available')

      // collect same-origin css
      let cssText = ''
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          const rules = sheet.cssRules
          if (!rules) continue
          for (const rule of Array.from(rules)) cssText += rule.cssText + '\n'
        } catch {
          // ignore CORS stylesheets
        }
      }

      // print css
      const printCss = `
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: #fff !important;
            margin: 0 !important;
          }
          .no-print { display: none !important; }
          .cv-print-area {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          @page { size: A4; margin: 0; }
        }
      `

      doc.open()
      doc.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>${cssText}</style>
            <style>${printCss}</style>
          </head>
          <body></body>
        </html>
      `)
      doc.close()

      // clone CV
      const cloned = cvRef.current.cloneNode(true) as HTMLElement
      cloned.querySelectorAll('button').forEach((b) => (b.style.display = 'none'))
      doc.body.appendChild(cloned)

      // wait fonts/images
      // @ts-ignore
      if (doc.fonts?.ready) await doc.fonts.ready

      const imgs = Array.from(doc.images || [])
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              if ((img as HTMLImageElement).complete) return resolve()
              img.addEventListener('load', () => resolve(), { once: true })
              img.addEventListener('error', () => resolve(), { once: true })
            })
        )
      )

      toast.dismiss()

      win.focus()
      win.print()

      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 500)
    } catch (e) {
      toast.dismiss()
      toast.error('Download failed')
    }
  }

  if (!draft) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-zinc-100 p-0 border-none">
        <div className="flex flex-col items-center p-8">
          {/* CV PAPER */}
          <div
            ref={cvRef}
            className="bg-white text-[#4a4a4a] shadow-2xl cv-print-area"
            style={{
              width: '794px',
              minHeight: '1123px',
              fontFamily: "'Inter', sans-serif",
              boxSizing: 'border-box',
            }}
          >
            {/* Header Section */}
            <div className="px-12 pt-16 pb-8">
              <div className="flex flex-col items-end pt-8 border-t-4 border-zinc-200">
                {isEditing ? (
                  <div className="w-full max-w-[520px] ml-auto space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <EditableText
                        value={draft.firstName || ''}
                        onChange={(v) => updateField('firstName' as any, v as any)}
                        isEditing
                        placeholder="First name"
                        inputClassName="text-right"
                      />
                      <EditableText
                        value={draft.lastName || ''}
                        onChange={(v) => updateField('lastName' as any, v as any)}
                        isEditing
                        placeholder="Last name"
                        inputClassName="text-right"
                      />
                    </div>

                    <EditableText
                      value={draft.profession || ''}
                      onChange={(v) => updateField('profession' as any, v as any)}
                      isEditing
                      placeholder="Profession"
                      inputClassName="text-right tracking-[0.2em]"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-5xl font-light tracking-widest uppercase text-zinc-800">
                      {draft.firstName}{' '}
                      <span className="font-bold">{draft.lastName}</span>
                    </h1>
                    <p className="text-xl tracking-[0.2em] text-zinc-500 mt-2">
                      {draft.profession || 'Marketing Manager'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Dark Contact Bar */}
            <div className="bg-[#666666] text-white py-3 px-12 flex justify-between text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <MapPin size={12} />
                {isEditing ? (
                  <div className="w-[220px]">
                    <EditableText
                      value={draft.location || ''}
                      onChange={(v) => updateField('location' as any, v as any)}
                      isEditing
                      placeholder="Location"
                      inputClassName="bg-white/10 text-white placeholder:text-white/60 border-white/20"
                    />
                  </div>
                ) : (
                  <span>{draft.location || '123 Anywhere St., Any City'}</span>
                )}
              </div>

              <div className="flex gap-2">
                <Globe size={12} /> <span>www.reallygreatsite.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={12} />
                {isEditing ? (
                  <div className="w-[220px]">
                    <EditableText
                      value={draft.email || ''}
                      onChange={(v) => updateField('email' as any, v as any)}
                      isEditing
                      placeholder="Email"
                      inputClassName="bg-white/10 text-white placeholder:text-white/60 border-white/20"
                    />
                  </div>
                ) : (
                  <span>{draft.email}</span>
                )}
              </div>
            </div>

            <div className="px-12 pt-8">
              {/* Profile */}
              <section className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                    Profile Info
                  </h3>
                  <div className="h-[1px] bg-zinc-300 w-full" />
                </div>

                <EditableTextarea
                  value={draft.summary || ''}
                  onChange={(v) => updateField('summary' as any, v as any)}
                  isEditing={isEditing}
                  className="text-xs leading-relaxed text-zinc-600"
                  placeholder="Write profile summary..."
                  minHeight={90}
                />
              </section>
            </div>

            <div className="grid grid-cols-12 gap-0">
              {/* MAIN COLUMN (Left) */}
              <div className="col-span-7 p-12 pt-0 pr-8">
                {/* Experience */}
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Experience
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full" />
                    {isEditing && (
                      <Button variant="outline" size="sm" onClick={addWork} className="ml-2">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    )}
                  </div>

                  {work.length === 0 ? (
                    <p className="text-xs text-zinc-500">
                      {isEditing ? 'Add your first experience.' : 'No experience added.'}
                    </p>
                  ) : (
                    <div className="relative pl-6 ml-2 space-y-8 border-l border-zinc-300">
                      {work.map((exp: any, i: number) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[31px] top-1 w-2 h-2 bg-zinc-500 border border-white" />

                          {isEditing && (
                            <Button
                              type="button"
                              variant="ghost"
                              className="absolute -left-14 -top-2 text-red-600"
                              onClick={() => removeWork(i)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}

                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                            {isEditing ? (
                              <div className="grid grid-cols-2 gap-2 max-w-[240px]">
                                <EditableText
                                  value={exp.startYear || ''}
                                  onChange={(v) => updateWork(i, { startYear: v })}
                                  isEditing
                                  placeholder="Start"
                                />
                                <EditableText
                                  value={exp.endYear || ''}
                                  onChange={(v) => updateWork(i, { endYear: v })}
                                  isEditing
                                  placeholder="End"
                                />
                              </div>
                            ) : (
                              <span>
                                {exp.startYear} - {exp.endYear || 'Present'}
                              </span>
                            )}
                          </div>

                          <div className="mb-1 text-xs font-bold text-zinc-500">
                            {isEditing ? (
                              <EditableText
                                value={exp.organization || ''}
                                onChange={(v) => updateWork(i, { organization: v })}
                                isEditing
                                placeholder="Organization"
                              />
                            ) : (
                              exp.organization
                            )}
                          </div>

                          <h4 className="mb-2 font-bold text-zinc-800">
                            {isEditing ? (
                              <EditableText
                                value={exp.jobTitle || ''}
                                onChange={(v) => updateWork(i, { jobTitle: v })}
                                isEditing
                                placeholder="Job title"
                              />
                            ) : (
                              exp.jobTitle
                            )}
                          </h4>

                          {isEditing ? (
                            <EditableTextarea
                              value={exp.keyResponsibilities || ''}
                              onChange={(v) => updateWork(i, { keyResponsibilities: v })}
                              isEditing
                              placeholder="Responsibilities (one per line)"
                              minHeight={90}
                              textareaClassName="text-[11px]"
                            />
                          ) : (
                            <ul className="text-[11px] text-zinc-600 list-outside ml-3 space-y-1">
                              {(exp.keyResponsibilities || '')
                                .split('\n')
                                .filter(Boolean)
                                .map((line: string, j: number) => (
                                  <li key={j}>
                                    <span className="inline-block w-1 h-1 mr-2 bg-zinc-500 rounded-full"></span>
                                    {line}
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* SIDEBAR (Right) */}
              <div className="min-h-full col-span-5 p-12 pl-8 bg-zinc-50">
                {/* Education */}
                <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Education
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full" />
                    {isEditing && (
                      <Button variant="outline" size="sm" onClick={addEducation} className="ml-2">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {education.map((edu: any, i: number) => (
                      <div key={i} className="relative">
                        {isEditing && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute -left-10 -top-2 text-red-600"
                            onClick={() => removeEducation(i)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}

                        <div className="text-[10px] font-bold text-zinc-400 mb-1">
                          {isEditing ? (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <EditableText
                                  value={edu.startYear || ''}
                                  onChange={(v) => updateEducation(i, { startYear: v })}
                                  isEditing
                                  placeholder="Start"
                                />
                                <EditableText
                                  value={edu.endYear || ''}
                                  onChange={(v) => updateEducation(i, { endYear: v })}
                                  isEditing
                                  placeholder="End"
                                />
                              </div>
                              <EditableText
                                value={edu.institution || ''}
                                onChange={(v) => updateEducation(i, { institution: v })}
                                isEditing
                                placeholder="Institution"
                              />
                            </div>
                          ) : (
                            <span>
                              {edu.startYear} - {edu.endYear} | {edu.institution}
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold text-zinc-700">
                          {isEditing ? (
                            <EditableText
                              value={edu.educationLevel || ''}
                              onChange={(v) => updateEducation(i, { educationLevel: v })}
                              isEditing
                              placeholder="Degree/Level"
                            />
                          ) : (
                            edu.educationLevel
                          )}
                        </div>

                        <p className="text-[10px] text-zinc-500 mt-1">
                          {isEditing ? (
                            <EditableText
                              value={edu.subject || ''}
                              onChange={(v) => updateEducation(i, { subject: v })}
                              isEditing
                              placeholder="Subject"
                            />
                          ) : (
                            edu.subject
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Skills
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full" />
                    {isEditing && (
                      <Button variant="outline" size="sm" onClick={addSkill} className="ml-2">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      {skills.length === 0 ? (
                        <p className="text-[11px] text-zinc-500">Add skills...</p>
                      ) : (
                        skills.map((skill: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <EditableText
                              value={skill}
                              onChange={(v) => updateSkill(i, v)}
                              isEditing
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
                    <ul className="text-[11px] text-zinc-600 space-y-2">
                      {skills.map((skill: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-zinc-800" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {/* Languages */}
                <section>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-bold tracking-widest uppercase text-zinc-800 shrink-0">
                      Languages
                    </h3>
                    <div className="h-[1px] bg-zinc-300 w-full" />
                  </div>
                  <ul className="text-[11px] text-zinc-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-zinc-800" /> English
                    </li>
                    <li className="flex items-center gap-2 text-zinc-400">
                      <span className="w-1 h-1 rounded-full bg-zinc-400" /> Spanish (Basic)
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end w-full gap-3 mt-8 no-print">
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
                <Button variant="outline" onClick={handleCancelEdit} className="flex items-center gap-2">
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
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreativeCvModal
