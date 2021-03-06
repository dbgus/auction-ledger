/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { requestPost } from "../../utils/axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Income from "../Income";
import Investment from "../investment";
import PropertyInfo from "../property-info";
import Spend from "../spend";
import StepComponent from "../step";

const stepLabel = ["매물 정보", "투자정보", "수입", "지출"];

const step1InitContent = {
  address: "",
  category: "",
};

const step2InitContent = {
  bid: 0,
  loanAmount: 0,
  depositAmount: 0,
  acquisitionTax: 0, // 취득세
  legalExpenses: 0,
  acceptanceDeposit: 0, //인수 보증금
  movingExpenses: 0,
  administrationCost: 0, // 관리비
  repairCost: 0,
  intermediaryFee: 0,
};

const step2InitSummary = {
  balance: 0,
  taxBalance: 0,
  manageBalance: 0,
};

const step3InitContent = {
  monthlyAmount: 0,
  monthlyDeposit: 0,
  rent: 0,
  sell: 0,
};

interface Istep4InitContent {
  interestRate: number | string;
  operatingExpenses: number | string;
  transferIncomeTax: number | string;
  localIncomeTax: number | string;
}

const step4InitContent: Istep4InitContent = {
  interestRate: 0,
  operatingExpenses: 0,
  transferIncomeTax: 0,
  localIncomeTax: 0,
};
const Ledger = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [step, setStep] = useState<number>(0);
  const [step1Content, setStep1Content] = useState(step1InitContent);
  const [step2Content, setStep2Content] = useState(step2InitContent);
  const [step2Summary, setStep2Summary] = useState(step2InitSummary);
  const [step3Content, setStep3Content] = useState(step3InitContent);
  const [step4Content, setStep4Content] = useState(step4InitContent);
  useEffect(() => {
    if (id) {
    }
  });
  useEffect(() => {
    setStep2Summary({
      ...step2Summary,
      balance: step2Content.bid - step2Content.depositAmount,
    });
  }, [step2Content.bid, step2Content.depositAmount]);

  useEffect(() => {
    setStep2Summary({
      ...step2Summary,
      taxBalance:
        (step2Content.bid / 100) * step2Content.acquisitionTax +
        step2Content.legalExpenses,
    });
  }, [step2Content.acquisitionTax, step2Content.legalExpenses]);

  useEffect(() => {
    setStep2Summary({
      ...step2Summary,
      manageBalance:
        step2Content.acceptanceDeposit +
        step2Content.movingExpenses +
        step2Content.administrationCost +
        step2Content.repairCost +
        step2Content.intermediaryFee,
    });
  }, [
    step2Content.acceptanceDeposit,
    step2Content.movingExpenses,
    step2Content.administrationCost,
    step2Content.repairCost,
    step2Content.intermediaryFee,
  ]);

  const components = [
    <PropertyInfo
      content={step1Content}
      onChange={(content) => setStep1Content(content)}
    />,
    <Investment
      content={step2Content}
      onChange={(content) => setStep2Content(content)}
      summary={step2Summary}
    />,
    <Income
      content={step3Content}
      onChange={(content) => setStep3Content(content)}
    />,
    <Spend
      content={step4Content}
      onChange={(content) => setStep4Content(content)}
    />,
  ];
  const createLedgerRequest = () => {
    requestPost(
      "/ledger",
      {},
      { ...step1Content, ...step2Content, ...step3Content, ...step4Content }
    ).then(() => {
      navigate("/");
    });
  };

  const moveToMain = () => {
    if (location.pathname.includes("update") || !id) {
      if (window.confirm("작성하신 내용이 저장되지 않습니다.")) {
        navigate("/");
      }
    }
    navigate("/");
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        marginTop: 100,
        marginBottom: 100,
      }}
    >
      <ArrowBackIcon
        sx={{ position: "fixed", top: 30, left: 30, cursor: "pointer" }}
        onClick={() => moveToMain()}
      />
      <StepComponent
        step={step}
        stepLabel={stepLabel}
        stepChange={(step: number) => setStep(step)}
        currentViewComponent={components[step]}
        submit={() => createLedgerRequest()}
      />
    </div>
  );
};

export default Ledger;
