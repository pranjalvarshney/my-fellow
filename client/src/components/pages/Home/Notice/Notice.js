import { Button, Grid, Paper, Typography } from "@material-ui/core"
import React from "react"
import { Carousel } from "react-bootstrap"

export const Notice = () => {
  return (
    <div className="mt-3">
      <Paper variant="outlined">
        <Carousel
          style={{ minHeight: "160px", background: "white", color: "black" }}
        >
          <Carousel.Item>
            <Grid
              container
              className="mt-3"
              justify="center"
              alignItems="space-between"
              direction="column"
            >
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Typography>Notice</Typography>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle2">
                  Artificial Intelligence and Sustainable Computing for Smart
                  Cities (AIS2C2)
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Button>Link</Button>
                </Grid>
              </Grid>
            </Grid>
          </Carousel.Item>
        </Carousel>
      </Paper>
    </div>
  )
}
