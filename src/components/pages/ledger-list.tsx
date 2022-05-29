import {
  Button,
  Divider,
  Fab,
  Grid,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestGet } from "../../utils/axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

interface ledger {
  id: number;
  address: string;
  bid: number;
}

const LedgerList = () => {
  const navigate = useNavigate();
  const [ledgerList, setLedgerList] = useState<ledger[]>([]);
  useEffect(() => {
    requestGet("/ledger", {}).then((res: any) => {
      setLedgerList(res);
    });
  }, [navigate]);

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        marginTop: 100,
        marginBottom: 100,
      }}
    >
      <h1>원장 리스트</h1>
      <Divider />
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        {ledgerList.map((ledger, index) => (
          <Item key={index}>
            <Grid container>
              <Grid item xs={1}>
                <p>{index + 1}</p>
              </Grid>
              <Grid item xs={6}>
                <p>주소: {ledger.address}</p>
              </Grid>
              <Grid item xs={3}>
                <p>낙찰가: {ledger.bid.toLocaleString()}</p>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`ledger/${ledger.id}`)}
                >
                  상세보기
                </Button>
              </Grid>
            </Grid>
          </Item>
        ))}
      </Stack>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={() => {
          navigate("/ledger/create");
        }}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default LedgerList;
