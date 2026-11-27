import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

const ACCEPTED = ["image/png", "image/jpeg", "image/webp"];
const MAX_WIDTH = 1200;

// The API stores `image` as a string, so uploaded files are downscaled and
// sent as a compressed JPEG data URL (~100–250 KB) instead of the raw file.
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_WIDTH / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this image."));
    };
    img.src = url;
  });
}

export default function ImagePicker({ value, onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");

  async function handleFile(file) {
    setError("");
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("Please choose a PNG, JPG or WEBP image.");
      return;
    }
    try {
      onChange(await fileToDataUrl(file));
    } catch (err) {
      setError(err.message);
    }
  }

  function applyUrl() {
    const url = urlInput.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) {
      setError("Image URL must start with http:// or https://");
      return;
    }
    setError("");
    onChange(url);
    setUrlInput("");
  }

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-[#E5E7EB]">
        <img src={value} alt="Featured preview" className="aspect-video w-full object-cover" />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 cursor-pointer"
          aria-label="Remove image"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center cursor-pointer ${
          dragging ? "border-[#4346EF] bg-[#EEF0FF]" : "border-[#E5E7EB] hover:border-[#4346EF]/50"
        }`}
      >
        <Upload className="h-6 w-6 text-[#6B7280]" />
        <span className="mt-2 text-xs text-[#6B7280]">Click to upload or drag and drop</span>
        <span className="mt-0.5 text-[11px] text-[#9CA3AF]">PNG, JPG or WEBP</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <div className="mt-3 flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              applyUrl();
            }
          }}
          placeholder="or paste an image URL"
          className="min-w-0 flex-1 rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs text-[#0F1729] outline-none focus:border-[#4346EF]"
        />
        <button
          type="button"
          onClick={applyUrl}
          className="rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs font-medium text-[#0F1729] hover:bg-[#F9FAFB] cursor-pointer"
        >
          Add
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
