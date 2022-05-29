import {
  Container,
  Divider,
  Grid,
  Paper,
  styled,
  Input,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

interface LoginContentType {
  id: string;
  password: string;
  passwordCheck?: string | null;
}

interface LoginProps {
  content: LoginContentType;
  changeView: (flag: "login" | "register") => void;
  onChange: (content: LoginContentType) => void;
}

const Login = ({ content, changeView, onChange }: LoginProps) => {
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Typography>아이디</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.id}
            onChange={(e) => onChange({ ...content, id: e.target.value })}
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
            onChange={(e) => onChange({ ...content, password: e.target.value })}
          />
        </Grid>
      </Grid>
      <Button
        sx={{ display: "block", margin: "50px auto 0 auto", width: "60%" }}
        variant="contained"
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

const Register = ({ content, changeView, onChange }: LoginProps) => {
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Typography>아이디</Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ width: "80%" }}
            value={content.id}
            onChange={(e) => onChange({ ...content, id: e.target.value })}
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
            onChange={(e) =>
              onChange({ ...content, passwordCheck: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Button
        sx={{ display: "block", margin: "50px auto 0 auto", width: "60%" }}
        variant="contained"
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
  const [flag, setFlag] = useState<"login" | "register">("register");
  const [loginInfo, setLoginInfo] = useState<LoginContentType>({
    id: "",
    password: "",
    passwordCheck: "",
  });

  return (
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
          />
        ) : (
          <Register
            content={loginInfo}
            changeView={(flag) => setFlag(flag)}
            onChange={(content) => setLoginInfo(content)}
          />
        )}
      </Item>
    </Container>
  );
};

export default Auth;
