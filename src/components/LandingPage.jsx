import { Typography, Button, Stack, Box } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
const LandingPage = () => {
  const [toggleBtn, settoggleBtn] = useState(false)

  const ubahbtn = () => {
    console.log('masuk');
    console.log(toggleBtn);


    if (!toggleBtn) return settoggleBtn(true)
    settoggleBtn(false)
  }
  return (
    <>
      <Typography variant="h2" >
        BELAJAR UAS
      </Typography>

      <Typography variant="h4"  >
        {toggleBtn ? 'on' : 'off'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,width:"50%" }}>
        <Button variant="contained" color="info" onClick={ubahbtn}>
          Klik Tombol Ini Keren Lo
        </Button>

        <Link to="/mhs" style={{ textDecoration: 'none' }}>
          <Button variant="outlined"  color="primary" >
            Klik Disini Buat Ke Halaman mahasiswa
          </Button>
        </Link>
      </Box>

    </>
  )
}

export default LandingPage