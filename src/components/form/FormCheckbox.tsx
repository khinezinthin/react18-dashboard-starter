import { Checkbox } from "../ui/checkbox";
import { FormBase, type FormControlProps } from "./FormBase";
import type { FieldPath, FieldValues } from "react-hook-form";

export type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormControlProps<TFieldValues, TName>;

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormCheckboxProps<TFieldValues, TName>) {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormBase>
  );
}
