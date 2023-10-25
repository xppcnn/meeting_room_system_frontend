import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useCountDown from "@/hooks/useCountDown";
import { getResetPswSms, resetPsw } from "@/services/user/login";
import { IResetPswForm } from "@/services/user/types";

const schema = yup
  .object()
  .shape({
    password: yup.string().required("密码不得为空").min(6).max(30),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "两次密码不一致")
      .required("请确认密码"),
    email: yup.string().email("请输入正确格式").required("邮箱不得为空"),
    captcha: yup.string().required("验证码不得为空"),
  })
  .required();
const UpdatePassword = () => {
  const { control, handleSubmit, getValues, trigger } = useForm({
    resolver: yupResolver(schema),
  });
  const { count, start } = useCountDown(60);
  const handleSave: SubmitHandler<IResetPswForm> = async (params) => {
    const lastParams = {
      ...params,
    };
    delete lastParams.passwordConfirm;
    await resetPsw(lastParams);
  };

  const sendSms = async () => {
    const flag = await trigger("email");
    if (flag) {
      const res = await getResetPswSms({ address: getValues()?.email });
      if (res.code === 200) {
        start();
      }
    }
  };
  return (
    <div className="flex items-center mt-8 flex-col w-1/4 ml-auto mr-auto">
      <Typography component="h1" variant="h5">
        会议系统
      </Typography>
      <form noValidate onSubmit={handleSubmit(handleSave)}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              helperText={error?.message}
              label="邮箱"
              required
              fullWidth
              margin="normal"
              autoFocus
              type="email"
            />
          )}
        />
        <div className="flex justify-between items-center">
          <Controller
            name="captcha"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                helperText={error?.message}
                label="验证码"
                required
                className="w-2/3"
                margin="normal"
                autoFocus
              />
            )}
          />
          <Button variant="contained" onClick={sendSms} disabled={count !== 60}>
            {count === 60 ? "获取验证码" : `${count}秒后重新获取`}
          </Button>
        </div>
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              helperText={error?.message}
              label="新密码"
              required
              fullWidth
              margin="normal"
              autoFocus
              type="password"
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              helperText={error?.message}
              label="确认密码"
              required
              fullWidth
              margin="normal"
              type="password"
              autoFocus
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          重置密码
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
