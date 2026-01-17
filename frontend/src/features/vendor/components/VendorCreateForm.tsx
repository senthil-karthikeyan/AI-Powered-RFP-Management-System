import { useVendors } from "@/services"
import { Button, Input, Label } from "@/components/ui"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { toast } from "sonner"
import FormError from "@/components/FormError"

export const VendorCreateForm = () => {
  const { useCreateVendor } = useVendors()
  const createVendor = useCreateVendor()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validators: {
      onChange: ({ value }) => {
        const schema = z.object({
          name: z.string().min(1, "Name is required"),
          email: z.email("Invalid email").min(1, "Email is required"),
        })
        const result = schema.safeParse(value)
        if (!result.success) {
          return undefined // Simplified for now or check usage
        }
        return undefined
      },
    },
    // Actually, manual Zod is better done at Field Level for granularity without adapter
    onSubmit: async ({ value }) => {
      createVendor.mutate(value, {
        onSuccess: () => {
          toast.success("Vendor created successfully!")
          form.reset()
        },
        onError: (error) => {
          toast.error(`Error creating vendor: ${error.message}`)
        },
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4 max-w-md border p-4 rounded-md"
    >
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => (!value ? "Name is required" : undefined),
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Vendor Name</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Acme Corp"
            />
            <FormError
              isError={!field.state.meta.isValid}
              errors={field.state.meta.errors}
            />
          </div>
        )}
      />

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            const res = z.email("Invalid email address").safeParse(value)

            return !res.success
              ? z.treeifyError(res.error).errors[0]
              : undefined
          },
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="contact@acme.com"
            />
            <FormError
              isError={!field.state.meta.isValid}
              errors={field.state.meta.errors}
            />
          </div>
        )}
      />

      <Button type="submit" disabled={createVendor.isPending}>
        {createVendor.isPending ? "Creating..." : "Create Vendor"}
      </Button>
    </form>
  )
}
