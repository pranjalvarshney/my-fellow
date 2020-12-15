import React from "react"
import Header from "../../common/Header/Header"
import { Container, Grid, Paper } from "@material-ui/core"
import "./AboutUniversity.css"

export const AboutUniversity = () => {
  return (
    <div className="home">
      <Header />
      <Grid container>
        <Grid xs={12} md={6}>
          <Paper variant="outlined">skjdhakjshdkasd</Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper>
            <Container>skjdhakjshdkasd</Container>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
