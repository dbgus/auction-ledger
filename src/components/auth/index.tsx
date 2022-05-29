import {
  Container,
  Divider,
  Grid,
  Paper,
  styled,
  Input,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { requestPost } from "../../utils/axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

interface LoginContentType {
  email: string;
  password: string;
  passwordCheck?: string | null;
  name?: string;
}

interface LoginProps {
  content: LoginContentType;
  changeView: (flag: "login" | "register") => void;
  onChange: (content: LoginContentType) => void;
  onSubmit: () => void;
}

const Login = ({ content, changeView, onChange, onSubmit }: LoginProps) => {
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Typography>이메일</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.email}
            onChange={(e) => onChange({ ...content, email: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item xs={3}>
          <Typography>비밀번호</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.password}
            type="password"
            onChange={(e) => onChange({ ...content, password: e.target.value })}
          />
        </Grid>
      </Grid>
      <Button
        sx={{ display: "block", margin: "50px auto 0 auto", width: "60%" }}
        variant="contained"
        onClick={() => onSubmit()}
      >
        로그인
      </Button>
      <Button
        variant="text"
        sx={{
          display: "block",
          margin: "10px auto 0 auto",
          size: "12px",
        }}
        onClick={() => changeView("register")}
      >
        회원가입
      </Button>
    </>
  );
};

const Register = ({ content, changeView, onChange, onSubmit }: LoginProps) => {
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Typography>이메일</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.email}
            onChange={(e) => onChange({ ...content, email: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item xs={3}>
          <Typography>비밀번호</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.password}
            type="password"
            onChange={(e) => onChange({ ...content, password: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item xs={3}>
          <Typography>비밀번호 확인</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.passwordCheck}
            error={content.password !== content.passwordCheck}
            type="password"
            onChange={(e) =>
              onChange({ ...content, passwordCheck: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item xs={3}>
          <Typography>이름</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.name}
            onChange={(e) => onChange({ ...content, name: e.target.value })}
          />
        </Grid>
      </Grid>

      <Button
        sx={{ display: "block", margin: "50px auto 0 auto", width: "60%" }}
        variant="contained"
        onClick={() => {
          if (
            content.email &&
            content.password &&
            content.password === content.passwordCheck &&
            content.name
          )
            onSubmit();
        }}
      >
        회원가입
      </Button>
      <Button
        variant="text"
        sx={{
          display: "block",
          margin: "10px auto 0 auto",
          size: "12px",
        }}
        onClick={() => changeView("login")}
      >
        로그인
      </Button>
    </>
  );
};

const Auth = () => {
  const navigate = useNavigate();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackLevel, setSnackLevel] = useState<"error" | "success" | undefined>(
    undefined
  );
  const [flag, setFlag] = useState<"login" | "register">("login");
  const [loginInfo, setLoginInfo] = useState<LoginContentType>({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });

  useEffect(() => {
    // check token
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  const loginRequest = (loginInfo: LoginContentType) => {
    requestPost("/auth/signin", {}, loginInfo).then((res: any) => {
      localStorage.setItem("token", res.token);
      navigate("/");
    });
  };
  const registerRequest = (loginInfo: LoginContentType) => {
    requestPost("/auth/signup", {}, loginInfo)
      .then(() => {
        setSnackbarMessage("회원가입 성공");
        setSnackLevel("success");
        setLoginInfo({
          email: "",
          password: "",
          passwordCheck: "",
          name: "",
        });
        setFlag("login");
      })
      .catch((err) => {
        switch (err.response.data.message) {
          case "duplicated user":
            setSnackbarMessage("이미 등록된 유저입니다.");
            setSnackLevel("error");
            break;

          default:
            break;
        }
        setIsSnackbarOpen(true);
      });
  };
  return (
    <>
      <Container sx={{ marginTop: 12.5 }}>
        <h1>{flag === "login" ? "로그인" : "회원가입"}</h1>
        <Divider />
        <Item
          sx={{
            width: "50%",
            margin: "auto",
            padding: "30px 20px 10px 20px",
            marginTop: 4,
          }}
        >
          {flag === "login" ? (
            <Login
              content={loginInfo}
              changeView={(flag) => setFlag(flag)}
              onChange={(content) => setLoginInfo(content)}
              onSubmit={() => loginRequest(loginInfo)}
            />
          ) : (
            <Register
              content={loginInfo}
              changeView={(flag) => setFlag(flag)}
              onChange={(content) => setLoginInfo(content)}
              onSubmit={() => registerRequest(loginInfo)}
            />
          )}
        </Item>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert severity={snackLevel} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Auth;
