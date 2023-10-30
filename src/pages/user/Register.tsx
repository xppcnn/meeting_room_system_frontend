import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useCountDown from "@/hooks/useCountDown";
import { registerSms, register } from "@/services/user/login";
import { IRegisterForm } from "@/services/user/types";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Button,
  Text,
  Link,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("用户名不得为空")
      .min(3, "用户名不得少于三个字符")
      .max(20),
    nickName: yup.string().required("昵称不得为空"),
    password: yup.string().required("密码不得为空").min(6).max(30),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "两次密码不一致")
      .required("请确认密码"),
    email: yup.string().email("请输入正确格式").required("邮箱不得为空"),
    captcha: yup.string().required("验证码不得为空"),
  })
  .required();
const Register = () => {
  const { control, handleSubmit, getValues, trigger } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { count, start } = useCountDown(60);
  const handleSave: SubmitHandler<IRegisterForm> = async (params) => {
    const lastParams = {
      ...params,
    };
    delete lastParams.passwordConfirm;
    await register(lastParams);
  };

  const sendSms = async () => {
    const flag = await trigger("email");
    if (flag) {
      const res = await registerSms({ address: getValues()?.email });
      if (res.code === 200) {
        start();
      }
    }
  };

  const goToLogin = () => {
    navigate("/user/login");
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
          <form noValidate onSubmit={handleSubmit(handleSave)}>
            <Stack spacing={4}>
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="username">用户名</FormLabel>
                    <Input id="username" placeholder="请输入" {...field} />
                    <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <Controller
                name="nickName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="nickName">昵称</FormLabel>
                    <Input id="nickName" placeholder="请输入" {...field} />
                    <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="password">密码</FormLabel>
                    <Input
                      id="password"
                      placeholder="请输入"
                      {...field}
                      type="password"
                    />
                    <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="passwordConfirm">确认密码</FormLabel>
                    <Input
                      id="passwordConfirm"
                      placeholder="请输入"
                      {...field}
                      type="password"
                    />
                    <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="passwordConfirm">邮箱</FormLabel>
                    <Input
                      id="passwordConfirm"
                      placeholder="请输入"
                      {...field}
                      type="email"
                    />
                    <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <HStack>
                <Box>
                  <Controller
                    name="captcha"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl isInvalid={!!error}>
                        <FormLabel htmlFor="captcha">验证码</FormLabel>
                        <Input id="captcha" placeholder="请输入" {...field} />
                        <FormErrorMessage>
                          {error && error.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  />
                </Box>
                <Box alignSelf="flex-end">
                  <Button
                    variant="contained"
                    onClick={sendSms}
                    disabled={count !== 60}
                  >
                    {count === 60 ? "获取验证码" : `${count}秒后重新获取`}
                  </Button>
                </Box>
              </HStack>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  注册
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  已有账号?{" "}
                  <Link color={"blue.400"} onClick={goToLogin}>
                    登录
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
