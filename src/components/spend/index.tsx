import {
  Divider,
  Stack,
  Grid,
  Input,
  InputAdornment,
  Paper,
  styled,
} from "@mui/material";

interface ContentType {
  interestRate: string | number;
  operatingExpenses: string | number;
  transferIncomeTax: string | number;
  localIncomeTax: string | number;
}

interface SpendProps {
  content: ContentType;
  onChange: (content: ContentType) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Spend = ({ content, onChange }: SpendProps) => {
  return (
    <>
      <h1>지출</h1>
      <Divider />
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Item>
          <Grid container>
            <Grid item xs={3}>
              <p>대출이자(연)</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.interestRate}
                onChange={(e) =>
                  onChange({
                    ...content,
                    interestRate: e.target.value,
                  })
                }
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              ></Input>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <p>관리 및 운영비</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.operatingExpenses}
                onChange={(e) =>
                  onChange({
                    ...content,
                    operatingExpenses: e.target.value,
                  })
                }
                endAdornment={
                  <InputAdornment position="end">원</InputAdornment>
                }
              ></Input>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <p>양도소득세</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.transferIncomeTax}
                onChange={(e) =>
                  onChange({
                    ...content,
                    transferIncomeTax: e.target.value,
                  })
                }
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              ></Input>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <p>지방소득세</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.localIncomeTax}
                onChange={(e) =>
                  onChange({
                    ...content,
                    localIncomeTax: e.target.value,
                  })
                }
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              ></Input>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <p>지출합계</p>
            </Grid>
            <Grid item xs={9}>
              {/* <p>{summary.balance.toLocaleString()}원</p> */}
            </Grid>
          </Grid>
        </Item>
      </Stack>
      <Divider sx={{ marginTop: 2 }} />
    </>
  );
};

export default Spend;
