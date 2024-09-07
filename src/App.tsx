import "@fontsource/peralta"
import { itemData } from "./itemData"
import { Cloudinary } from "@cloudinary/url-gen/index"
import { auto } from "@cloudinary/url-gen/actions/resize"
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"
import { AdvancedImage } from "@cloudinary/react"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Container, createTheme, CssBaseline, GlobalStyles, IconButton, Slide, Stack, ThemeProvider, Typography, } from "@mui/material"
import { useEffect, useState } from "react"

const theme = createTheme({
  typography: {
    fontFamily: 'Peralta'
  },
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  }
})

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'delgya5vj' }})
  const [cards, setCards] = useState([] as any)
  const [currentPage, setCurrentPage] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left')
  const cardsPerPage = 3

  const advancedImage = (item: string | undefined) => {
    const img = cld
    .image(item)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500))

    return <AdvancedImage cldImg={img} loading='lazy'/>
  }

  const cardImage: any[] = itemData.map((path) => advancedImage(path))

  const handleNextPage = () => {
    setSlideDirection('left')
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setSlideDirection('right')
    setCurrentPage((prevPage) => prevPage - 1)
  }

  useEffect(() => {
    setCards(cardImage)
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: {backgroundColor: "#F6FB7A"}}} />
      <Container maxWidth={false}>
        <Typography component='div' mt={4} textAlign='center' variant="h1" sx={{ fontSize: 128}}>Dogs</Typography>
        <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton onClick={handlePrevPage} sx={{ margin: 5}} disabled={currentPage === 0}>
            <ChevronLeftIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
            {cards.map((_card: any, index: any) => ( 
              <Box key={`card-${index}`} sx={{ width: '100%', height: '100%', display: currentPage === index ? 'block' : 'none'}}>
                <Slide direction={slideDirection} in={currentPage === index} easing={{ enter: theme.transitions.easing.easeInOut, exit: theme.transitions.easing.easeInOut,}} timeout={{ enter: theme.transitions.duration.enteringScreen, exit: 1000}} mountOnEnter unmountOnExit>
                  <Stack spacing={2} direction='row' alignContent='center' justifyContent='center'>
                    {cards.slice(index * cardsPerPage, index * cardsPerPage + cardsPerPage)}
                  </Stack>
                </Slide>
              </Box>
            ))}
          </Box>
          <IconButton onClick={handleNextPage} sx={{ margin: 5}} disabled={currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
