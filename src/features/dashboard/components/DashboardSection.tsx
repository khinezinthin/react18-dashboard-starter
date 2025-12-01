import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PROJECT_STATUSES, projectSchema } from "../schema/project";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const DashboardSection = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      status: "draft" as const,
      description: "",
      notification: {
        email: false,
        sms: false,
        push: false,
      },
    },
    resolver: zodResolver(projectSchema),
  });

  const handleProjectCreate = (data: z.infer<typeof projectSchema>) => {
    console.log(data);
  };
  return (
    <section>
      Home Dashboard
      <form onSubmit={form.handleSubmit(handleProjectCreate)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldDescription>
                    Be as specific as possible
                  </FieldDescription>
                </FieldContent>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="status"
            render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger
                    id={field.name}
                    onBlur={onBlur}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FieldSet>
            <FieldContent>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>
                Select how you would like toreceie notifications
              </FieldDescription>
            </FieldContent>

            <FieldGroup data-slot="checkbox-group">
              <Controller
                control={form.control}
                name="notification.email"
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="notification.sms"
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Text</FieldLabel>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="notification.push"
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>In App</FieldLabel>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <Button>Submit</Button>
        </FieldGroup>
      </form>
    </section>
  );
};

export default DashboardSection;
