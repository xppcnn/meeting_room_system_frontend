import { ControllerProps } from "react-hook-form";
import TextFieldProps from "@mui/material/TextField";

type renderProps = Omit<TextFieldProps, "label">;
interface FromInputProps extends ControllerProps {
  control: ControllerProps.control;
  renderProps: renderProps;
  label: TextFieldProps.label;
}
