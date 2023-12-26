import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function Top({ mode, setMode }) {
  const [display, setDisplay] = useState(true);

  const darkModeHandler = () => {
    setDisplay(false);
    setMode(true);
  };

  const lightModeHandler = () => {
    setDisplay(true);
    setMode(false);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: mode ? "hsl(201, 24%, 21%)" : "white",
        color: mode ? "white" : "black",
      }}
    >
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <b> Where in the world?</b>
        </Typography>

        {display ? (
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <IconButton onClick={darkModeHandler}>
              <DarkModeOutlinedIcon sx={{ color: mode ? "white" : "black" }} />
            </IconButton>
            <Typography>DarkMode</Typography>
          </Stack>
        ) : (
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <IconButton onClick={lightModeHandler}>
              <LightModeOutlinedIcon
                sx={{ color: mode ? "white" : "black" }}
              />
            </IconButton>
            <Typography>LightMode</Typography>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Top;
