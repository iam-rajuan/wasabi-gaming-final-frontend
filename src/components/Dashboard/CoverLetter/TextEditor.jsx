import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  X,
  Edit2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";

// Rich Text Editor Component
function TextEditor({ isOpen, onClose, content, onSave }) {
  const [editorContent, setEditorContent] = useState(content);
  const editorRef = useRef(null);

  useEffect(() => {
    if (isOpen && editorRef.current) {
      editorRef.current.innerHTML = content.replace(/\n/g, "<br>");
    }
  }, [isOpen, content]);

  if (!isOpen) return null;

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = () => {
    const htmlContent = editorRef.current?.innerHTML || "";
    const textContent = htmlContent
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<div>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ");
    onSave(textContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 inter">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Cover Letter
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-gray-900 transition-colors rounded-md yellow hover:bg-yellow-100"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-6 py-3 border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => execCommand("bold")}
            className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => execCommand("italic")}
            className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => execCommand("underline")}
            className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
          <div className="w-px h-6 mx-2 bg-gray-300"></div>
          <button
            onClick={() => execCommand("justifyLeft")}
            className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => execCommand("justifyCenter")}
            className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => execCommand("justifyRight")}
            className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <div className="w-px h-6 mx-2 bg-gray-300"></div>
        </div>

        {/* Editor Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] bg-gray-50">
          <div className="max-w-4xl p-12 mx-auto bg-white border border-gray-200 shadow-lg">
            <div
              ref={editorRef}
              contentEditable={true}
              className="w-full min-h-[600px] text-sm text-gray-700 leading-relaxed focus:outline-none"
              style={{
                fontFamily: "inherit",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
              suppressContentEditableWarning={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
