import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./assets/theme";
import "./App.css";
import { Routes } from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthUser } from "./actions/authActions";
function App() {
  const { isLoadingInitial } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isLoadingInitial && <Routes />}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
