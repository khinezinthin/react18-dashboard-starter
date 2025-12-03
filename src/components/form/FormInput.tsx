import { Input } from "../ui/input";
import { FormBase, type FormControlProps } from "./FormBase";
import type { FieldPath, FieldValues } from "react-hook-form";

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormControlProps<TFieldValues, TName>;

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormInputProps<TFieldValues, TName>) {
  return <FormBase {...props}>{(field) => <Input {...field} />}</FormBase>;
}
