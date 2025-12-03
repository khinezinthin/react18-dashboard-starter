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
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { XIcon } from "lucide-react";
import {
  FormInput,
  FormCheckbox,
  FormSelect,
  FormTextarea,
  FormPassword,
  FormPasswordWithToggle,
  FormFileInput,
  FormFileInput2,
} from "@/components/form";

const DashboardSection = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      status: "draft" as const,
      description: "",
      password: "",
      confirmPassword: "",
      image: null,
      image2: null,
      notifications: {
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
      <div className="container px-4 mx-auto my-6">
        <form onSubmit={form.handleSubmit(handleProjectCreate)}>
          <FieldGroup>
            <FormInput control={form.control} name="name" label="Name" />

            <FormSelect control={form.control} name="status" label="Status">
              {PROJECT_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </FormSelect>

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              description="Be as detailed as possible"
            />

            <FormPassword
              control={form.control}
              name="password"
              label="Password"
              description="Enter your password"
            />

            <FormPasswordWithToggle
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              description="Confirm your password with show/hide toggle"
            />

            <FormFileInput
              control={form.control}
              name="image"
              label="Image Upload"
              description="Upload an image file (drag and drop or click to select)"
              accept="image/*"
              showPreview={true}
            />

            <FormFileInput2
              control={form.control}
              name="image2"
              label="File Upload (Shadcn Input)"
              description="Standard file input using shadcn Input component"
              accept="image/*"
            />

            <FieldSet>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>
                Select how you would like to receive notifications.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                <FormCheckbox
                  name="notifications.email"
                  label="Email"
                  control={form.control}
                />
                <FormCheckbox
                  name="notifications.sms"
                  label="Text"
                  control={form.control}
                />
                <FormCheckbox
                  name="notifications.push"
                  label="In App"
                  control={form.control}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <div className="flex justify-between gap-2 items-center">
                <FieldContent>
                  <FieldLegend variant="label" className="mb-0">
                    User Email Addresses
                  </FieldLegend>
                  <FieldDescription>
                    Add up to 5 users to this project (including yourself).
                  </FieldDescription>
                  {form.formState.errors.users?.root && (
                    <FieldError errors={[form.formState.errors.users.root]} />
                  )}
                </FieldContent>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addUser({ email: "" })}
                >
                  Add User
                </Button>
              </div>
              <FieldGroup>
                {users.map((user, index) => (
                  <Controller
                    key={user.id}
                    name={`users.${index}.email`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              {...field}
                              id={`${field.name}-${index}`}
                              aria-invalid={fieldState.invalid}
                              aria-label={`User ${index + 1} email`}
                              type="email"
                            />
                            {users.length > 1 && (
                              <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                  type="button"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => removeUser(index)}
                                  aria-label={`Remove User ${index + 1}`}
                                >
                                  <XIcon />
                                </InputGroupButton>
                              </InputGroupAddon>
                            )}
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
              </FieldGroup>
            </FieldSet>
            <Button type="submit">Create</Button>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
};

export default DashboardSection;
