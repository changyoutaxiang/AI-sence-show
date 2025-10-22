import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label: string;
  aspectRatio?: "square" | "video";
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  aspectRatio = "video",
  placeholder = "点击上传图片"
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value || undefined);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "文件类型错误",
        description: "请上传图片文件",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "文件过大",
        description: "图片大小不能超过 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("上传失败");
      }

      const data = await response.json();
      onChange(data.url);

      toast({
        title: "上传成功",
        description: "图片已成功上传",
      });
    } catch (error) {
      toast({
        title: "上传失败",
        description: "图片上传失败，请重试",
        variant: "destructive",
      });
      setPreviewUrl(undefined);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-video";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <div className={`relative ${aspectClass} w-full border-2 border-dashed rounded-lg overflow-hidden bg-muted/50 hover:bg-muted/70 transition-colors`}>
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleClick}
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                重新上传
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="w-4 h-4 mr-2" />
                移除
              </Button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={uploading}
            className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            {uploading ? (
              <>
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">上传中...</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{placeholder}</p>
                <p className="text-xs text-muted-foreground">支持 JPG、PNG、GIF、WebP，最大 5MB</p>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
