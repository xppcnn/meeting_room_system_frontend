import { ChangeEvent, useState } from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import ModeIcon from "@mui/icons-material/Mode";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormHelperText from "@mui/material/FormHelperText";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { INickNameForm } from "@/services/user/types";
// import { FormControl } from "@mui/material";

const Account = () => {
  const [open, setOpen] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const openAvatar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { control, getValues, handleSubmit } = useForm<INickNameForm>({
    defaultValues: {
      name: "",
    },
  });

  const changeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0];
      const isLimit5M = file.size / 1024 / 1024 > 5;
      if (isLimit5M) {
        toast.warn("请上传小于5M图片");
        return;
      }
      setFile(file);
    }
  };

  const deleteFile = () => {
    setFile(null);
  };

  const saveName = async (data) => {
    console.log("🚀 ~ file: Account.tsx:71 ~ saveName ~ data:", data);
  };

  return (
    <div>2222</div>
    // <Card>
    //   <CardContent>
    //     <div className="text-xs">基本信息</div>
    //     <div className="my-6 flex items-center">
    //       <Tooltip title="点击修改头像">
    //         <Avatar src="" onClick={openAvatar} />
    //       </Tooltip>
    //       <div className="text-base ml-2 flex items-center">
    //         <span>徐伟良</span>
    //         <ModeIcon
    //           color="secondary"
    //           fontSize="small"
    //           sx={{ marginLeft: "5px", cursor: "pointer" }}
    //           onClick={() => setOpenName(true)}
    //         />
    //       </div>
    //     </div>
    //   </CardContent>
    //   <BootstrapDialog open={openName}>
    //     <DialogContent sx={{ width: 500 }}>
    //       <form noValidate>
    //         <Controller
    //           name="name"
    //           control={control}
    //           rules={{
    //             required: {
    //               value: true,
    //               message: "请填写",
    //             },
    //           }}
    //           render={({ field, fieldState: { error } }) => {
    //             console.log(
    //               "🚀 ~ file: Account.tsx:104 ~ Account ~ error:",
    //               error
    //             );
    //             return (
    //               <TextField
    //                 {...field}
    //                 error={!!error}
    //                 helperText={error?.message}
    //                 variant="standard"
    //                 placeholder="请输入你的昵称"
    //               />
    //             );
    //           }}
    //         />
    //       </form>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose}>取消</Button>
    //       <Button onClick={handleSubmit(saveName)}>确认</Button>
    //     </DialogActions>
    //   </BootstrapDialog>
    //   <BootstrapDialog open={open}>
    //     <DialogTitle sx={{ fontSize: 16 }}>修改头像</DialogTitle>
    //     <DialogContent sx={{ width: 500 }}>
    //       <div className="flex">
    //         <img
    //           alt=""
    //           className="w-24 h-24"
    //           src={
    //             file
    //               ? URL.createObjectURL(file)
    //               : "https://tse2-mm.cn.bing.net/th/id/OIP-C.bzG4kOEumPT5t--i07WSQwAAAA?pid=ImgDet&rs=1"
    //           }
    //         />
    //         <Button
    //           component="label"
    //           variant="outlined"
    //           sx={{ height: 35, marginLeft: 10, alignItems: "flex-end" }}
    //         >
    //           选择图片
    //           <VisuallyHiddenInput
    //             type="file"
    //             onChange={changeUpload}
    //             accept="image/jpeg,image/jpg,image/png,image/gif"
    //           />
    //         </Button>
    //         {file && <Button onClick={deleteFile}>删除</Button>}
    //       </div>

    //       <div className="mt-2 text-zinc-400 text-sm">
    //         仅支持5M以内的jpg/ jpeg/ png/ gif 文件
    //       </div>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose} variant="outlined">
    //         取消
    //       </Button>
    //       <Button onClick={handleClose} variant="contained" disabled={!file}>
    //         确认
    //       </Button>
    //     </DialogActions>
    //   </BootstrapDialog>
    // </Card>
  );
};

export default Account;
