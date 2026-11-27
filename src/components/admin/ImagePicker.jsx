import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function ImagePicker({ image, setImage }) {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError("Image must be smaller than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  function handleAddUrl() {
    if (!imageUrl.startsWith("http")) {
      setError("Please enter a valid image URL");
      return;
    }
    setImage(imageUrl);
    setImageUrl("");
    setError("");
  }

  if (image) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-[#E5E7EB]">
        <img src={image} alt="Featured" className="w-full h-44 object-cover" />
        <button
          type="button"
          onClick={() => setImage("")}
          className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 cursor-pointer"
        >
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E5E7EB] px-4 py-8 text-center hover:border-[#4346EF] cursor-pointer">
        <Upload className="size-6 text-[#6B7280]" />
        <span className="mt-2 text-xs text-[#6B7280]">Click to upload</span>
        <span className="mt-0.5 text-[11px] text-[#9CA3AF]">PNG, JPG or WEBP (max 1MB)</span>
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="or paste an image URL"
          className="flex-1 min-w-0 rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs text-[#0F1729] outline-none focus:border-[#4346EF]"
        />
        <button
          type="button"
          onClick={handleAddUrl}
          className="rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs font-medium text-[#0F1729] hover:bg-[#F9FAFB] cursor-pointer"
        >
          Add
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
