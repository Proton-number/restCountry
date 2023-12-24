import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function Top() {
  return (
    <AppBar sx={{ backgroundColor: "white", color: "black", }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow:1 }}>
          <b> Where in the world?</b>
        </Typography>

        <Stack direction="row" sx={{ alignItems: "center" }}>
          <IconButton>
            <DarkModeOutlinedIcon />
          </IconButton>
          <Typography>DarkMode</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Top;
