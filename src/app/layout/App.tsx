import NavBar from "./NavBar";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import { useAppSelector } from "../store/store";

function App() {
  const {darkMode} = useAppSelector(state => state.ui)
  //const [darkMode, setDarkMode] = useState(getInitialDarkMode());
  const palleteType = darkMode ? 'dark': 'light'
  const darkTheme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea': '#121212'
      }
    }
  });

  //const toggleDarkMode = () => {
    //localStorage.setItem('darkMode', JSON.stringify(!darkMode))
    //setDarkMode(!darkMode);
  //}

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavBar/>
        <Box 
          sx={{
            minHeight: '100vh',
            background: darkMode ? '#121212': '#eaeae'
          }}
        >
          <Container maxWidth='xl' sx={{mt: 10}}>
            <Outlet/>
          </Container>
        </Box>
    </ThemeProvider>

  )
}

export default App
