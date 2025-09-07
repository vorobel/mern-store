import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/index.jsx";
import HomePage from "./pages/Home/index.jsx";
import CreatePage from "./pages/Create";

function App() {
    return (
        <Box minHeight="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
            </Routes>
        </Box>
    );
}

export default App;
