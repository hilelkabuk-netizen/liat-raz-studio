"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  currentUrl?: string;
  onUpload?: (url: string) => void;
  name?: string;
  required?: boolean;
}

function compressImage(file: File, maxWidth = 1200, quality = 0.7): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;
      if (w > maxWidth) {
        h = (h * maxWidth) / w;
        w = maxWidth;
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas error"));
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Compression error"))),
        "image/jpeg",
        quality
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageUpload({
  currentUrl,
  onUpload,
  name,
  required,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || "");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      // Compress image client-side before uploading
      const compressed = await compressImage(file);
      const compressedFile = new File([compressed], file.name, { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("file", compressedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "שגיאה בהעלאת התמונה");
        setUploading(false);
        return;
      }

      setPreview(data.url);
      onUpload?.(data.url);
    } catch {
      setError("שגיאה בתקשורת עם השרת");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {name && <input type="hidden" name={name} value={preview} required={required} />}

      {preview && (
        <div className="mb-3 w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={preview}
            alt="תצוגה מקדימה"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {uploading ? "מעלה..." : preview ? "החלף תמונה" : "העלה תמונה"}
        </button>

        {preview && (
          <span className="text-xs text-gray-400 truncate max-w-[200px]">
            {preview}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
