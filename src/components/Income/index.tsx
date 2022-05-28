import {
  Divider,
  Grid,
  Input,
  InputAdornment,
  Paper,
  Stack,
  styled,
} from "@mui/material";

interface Content {
  monthlyAmount: number;
  monthlyDeposit: number;
  rent: number;
  sell: number;
}

interface IncomeProps {
  content: Content;
  onChange: (content: Content) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Income = ({ content, onChange }: IncomeProps) => {
  return (
    <>
      <h1>수입</h1>
      <Divider />
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Item>
          <Grid container>
            <Grid item xs={2} spacing={1} sx={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "45%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h3>월세</h3>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs={8} sx={{ marginLeft: 1 }} container spacing={2}>
              <Grid item xs={3}>
                <p>월세</p>
              </Grid>
              <Grid item xs={9}>
                <Input
                  value={content.monthlyAmount}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      monthlyAmount: Number(e.target.value),
                    })
                  }
                  endAdornment={
                    <InputAdornment position="end">원</InputAdornment>
                  }
                ></Input>
              </Grid>
              <Grid item xs={3}>
                <p>보증금</p>
              </Grid>
              <Grid item xs={9}>
                <Input
                  value={content.monthlyDeposit}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      monthlyDeposit: Number(e.target.value),
                    })
                  }
                  endAdornment={
                    <InputAdornment position="end">원</InputAdornment>
                  }
                ></Input>
              </Grid>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Grid container>
            <Grid item xs={2} spacing={1} sx={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "45%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h3>전세</h3>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs={8} sx={{ marginLeft: 1 }} container spacing={2}>
              <Grid item xs={3}>
                <p>보증금</p>
              </Grid>
              <Grid item xs={9}>
                <Input
                  value={content.rent}
                  onChange={(e) =>
                    onChange({ ...content, rent: Number(e.target.value) })
                  }
                  endAdornment={
                    <InputAdornment position="end">원</InputAdornment>
                  }
                ></Input>
              </Grid>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Grid container>
            <Grid item xs={2} spacing={1} sx={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "45%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h3>매매</h3>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs={8} sx={{ marginLeft: 1 }} container spacing={2}>
              <Grid item xs={3}>
                <p>매도가</p>
              </Grid>
              <Grid item xs={9}>
                <Input
                  value={content.sell}
                  onChange={(e) =>
                    onChange({ ...content, sell: Number(e.target.value) })
                  }
                  endAdornment={
                    <InputAdornment position="end">원</InputAdornment>
                  }
                ></Input>
              </Grid>
            </Grid>
          </Grid>
        </Item>
      </Stack>
      <Divider sx={{ marginTop: 2 }} />
    </>
  );
};

export default Income;
