import "@fontsource/peralta"
import { itemData } from "./itemData"
import { Cloudinary } from "@cloudinary/url-gen/index"
import { auto } from "@cloudinary/url-gen/actions/resize"
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"
import { AdvancedImage } from "@cloudinary/react"
import { Container, createTheme, CssBaseline, GlobalStyles, ThemeProvider, Typography, } from "@mui/material"
import { useEffect, useState } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

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

  const advancedImage = (item: string | undefined) => {
    const img = cld
    .image(item)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500))

    return <AdvancedImage cldImg={img} loading='lazy'/>
  }

  const cardImage: any[] = itemData.map((path) => advancedImage(path))

  useEffect(() => {
    setCards(cardImage)
    console.log(cardImage)
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: {backgroundColor: "#F6FB7A"}}} />
      <Container maxWidth={false}>
        <Typography component='div' mt={4} textAlign='center' variant="h1" sx={{ fontSize: 128}}>Dogs</Typography>
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
          <Masonry gutter="10px">
            {cards}
          </Masonry>
        </ResponsiveMasonry>
      </Container>
    </ThemeProvider>
  )
}

export default App
