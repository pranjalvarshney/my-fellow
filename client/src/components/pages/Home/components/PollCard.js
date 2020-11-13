import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core"
import React from "react"

export const PollCard = () => {
  return (
    <Card>
      <Grid>
        <Grid item direction="row" container justify="space-between">
          <Grid item>
            <Button size="small">Skip</Button>
          </Grid>
          <Grid item>
            <Button disabled size="medium">
              Poll
            </Button>
          </Grid>
          <Grid item>
            <Button size="small">Next</Button>
          </Grid>
        </Grid>
      </Grid>
      <CardContent style={{ paddingTop: "0px", paddingBottom: "0" }}>
        <Typography variant="h6" style={{ padding: "0" }}>
          Lizard
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ paddingTop: "0px" }}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup fullWidth variant="outlined">
          <Button size="small">Yes</Button>
          <Button size="small">No</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}
