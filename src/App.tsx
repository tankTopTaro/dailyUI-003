import "@fontsource/peralta"
import { Box, Container, createTheme, CssBaseline, GlobalStyles, ImageList, ImageListItem, ThemeProvider, Typography } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: 'Peralta'
  },
})

const itemData = [
  {
    image: 'IMG20230123085059_l71jzc.jpg',
    title: 'dog1',
  }
]

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: {backgroundColor: "#F6FB7A"}}} />
      <Container maxWidth={false}>
        <Typography component='div' mt={4} textAlign='center' variant="h1" sx={{ fontSize: 128}}>Dogs</Typography>
      
        <Box>
          <ImageList sx={{ width: 500, height: 'fit-content' }} variant='woven' cols={3} gap={8}>
            { itemData.map((item) => (
              <ImageListItem key={item.image}>
                <img 
                  srcSet={`https://res.cloudinary.com/delgya5vj/image/upload/v1676732824/doggos/${item.image}`}
                  src={`https://res.cloudinary.com/delgya5vj/image/upload/v1676732824/doggos/${item.image}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      
      </Container>
    </ThemeProvider>
  )
}

export default App
