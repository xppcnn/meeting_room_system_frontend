import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FromInputProps } from "./FormInputProps";

const FormInputText = ({
  control,
  name,
  label,
  renderProps,
  ...restProps
}: FromInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      {...restProps}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...renderProps}
          error={!!error}
          helperText={error?.message}
          label={label}
          required
          fullWidth
          margin="normal"
        />
      )}
    ></Controller>
  );
};

export default FormInputText;
