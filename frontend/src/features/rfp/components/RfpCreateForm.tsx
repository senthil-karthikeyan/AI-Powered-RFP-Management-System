import { useRfps } from "@/services"
import { Button, Textarea, Label } from "@/components/ui"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { toast } from "sonner"
import FormError from "@/components/FormError"

export const RfpCreateForm = () => {
  const { useCreateRfp } = useRfps()
  const createRfp = useCreateRfp()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      rawInput: "",
    },
    onSubmit: async ({ value }) => {
      createRfp.mutate(value.rawInput, {
        onSuccess: (data) => {
          toast.success("RFP created successfully!")
          navigate({ to: "/rfps/$id", params: { id: data.id } })
        },
        onError: (error) => {
          toast.error(`Error creating RFP: ${error.message}`)
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
      className="space-y-4 max-w-2xl border p-4 rounded-md"
    >
      <form.Field
        name="rawInput"
        validators={{
          onChange: ({ value }) => {
            const res = z
              .string()
              .min(10, "Description must be at least 10 characters")
              .safeParse(value)
            return !res.success
              ? z.treeifyError(res.error).errors[0]
              : undefined
          },
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>RFP Description</Label>
            <Textarea
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Describe your requirements (e.g., 'Need 50 laptops for engineering team...')"
              className="h-32 resize-none"
            />
            <FormError
              isError={!field.state.meta.isValid}
              errors={field.state.meta.errors}
            />
          </div>
        )}
      />

      <Button type="submit" disabled={createRfp.isPending}>
        {createRfp.isPending ? "Generating RFP..." : "Create RFP"}
      </Button>
    </form>
  )
}
