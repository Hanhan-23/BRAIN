"use client";

import { UploadSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function FileUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file) setFileName(file.name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="file-upload"
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${dragActive ? "dark:bg-gray-600" : "bg-gray-50 dark:bg-gray-700"}
          border-slate-500 dark:border-gray-600 dark:hover:bg-gray-600`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadSimpleIcon className="size-8" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Upload or drag and drop media
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {fileName ? `${fileName}` : ""}
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
