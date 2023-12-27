import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Info({ mode, isLoading, setIsLoading }) {
  const [country, setCountry] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${id}`)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data[0]);
        setCountry(data[0]); // Assuming the response is an array containing a single country object
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
        }}
      >
        <Box className="spinner"></Box>
      </Box>
    );
  }

  return (
    <Stack
      sx={{
        padding: { sm: "30px" },
        backgroundColor: mode ? "hsl(201, 24%, 21%)" : "white",
        color: mode ? "white" : "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Stack
          spacing={1}
          direction="row"
          sx={{
            position: "absolute",
            top: {
              xs: "76px",
              lg: "100px",
            },
            left: {
              xs: "20px",
            },
            textDecoration: "none",
            alignItems: "center",
            padding: "12px",
            backgroundColor: mode ? "hsl(201, 24%, 21%)" : "white",
            color: mode ? "white" : "black",
            width: {
              xs: "20%",
              sm: "12%",
              lg: "5%",
            },
            justifyContent: "center",
            boxShadow: "3px 1px 5px 1px black",
          }}
        >
          <WestOutlinedIcon />
          <Typography>Back</Typography>
        </Stack>
      </Link>

      <Stack
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        spacing={{ xs: 2, sm: 8, lg: 20 }}
        direction={{ xs: "column", lg: "row" }}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="img"
          src={country?.flags?.png}
          sx={{
            width: { xs: "280px", sm: "380px", lg: "500px" },
            height: { xs: "170px", sm: "300px", lg: "400px" },
          }}
        />
        <Stack spacing={{ xs: 3, sm: 2, lg: 4 }}>
          <Typography variant="h3">{country?.name?.common}</Typography>
          <Stack
            spacing={{ xs: 3, sm: 6, lg: 15 }}
            direction={{ xs: "column", lg: "row" }}
          >
            <Stack>
              <Typography>
                <b>Native Name:</b>{" "}
                {Object.values(country?.name?.nativeName || {})[0]?.official ||
                  "Not available"}
              </Typography>
              <Typography>
                <b>Population: </b> {country?.population}
              </Typography>
              <Typography>
                <b>Region:</b> {country?.region}
              </Typography>
              <Typography>
                <b>Sub Region:</b> {country?.subregion}
              </Typography>
              <Typography>
                <b>Capital:</b> {country?.capital?.[0]}
              </Typography>
            </Stack>
            <Stack>
              <Typography>
                <b>Top Level Domain:</b> {country?.tld?.[0]}
              </Typography>
              <Typography>
                <b>Currencies:</b>{" "}
                {Object.values(country?.currencies || {})[0]?.name ||
                  "Not available"}
              </Typography>
              <Typography>
                <b>Language:</b>{" "}
                {Object.values(country?.languages || {})[0] || "Not available"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{ alignItems: "center" }}
            spacing={1}
            direction={{ xs: "column", sm: "row" }}
          >
            <Typography>
              <b>Border Countries:</b>
            </Typography>
            <Stack direction="row" spacing={1}>
              {country?.borders?.length > 0 ? (
                country.borders.map((border) => (
                  <Box key={border}>{border}</Box>
                ))
              ) : (
                <Typography>None</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Info;
