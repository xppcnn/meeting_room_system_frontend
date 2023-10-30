import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useCountDown from "@/hooks/useCountDown";
import { getResetPswSms, resetPsw } from "@/services/user/login";
import { IResetPswForm } from "@/services/user/types";
import {
  Flex,
  Heading,
  Stack,
  Box,
  useColorModeValue,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  HStack,
  Button,
} from "@chakra-ui/react";

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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading>XPPCNN 会 议 系 统</Heading>
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
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="email">邮箱</FormLabel>
                    <Input
                      id="email"
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
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="email">新密码</FormLabel>
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
                    <FormLabel htmlFor="email">确认密码</FormLabel>
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
            </Stack>
            <Stack spacing={10} pt={2}>
              <Button
                bg={"blue.400"}
                type="submit"
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                重置密码
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default UpdatePassword;
