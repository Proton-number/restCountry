import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Popover,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

function Countries() {
  const [anchorEl1, setAnchorEl1] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Box>
      <Stack
        direction={{ sm: "row" }}
        spacing={{ xs: 4, sm: 20, lg: 124 }}
        sx={{
          alignItems: "center",
          padding: { sm: "90px", lg: "50px" },
        }}
      >
        <TextField
          placeholder="Search for a country...."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography>Filter by Region</Typography>
          <IconButton onClick={(e) => setAnchorEl1(e.currentTarget)}>
            <KeyboardArrowDownIcon />
          </IconButton>
          <Popover
            anchorEl={anchorEl1}
            open={Boolean(anchorEl1)}
            onClose={() => setAnchorEl1(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box sx={{ padding: "20px", textAlign: "left", width: "120px" }}>
              <Stack spacing={1}>
                <Typography sx={{ cursor: "pointer" }}>Africa</Typography>
                <Typography sx={{ cursor: "pointer" }}>America</Typography>
                <Typography sx={{ cursor: "pointer" }}>Asia</Typography>
                <Typography sx={{ cursor: "pointer" }}>Europe</Typography>
                <Typography sx={{ cursor: "pointer" }}>Oceania</Typography>
              </Stack>
            </Box>
          </Popover>
        </Stack>
      </Stack>

      <Box>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center" }}
          spacing={3}
        >
          <Grid item>
            <Paper
              sx={{
                padding: {
                  xs: 2.2,
                  lg: 3.4,
                },

                display: "flex",
                justifyContent: "center",
                borderRadius: "10px",
              }}
              elevation={4}
            >
              <Box component="img" />
              <Stack spacing={2}>
                <Typography variant="h5">Country Name</Typography>
                <Typography>Population:</Typography>
                <Typography>Region:</Typography>
                <Typography>Capital:</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Countries;
