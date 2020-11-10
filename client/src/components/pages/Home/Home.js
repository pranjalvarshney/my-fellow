import { Container, Grid } from "@material-ui/core"
import React from "react"
import { Base } from "../../common/Base/Base"
import { HomeSideBar } from "./components/HomeSideBar"
import "./Home.css"

export const Home = () => {
  return (
    <Base>
      <Container className="home">
        <Grid item xs={3}>
          <HomeSideBar />
        </Grid>
      </Container>
    </Base>
  )
}
