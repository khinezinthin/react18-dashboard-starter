import { Input } from "../ui/input";
import { FormBase, type FormControlProps } from "./FormBase";
import type { FieldPath, FieldValues } from "react-hook-form";

export type FormPasswordProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormControlProps<TFieldValues, TName>;

export function FormPassword<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormPasswordProps<TFieldValues, TName>) {
  return (
    <FormBase {...props}>
      {(field) => <Input {...field} type="password" />}
    </FormBase>
  );
}
