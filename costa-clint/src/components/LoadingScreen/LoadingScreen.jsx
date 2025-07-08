import React from "react";
import { CircularProgress, Typography, Box, Fade } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const Container = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #00b0bb, #00afb9)",
  color: "white",
  textAlign: "center",
}));

const IconWrapper = styled(Box)(() => ({
  animation: `${pulse} 2s infinite`,
  marginBottom: "1rem",
}));

const LoadingScreen = () => {
  return (
    <Container>
      <Fade in={true} timeout={800}>
        <IconWrapper>
          <AirplanemodeActiveIcon sx={{ fontSize: 60 }} />
        </IconWrapper>
      </Fade>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Loading your experience...
      </Typography>

      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: "#ffffff",
          mt: 3,
        }}
      />
    </Container>
  );
};

export default LoadingScreen;
