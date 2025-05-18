// "use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";


interface ImageUploadProps {
  onFileChange: (file: File | null) => void;
  defaultImageUrl?: string;
}

export default function ImageUpload({ onFileChange, defaultImageUrl = "" }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(defaultImageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview("");
    }
    onFileChange(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
    onFileChange(null);
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative h-52 w-full rounded-md overflow-hidden border border-gray-200">
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          <button
            className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-1 text-white"
            onClick={handleRemove}
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className="h-52 w-full border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload property image</p>
          <p className="text-xs text-gray-400 mt-1">(Optional)</p>
        </div>
      )}

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
