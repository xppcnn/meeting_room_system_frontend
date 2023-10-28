import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Heading,
  Container,
} from "@chakra-ui/react";
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

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
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
      navigate("/dashboards");
    }
  };

  const goRegister = () => {
    navigate("/user/register");
  };
  const goResetPwd = () => {
    navigate("/user/updatePassword");
  };
  return (
    <Container>
      <div className="mt-8 flex flex-col items-center">
        <Heading fontSize={"4xl"}>会议系统</Heading>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.username}>
            {/* <FormLabel htmlFor="name">First name</FormLabel> */}
            <Input
              id="username"
              placeholder="username"
              {...register("username", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
            登录
          </Button>
          <div className="flex justify-between">
            {/* <Link onClick={goRegister}>创建账号</Link>
            <Link onClick={goResetPwd}>忘记密码？</Link> */}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
