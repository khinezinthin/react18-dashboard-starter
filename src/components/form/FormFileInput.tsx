import { useRef, useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { FormBase, type FormControlProps } from "./FormBase";
import type { FieldPath, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type FileInputWithPreviewProps = {
  field: {
    value?: FileList | File | null;
    onChange: (value: FileList | File | null) => void;
    onBlur: () => void;
    name: string;
  } & {
    "aria-invalid": boolean;
    id: string;
  };
  accept?: string;
  showPreview?: boolean;
};

function FileInputWithPreview({
  field,
  accept,
  showPreview = true,
}: FileInputWithPreviewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (files && files.length > 0) {
        const file = files[0];
        // Store as File object for react-hook-form
        field.onChange(file);

        // Show preview if it's an image and showPreview is true
        if (showPreview && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setPreview(null);
        }
      } else {
        field.onChange(null);
        setPreview(null);
      }
    },
    [field, showPreview]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileChange(files);
      }
    },
    [handleFileChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e.target.files);
    },
    [handleFileChange]
  );

  const handleRemove = useCallback(() => {
    field.onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [field]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const selectedFile =
    field.value instanceof File
      ? field.value
      : field.value instanceof FileList && field.value.length > 0
      ? field.value[0]
      : null;
  const fileName = selectedFile?.name || "";

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        onBlur={field.onBlur}
        className="hidden"
        id={field.id}
        aria-invalid={field["aria-invalid"]}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "border-input dark:bg-input/30 relative flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "hover:border-primary/50 hover:bg-accent/50",
          field["aria-invalid"] &&
            "border-destructive ring-destructive/20 dark:ring-destructive/40"
        )}
      >
        {preview && showPreview ? (
          <div className="relative w-full">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-48 w-auto rounded-md object-contain"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon-sm"
              className="absolute right-2 top-2"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              aria-label="Remove image"
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            {selectedFile ? (
              <>
                <ImageIcon className="size-10 text-muted-foreground" />
                <p className="text-sm font-medium">{fileName}</p>
                <p className="text-xs text-muted-foreground">
                  Click to change file
                </p>
              </>
            ) : (
              <>
                <Upload className="size-10 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-muted-foreground">
                  {accept ? `Accepted: ${accept}` : "Any file type"}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      {selectedFile && !preview && (
        <div className="mt-2 flex items-center justify-between rounded-md border border-input bg-muted/50 px-3 py-2">
          <span className="text-sm truncate">{fileName}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            aria-label="Remove file"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export type FormFileInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormControlProps<TFieldValues, TName> & {
  accept?: string;
  showPreview?: boolean;
};

export function FormFileInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  accept,
  showPreview = true,
  ...props
}: FormFileInputProps<TFieldValues, TName>) {
  return (
    <FormBase {...props}>
      {(field) => (
        <FileInputWithPreview
          field={field as FileInputWithPreviewProps["field"]}
          accept={accept}
          showPreview={showPreview}
        />
      )}
    </FormBase>
  );
}
