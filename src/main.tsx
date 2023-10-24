import ReactDOM from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Routers from "./routes";
import defaultTheme from "./theme";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ToastContainer
        theme="colored"
        hideProgressBar={true}
        autoClose={1000}
        position="top-center"
      />
      <Routers></Routers>
    </ThemeProvider>
  </StyledEngineProvider>
);
