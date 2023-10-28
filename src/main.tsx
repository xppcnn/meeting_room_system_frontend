import ReactDOM from "react-dom/client";
import "./index.css";
import Routers from "./routes";
import defaultTheme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={defaultTheme}>
    <Routers></Routers>
  </ChakraProvider>
);
