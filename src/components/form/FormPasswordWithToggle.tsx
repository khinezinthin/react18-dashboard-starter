import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { FormBase, type FormControlProps } from "./FormBase";
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

type PasswordInputWithToggleProps = {
  field: Parameters<
    ControllerProps<FieldValues, FieldPath<FieldValues>>["render"]
  >[0]["field"] & {
    "aria-invalid": boolean;
    id: string;
  };
};

function PasswordInputWithToggle({ field }: PasswordInputWithToggleProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup>
      <InputGroupInput {...field} type={showPassword ? "text" : "password"} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export type FormPasswordWithToggleProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormControlProps<TFieldValues, TName>;

export function FormPasswordWithToggle<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormPasswordWithToggleProps<TFieldValues, TName>) {
  return (
    <FormBase {...props}>
      {(field) => <PasswordInputWithToggle field={field} />}
    </FormBase>
  );
}

