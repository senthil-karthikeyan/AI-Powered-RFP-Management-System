const FormError = ({
  isError,
  errors,
}: {
  isError: boolean
  errors: unknown[]
}) => {
  return isError ? (
    <em role="alert" className="text-red-500 text-xs">
      {errors.join(", ")}
    </em>
  ) : null
}

export default FormError
