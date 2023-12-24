import { useState } from "react";
import "./App.css";
import Countries from "./Components/Countries";
import Top from "./Components/Top";
import { Stack } from "@mui/material";
import Info from "./Components/Info";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack spacing={10}> 
        <Top />
        <Countries />
        {/* <Info/> */}
      </Stack>
    </>
  );
}

export default App;
