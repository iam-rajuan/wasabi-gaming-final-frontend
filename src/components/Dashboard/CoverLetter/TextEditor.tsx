'use client';

import React, { useState, useRef, useEffect } from "react";
import {
    X,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TextEditorProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    onSave: (content: string) => void;
}

// Rich Text Editor Component
const TextEditor: React.FC<TextEditorProps> = ({ isOpen, onClose, content, onSave }) => {
    const [editorContent, setEditorContent] = useState(content);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && editorRef.current) {
            editorRef.current.innerHTML = content.replace(/\n/g, "<br>");
        }
    }, [isOpen, content]);

    const execCommand = (command: string, value: string | undefined = undefined) => {
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-hidden p-0 inter">
                {/* Editor Header */}
                <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        Edit Cover Letter
                    </DialogTitle>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-medium text-gray-900 transition-colors rounded-md yellow hover:bg-yellow-100"
                        >
                            Save Changes
                        </Button>
                    </div>
                </DialogHeader>

                {/* Toolbar */}
                <div className="flex items-center gap-1 px-6 py-3 border-b border-gray-200 bg-gray-50">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => execCommand("bold")}
                        className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
                        title="Bold"
                    >
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => execCommand("italic")}
                        className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
                        title="Italic"
                    >
                        <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => execCommand("underline")}
                        className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
                        title="Underline"
                    >
                        <Underline className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 mx-2 bg-gray-300"></div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => execCommand("justifyLeft")}
                        className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
                        title="Align Left"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => execCommand("justifyCenter")}
                        className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
                        title="Align Center"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => execCommand("justifyRight")}
                        className="p-2 text-gray-700 transition-colors rounded hover:bg-gray-200"
                        title="Align Right"
                    >
                        <AlignRight className="w-4 h-4" />
                    </Button>
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
            </DialogContent>
        </Dialog>
    );
}

export default TextEditor;
