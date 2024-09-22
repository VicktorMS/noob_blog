import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"

function App() {
  return (
    <Box 
      minH={"100vh"} 
      minW={"100vw"} 
      display={"flex"} 
      flexDir={"column"} 
      alignItems={'center'}
      >
      <Navbar/>
      <Box maxWidth={'1140px'} px={4}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Routes>
      </Box>
    </Box>
  )
}

export default App
