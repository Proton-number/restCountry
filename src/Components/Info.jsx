import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

function Info() {
  return (
    <Stack>
      <Stack
        onClick={() => alert("testing...")}
        spacing={1}
        direction="row"
        sx={{
          alignItems: "center",
          padding: '12px',
            backgroundColor: "red",
            width: {
                xs:'20%',
                sm:'12%',
                lg:'5%'
            },
            justifyContent: 'center',
          boxShadow:'5px 2px 10px 4px #b3b3b3'
        }}
      >
        <WestOutlinedIcon />
        <Typography>Back</Typography>
      </Stack>

      <Stack
        spacing={{ xs:12, lg: 80 }}
        direction={{ xs: "column",  lg:'row' }}
        sx={{ justifyContent: "center", height: "70vh", alignItems: "center" }}
      >
        <Box component="img" /> khekjge
        <Stack spacing={{xs:3,sm:2, lg: 4 }}>
          <Typography variant="h3">Country</Typography>
          <Stack spacing={{xs:3, sm:6, lg: 15 }} direction={{ xs: "column",  lg:'row' }}>
            <Stack>
              <Typography>Native Name:</Typography>
              <Typography>Population:</Typography>
              <Typography>Region:</Typography>
              <Typography>Sub Region</Typography>
              <Typography>Capital:</Typography>
            </Stack>
            <Stack>
              <Typography>Top Level Domain:</Typography>
              <Typography>Currencies:</Typography>
              <Typography>Language:</Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{ alignItems: "center" }}
            spacing={1}
            direction={{ xs: "column", sm: "row" }}
          >
            <Typography>Border Countries:</Typography>
            <Stack direction="row" spacing={1}>
              <Box>Country1</Box>
              <Box>Country1</Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Info;
