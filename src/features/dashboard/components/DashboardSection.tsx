import { Controller, useFieldArray, useForm } from "react-hook-form";
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
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { XIcon } from "lucide-react";
import FormInput from "@/components/form/Form";

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
      users: [
        {
          email: "",
        },
      ],
    },
    resolver: zodResolver(projectSchema),
  });

  const handleProjectCreate = (data: z.infer<typeof projectSchema>) => {
    console.log(data);
  };

  const {
    fields: users,
    append: addUser,
    remove: removeUser,
  } = useFieldArray({
    control: form.control,
    name: "users",
  });
  return (
    <section>
      Home Dashboard
      <form onSubmit={form.handleSubmit(handleProjectCreate)}>
        <FieldGroup>
          <FormInput control={form.control} name={"name"} label={"Name"}/>
          

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

          <FieldSeparator />

          <FieldSet>
            <div className=" flex justify-between">
              <FieldContent>
                <FieldLegend variant="label" className="mb-0">
                  User Emial Address
                </FieldLegend>
                <FieldDescription>
                  Add up to 5 users to this project
                </FieldDescription>
                {form.formState.errors.users?.root && (
                  <FieldError errors={[form.formState.errors.users?.root]} />
                )}
              </FieldContent>

              <Button
                variant={"outline"}
                size={"sm"}
                type="button"
                onClick={() => addUser({ email: "" })}
              >
                Add User Email
              </Button>
            </div>
            <FieldGroup>
              {users.map((user, index) => (
                <div key={user.id}>
                  <Controller
                    control={form.control}
                    name={`users.${index}.email`}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            aria-label={`users.${index + 1}.email`}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton type="button" aria-label={`Remove user ${index + 1}`} onClick={() => removeUser(index)}>
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              ))}
            </FieldGroup>
          </FieldSet>

          <Button>Submit</Button>
        </FieldGroup>
      </form>
    </section>
  );
};

export default DashboardSection;
