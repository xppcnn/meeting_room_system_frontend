import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Heading,
  Box,
  Stack,
  Flex,
  useColorModeValue,
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
    formState: { errors },
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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>XPPCNN 会 议 系 统</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor="name">用户名</FormLabel>
                <Input
                  id="username"
                  placeholder="请输入"
                  {...register("username")}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">密码</FormLabel>
                <Input
                  id="password"
                  placeholder="请输入"
                  type="password"
                  {...register("password")}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Text onClick={goRegister}>创建账号</Text>
                  <Text onClick={goResetPwd} color={"blue.400"}>
                    忘记密码？
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  登录
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
