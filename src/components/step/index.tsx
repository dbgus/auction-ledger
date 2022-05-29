import * as React from "react";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";

interface StepComponentProps {
  step: number;
  stepLabel: string[];
  stepChange: (e: number) => void;
  currentViewComponent: React.ReactElement;
  submit: () => void;
}

const StepComponent = ({
  step,
  stepLabel,
  stepChange,
  currentViewComponent,
  submit,
}: StepComponentProps) => {
  return (
    <>
      <Stepper activeStep={step}>
        {stepLabel.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {currentViewComponent}

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={step === 0}
          onClick={() => stepChange(step - 1)}
          sx={{ mr: 1 }}
        >
          이전
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          onClick={() =>
            step === stepLabel.length - 1 ? submit() : stepChange(step + 1)
          }
        >
          {step === stepLabel.length - 1 ? "저장" : "다음"}
        </Button>
      </Box>
    </>
  );
};

export default StepComponent;
