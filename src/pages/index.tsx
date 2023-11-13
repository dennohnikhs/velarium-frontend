import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h1" textAlign="center">
        Hello
      </Typography>
      <Typography variant="h2" textAlign="center">
        Hello
      </Typography>
      <Typography variant="h3" textAlign="center">
        Hello
      </Typography>
      <Box
        sx={{
          padding: "2em",
          borderRadius: "0.5em",
        }}
      >
        <Typography variant="h4" textAlign="center">
          Hello
        </Typography>
        <Typography variant="body1" textAlign="center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
          voluptates?
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
