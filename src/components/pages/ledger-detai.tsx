/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Stack, Paper, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestGet } from "../../utils/axios";

interface LedgerType {
  address: string;
  category: string;
  bid: number;
  loanAmount: number;
  depositAmount: number;
  acquisitionTax: number;
  legalExpenses: number;
  acceptanceDeposit: number;
  movingExpenses: number;
  administrationCost: number;
  repairCost: number;
  intermediaryFee: number;
  monthlyAmount: number;
  monthlyDeposit: number;
  rent: number;
  sell: number;
  interestRate: number;
  operatingExpenses: number;
  transferIncomeTax: number;
  localIncomeTax: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const LedgerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ledger, setLedger] = useState<LedgerType | null>(null);
  useEffect(() => {
    requestGet(`/ledger/${id}`, {}).then((ledger: any) => setLedger(ledger));
  }, []);

  if (ledger) {
    return (
      <div style={{ width: "50%", margin: "100px auto 100px auto" }}>
        <ArrowBackIcon
          sx={{ position: "fixed", top: 30, left: 30, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h1>{ledger.address}</h1>
        <Divider />
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <Item sx={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 100,
                padding: "0px 50px 0px 20px",
                textAlign: "center",
              }}
            >
              <h2>투자정보</h2>
            </div>
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }}>
                    <span>낙찰</span>
                  </div>
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        낙찰가
                      </span>
                      {ledger.bid.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        대출
                      </span>
                      {ledger.loanAmount.toLocaleString()}원 (비율 대출 비율
                      {(ledger.loanAmount / ledger.bid) * 10}%)
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        입찰 보증금
                      </span>
                      {ledger.depositAmount.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        잔금
                      </span>
                      {(ledger.bid - ledger.depositAmount).toLocaleString()}원
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }}>
                    <span> 취득비용 </span>
                  </div>
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        취득세
                      </span>
                      {Math.round(
                        ledger.acquisitionTax * (ledger.bid / 100)
                      ).toLocaleString()}
                      원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        법무비용
                      </span>
                      {ledger.legalExpenses.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        합계
                      </span>
                      {(
                        Math.round(ledger.acquisitionTax * (ledger.bid / 100)) +
                        ledger.legalExpenses
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }}>
                    <span> 기타비용 </span>
                  </div>
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        인수 보증금
                      </span>
                      {ledger.acceptanceDeposit.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        명도비(이사비)
                      </span>
                      {ledger.movingExpenses.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        미납 관리비
                      </span>
                      {ledger.administrationCost.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        수리비
                      </span>
                      {ledger.repairCost.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        중개비
                      </span>
                      {ledger.intermediaryFee.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        합계
                      </span>
                      {(
                        ledger.acceptanceDeposit +
                        ledger.movingExpenses +
                        ledger.administrationCost +
                        ledger.repairCost +
                        ledger.intermediaryFee
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }}>
                    <span> 투자금 </span>
                  </div>
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        총자기자본
                      </span>
                      {(
                        ledger.bid -
                        ledger.loanAmount +
                        ledger.acceptanceDeposit +
                        ledger.movingExpenses +
                        ledger.administrationCost +
                        ledger.repairCost +
                        ledger.intermediaryFee +
                        Math.round(ledger.acquisitionTax * (ledger.bid / 100)) +
                        ledger.legalExpenses
                      ).toLocaleString()}
                      원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        총투자금액
                      </span>
                      {(
                        ledger.bid +
                        ledger.acceptanceDeposit +
                        ledger.movingExpenses +
                        ledger.administrationCost +
                        ledger.repairCost +
                        ledger.intermediaryFee +
                        Math.round(ledger.acquisitionTax * (ledger.bid / 100)) +
                        ledger.legalExpenses
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Item>
          <Item sx={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 100,
                padding: "0px 50px 0px 20px",
                textAlign: "center",
              }}
            >
              <h2>수입</h2>
            </div>
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }}>
                    <span>월세</span>
                  </div>
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        보증금
                      </span>
                      {ledger.monthlyDeposit.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        임대수입(월세*12)
                      </span>
                      {(ledger.monthlyAmount * 12).toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        합계
                      </span>
                      {(ledger.monthlyAmount * 12).toLocaleString()}원
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }}>
                    <span>전세</span>
                  </div>
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        보증금
                      </span>
                      {ledger.rent.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        합계
                      </span>
                      {ledger.rent.toLocaleString()}원
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }}>
                    <span>매매</span>
                  </div>
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        매도가격
                      </span>
                      {ledger.sell.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        합계
                      </span>
                      {ledger.sell.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Item>
          <Item sx={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 100,
                padding: "0px 50px 0px 20px",
                textAlign: "center",
              }}
            >
              <h2>지출</h2>
            </div>
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }} />
                  <div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        대출이자(연)
                      </span>
                      {(
                        ledger.loanAmount *
                        (ledger.interestRate / 100)
                      ).toLocaleString()}
                      원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        관리 및 운영비
                      </span>
                      {ledger.operatingExpenses.toLocaleString()}원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        양도소득세
                      </span>
                      {(
                        (ledger.sell -
                          ledger.bid -
                          (Math.round(
                            ledger.acquisitionTax * (ledger.bid / 100)
                          ) +
                            ledger.legalExpenses) -
                          (ledger.acceptanceDeposit +
                            ledger.movingExpenses +
                            ledger.administrationCost +
                            ledger.repairCost +
                            ledger.intermediaryFee)) *
                        (ledger.transferIncomeTax / 100)
                      ).toLocaleString()}
                      원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        지방소득세
                      </span>
                      {(
                        (ledger.sell -
                          ledger.bid -
                          (Math.round(
                            ledger.acquisitionTax * (ledger.bid / 100)
                          ) +
                            ledger.legalExpenses) -
                          (ledger.acceptanceDeposit +
                            ledger.movingExpenses +
                            ledger.administrationCost +
                            ledger.repairCost +
                            ledger.intermediaryFee)) *
                        (ledger.transferIncomeTax / 100) *
                        (ledger.localIncomeTax / 100)
                      ).toLocaleString()}
                      원
                    </div>
                    <div>
                      <span style={{ width: 120, display: "inline-block" }}>
                        합계
                      </span>
                      {(
                        ledger.loanAmount * (ledger.interestRate / 100) +
                        ledger.operatingExpenses +
                        ((ledger.sell -
                          ledger.bid -
                          (Math.round(
                            ledger.acquisitionTax * (ledger.bid / 100)
                          ) +
                            ledger.legalExpenses) -
                          (ledger.acceptanceDeposit +
                            ledger.movingExpenses +
                            ledger.administrationCost +
                            ledger.repairCost +
                            ledger.intermediaryFee)) *
                          (ledger.transferIncomeTax / 100) +
                          (ledger.sell -
                            ledger.bid -
                            (Math.round(
                              ledger.acquisitionTax * (ledger.bid / 100)
                            ) +
                              ledger.legalExpenses) -
                            (ledger.acceptanceDeposit +
                              ledger.movingExpenses +
                              ledger.administrationCost +
                              ledger.repairCost +
                              ledger.intermediaryFee)) *
                            (ledger.transferIncomeTax / 100) *
                            (ledger.localIncomeTax / 100))
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Item>
          <Item sx={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 100,
                padding: "0px 50px 0px 20px",
                textAlign: "center",
              }}
            >
              <h2>수익</h2>
            </div>
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  <div style={{ width: 100 }} />
                  <div>
                    <div>
                      <span style={{ width: 150, display: "inline-block" }}>
                        매도시 수익금(1년기준)
                      </span>
                      {(
                        ledger.bid -
                        ledger.loanAmount -
                        (ledger.loanAmount * (ledger.interestRate / 100) +
                          ledger.operatingExpenses +
                          ((ledger.sell -
                            ledger.bid -
                            (Math.round(
                              ledger.acquisitionTax * (ledger.bid / 100)
                            ) +
                              ledger.legalExpenses) -
                            (ledger.acceptanceDeposit +
                              ledger.movingExpenses +
                              ledger.administrationCost +
                              ledger.repairCost +
                              ledger.intermediaryFee)) *
                            (ledger.transferIncomeTax / 100) +
                            (ledger.sell -
                              ledger.bid -
                              (Math.round(
                                ledger.acquisitionTax * (ledger.bid / 100)
                              ) +
                                ledger.legalExpenses) -
                              (ledger.acceptanceDeposit +
                                ledger.movingExpenses +
                                ledger.administrationCost +
                                ledger.repairCost +
                                ledger.intermediaryFee)) *
                              (ledger.transferIncomeTax / 100) *
                              (ledger.localIncomeTax / 100)))
                      ).toLocaleString()}
                      원
                    </div>
                    <div>
                      <span style={{ width: 150, display: "inline-block" }}>
                        합계
                      </span>
                      {(ledger.monthlyAmount * 12).toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Item>
        </Stack>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default LedgerDetail;
