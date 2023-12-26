import { useState } from "react";
import "./App.css";
import Countries from "./Components/Countries";
import Top from "./Components/Top";
import { Stack } from "@mui/material";
import Info from "./Components/Info";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [query, setQuery] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [mode, setMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <Stack spacing={7}>
        <Top mode={mode} setMode={setMode} />
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Countries
                  query={query}
                  setQuery={setQuery}
                  searchedCountry={searchedCountry}
                  setSearchedCountry={setSearchedCountry}
                  mode={mode}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/info/:id"
              element={
                <Info
                  mode={mode}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
          </Routes>
        </Router>
      </Stack>
    </>
  );
}

export default App;
