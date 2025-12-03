import { Input } from "../ui/input";
import { FormBase, type FormControlProps } from "./FormBase";
import type { FieldPath, FieldValues } from "react-hook-form";

export type FormFileInput2Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormControlProps<TFieldValues, TName> & {
  accept?: string;
  multiple?: boolean;
};

export function FormFileInput2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ accept, multiple, ...props }: FormFileInput2Props<TFieldValues, TName>) {
  return (
    <FormBase {...props}>
      {(field) => {
        // File inputs cannot be controlled with value prop
        // We need to destructure and exclude value and ref, then handle onChange separately
        const { value, ref, onChange, ...inputProps } = field;

        return (
          <Input
            {...inputProps}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => {
              const files = e.target.files;
              field.onChange(files);
            }}
            onBlur={field.onBlur}
          />
        );
      }}
    </FormBase>
  );
}
