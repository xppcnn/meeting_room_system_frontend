import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ILoginForm } from "@services/user/types";
import useUserInfoStore from "@/stores/userInfo";
import { login } from "@/services/user/login";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required("用户名不得为空"),
    password: yup.string().required("密码不得为空"),
  })
  .required();
const Login = () => {
  const { setUserInfo } = useUserInfoStore();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<ILoginForm> = async (params) => {
    const res = await login(params);
    const { data, code } = res;
    if (code === 200) {
      const userInfo = {
        ...data.userInfo,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      setUserInfo(userInfo);
    }
  };

  const goRegister = () => {
    navigate("/register");
  };
  const goResetPwd = () => {
    navigate("/updatePassword");
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className="mt-8 flex flex-col items-center">
        <Typography component="h1" variant="h5">
          会议系统
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                helperText={error?.message}
                label="用户名"
                required
                fullWidth
                margin="normal"
                autoFocus
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                helperText={error?.message}
                label="密码"
                required
                fullWidth
                margin="normal"
                type="password"
                autoComplete="current-password"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登录
          </Button>
          <div className="flex justify-between">
            <Link onClick={goRegister}>创建账号</Link>
            <Link onClick={goResetPwd}>忘记密码？</Link>
          </div>
        </Box>
      </div>
    </Container>
  );
};

export default Login;
