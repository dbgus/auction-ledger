import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper,
  styled,
  Input,
  Grid,
  InputAdornment,
} from "@mui/material";
import { acquisitionTax } from "./acquisition-tax.const";

interface ContentType {
  bid: number;
  loanAmount: number;
  depositAmount: number; // 입찰 보증금
  acquisitionTax: number;
  legalExpenses: number;
  acceptanceDeposit: number; //인수 보증금
  movingExpenses: number;
  administrationCost: number; // 관리비
  repairCost: number;
  intermediaryFee: number;
}

interface SummaryType {
  balance: number;
  taxBalance: number;
  manageBalance: number;
}

interface InvestmentProps {
  content: ContentType;
  summary: SummaryType;
  onChange: (content: ContentType) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Investment = ({ content, onChange, summary }: InvestmentProps) => {
  return (
    <>
      <h1>투자 정보</h1>
      <Divider />

      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Item>
          <Grid container>
            <Grid item xs={3}>
              <p>낙찰가</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.bid}
                onChange={(e) =>
                  onChange({ ...content, bid: Number(e.target.value) })
                }
                endAdornment={
                  <InputAdornment position="end">원</InputAdornment>
                }
              ></Input>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <p>은행대출</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.loanAmount}
                onChange={(e) =>
                  onChange({ ...content, loanAmount: Number(e.target.value) })
                }
                endAdornment={
                  <InputAdornment position="end">원</InputAdornment>
                }
              ></Input>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <p>입찰보증금</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.depositAmount}
                onChange={(e) =>
                  onChange({
                    ...content,
                    depositAmount: Number(e.target.value),
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
              <p>잔금</p>
            </Grid>
            <Grid item xs={9}>
              <p>{summary.balance.toLocaleString()}원</p>
            </Grid>
          </Grid>
        </Item>

        <Item>
          <Grid container>
            <Grid item xs={3}>
              <p>취득세</p>
            </Grid>
            <Grid item xs={9}>
              <FormControl sx={{ minWidth: 120, height: 30 }} size="small">
                <InputLabel
                  id="demo-select-small"
                  className="MuiInputLabel-sizeSmall"
                >
                  취득세 종류
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="매물 분류"
                  defaultValue={""}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      acquisitionTax: Number(e.target.value),
                    })
                  }
                >
                  {Object.keys(acquisitionTax).map(
                    (item: string, index: number) => (
                      <MenuItem key={index} value={`${acquisitionTax[item]}`}>
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <p>법무비용</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.legalExpenses}
                onChange={(e) =>
                  onChange({
                    ...content,
                    legalExpenses: Number(e.target.value),
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
              <p>합계</p>
            </Grid>
            <Grid item xs={9}>
              <p>{summary.taxBalance.toLocaleString()}원</p>
            </Grid>
          </Grid>
        </Item>

        <Item>
          <Grid container>
            <Grid item xs={3}>
              <p>인수 보증금</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.acceptanceDeposit}
                onChange={(e) =>
                  onChange({
                    ...content,
                    acceptanceDeposit: Number(e.target.value),
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
              <p>명도비(이사비)</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.movingExpenses}
                onChange={(e) =>
                  onChange({
                    ...content,
                    movingExpenses: Number(e.target.value),
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
              <p>미납 관리비</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.administrationCost}
                onChange={(e) =>
                  onChange({
                    ...content,
                    administrationCost: Number(e.target.value),
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
              <p>수리비</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.repairCost}
                onChange={(e) =>
                  onChange({ ...content, repairCost: Number(e.target.value) })
                }
                endAdornment={
                  <InputAdornment position="end">원</InputAdornment>
                }
              ></Input>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <p>중개비</p>
            </Grid>
            <Grid item xs={9}>
              <Input
                value={content.intermediaryFee}
                onChange={(e) =>
                  onChange({
                    ...content,
                    intermediaryFee: Number(e.target.value),
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
              <p>합계</p>
            </Grid>
            <Grid item xs={9}>
              <p>{summary.manageBalance.toLocaleString()}원</p>
            </Grid>
          </Grid>
        </Item>
      </Stack>
      <Divider sx={{ marginTop: 2 }} />
    </>
  );
};

export default Investment;
