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
import { Link } from "react-router-dom";

function Countries({
  query,
  setQuery,
  searchedCountry,
  setSearchedCountry,
  mode,
  isLoading,
  setIsLoading,
}) {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((res) => {
        // console.log(res.data)
        // Filtered only the required data from the request
        const transformedData = res.data.map((country) => {
          return {
            name: country?.name?.common,
            population: country?.population,
            subregion: country?.subregion,
            region: country?.region,
            capital: country?.capital?.join(", "),
            tld: country?.tld?.join(", "),
            flags: country?.flags?.png,
            get currencies() {
              let result = [];
              for (let key in country?.currencies) {
                result.push(country?.currencies[key].name);
              }
              return result.join(", ");
            },
            get languages() {
              let result = [];
              for (let key in country?.languages) {
                result.push(country?.languages[key]);
              }
              return result.join(", ");
            },
            get nativeName() {
              let result = [];
              for (let key in country?.name?.nativeName) {
                result.push(country?.name?.nativeName[key].common);
              }
              return result.join(", ");
            },
            get borders() {
              let result = [];
              country.borders?.forEach((item) => {
                res.data?.forEach((x) => {
                  if (x.cca3 === item) {
                    result.push(x.name.common);
                  }
                });
              });
              if (!result || result.length === 0) {
                return `No border country`;
              }
              return result.join(", ");
            },
          };
        });

        setQuery(transformedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
    setAnchorEl1(null); // Close the popover
  };

  return (
    <Box
      sx={{
        marginTop: {
          xs: "56px",
          sm: "44px",
          lg: "50px",
        },
        backgroundColor: mode ? "hsl(201, 24%, 21%)" : "white",
        color: mode ? "white" : "black",
      }}
    >
      <Stack
        direction={{ sm: "row" }}
        spacing={{ xs: 4, sm: 30, lg: 124 }}
        sx={{
          alignItems: "center",
          padding: { xs: "24px", sm: "50px", lg: "50px" },
        }}
      >
        <TextField
          value={searchedCountry}
          onChange={(e) => setSearchedCountry(e.target.value)}
          placeholder="Search for a country...."
          InputProps={{
            style: {
              color: mode ? "white" : "black",
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchOutlinedIcon
                    sx={{ color: mode ? "white" : "black" }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack
          direction="row"
          sx={{ alignItems: "center", padding: "5px", borderRadius: "12px" }}
        >
          <Typography>Filter by Region</Typography>
          <IconButton onClick={(e) => setAnchorEl1(e.currentTarget)}>
            <KeyboardArrowDownIcon sx={{ color: mode ? "white" : "black" }} />
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
            <Box
              sx={{
                padding: "20px",
                textAlign: "left",
                width: "120px",
                backgroundColor: mode ? "hsl(202, 24%, 18%)" : "white",
                color: mode ? "white" : "black",
              }}
            >
              <Stack spacing={1}>
                <Typography
                  onClick={() => handleContinentSelect("Africa")}
                  sx={{ cursor: "pointer" }}
                >
                  Africa
                </Typography>
                <Typography
                  onClick={() => handleContinentSelect("Asia")}
                  sx={{ cursor: "pointer" }}
                >
                  Asia
                </Typography>
                <Typography
                  onClick={() => handleContinentSelect("Europe")}
                  sx={{ cursor: "pointer" }}
                >
                  Europe
                </Typography>
                <Typography
                  onClick={() => handleContinentSelect("Oceania")}
                  sx={{ cursor: "pointer" }}
                >
                  Oceania
                </Typography>
              </Stack>
            </Box>
          </Popover>
        </Stack>
      </Stack>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Grid
          spacing={4}
          container
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {query
            .filter((data) => {
              if (
                (searchedCountry === "" ||
                  data.name
                    .toLowerCase()
                    .includes(searchedCountry.toLowerCase())) &&
                (selectedContinent === null ||
                  data.region === selectedContinent)
              ) {
                return data;
              }
              return null;
            })
            .map((data, index) => (
              <Grid item key={index}>
                <Link
                  to={`/info/${data.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: .9 }}
                    sx={{
                      padding: {
                        xs: 2.2,
                        lg: 2,
                      },
                      borderRadius: "10px",
                    }}
                    elevation={5}
                    style={{
                      backgroundColor: mode ? "hsl(201, 24%, 21%)" : "white",
                      color: mode ? "white" : "black",
                    }}
                  >
                    <Box
                      component="img"
                      src={data.flags}
                      sx={{ width: "320px", height: "240px" }}
                    />
                    <Stack spacing={2}>
                      <Typography variant="h5">
                        <b>{data.name}</b>
                      </Typography>
                      <Typography>
                        <b>Population:</b>
                        {data.population}
                      </Typography>
                      <Typography>
                        <b>Region:</b>
                        {data.region}
                      </Typography>
                      <Typography>
                        <b>Capital:</b>
                        {data.capital}
                      </Typography>
                    </Stack>
                  </Paper>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Countries;
