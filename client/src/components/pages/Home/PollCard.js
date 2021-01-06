import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect } from "react"
import { PollContext } from "../../../context/pollContext/PollContext"
import { Skeleton } from "@material-ui/lab"
import { Carousel } from "react-bootstrap"

const LoadingPoll = () => {
  return (
    <div>
      <Card variant="elevation" elevation={3}>
        <CardHeader
          title={<Skeleton animation="wave" height={10} width="20%" />}
        />
        <CardContent>
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
        <CardActions>
          <ButtonGroup fullWidth variant="outlined">
            <Button size="small">
              <Skeleton
                animation="wave"
                height={10}
                width="40%"
                style={{ marginBottom: 6 }}
              />
            </Button>
            <Button size="small">
              <Skeleton
                animation="wave"
                height={10}
                width="40%"
                style={{ marginBottom: 6 }}
              />
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </div>
  )
}

export const PollCard = () => {
  const pollContext = useContext(PollContext)
  useEffect(() => {
    pollContext.getAllPolls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(pollContext.polls)
  const filterPollForUnmarked = () => {}
  const handlePollClick = (e, typeOf) => {
    if (typeOf === "yes") {
      // pollContext.
    }
  }
  return (
    <div>
      {pollContext.loading ? (
        LoadingPoll()
      ) : (
        <Card variant="elevation" elevation={3}>
          <Carousel indicators={false} controls={false} interval={null}>
            {pollContext.polls.map((poll, index) => {
              return (
                <Carousel.Item key={index}>
                  <Grid>
                    <Grid
                      item
                      direction="row"
                      className="py-1 pr-3"
                      container
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <Button
                          variant="text"
                          size="small"
                          onClick={(e) => handlePollClick(e, "skip")}
                        >
                          Skip
                        </Button>
                      </Grid>
                      <Grid item>
                        <Typography variant="button" color="textSecondary">
                          Poll
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton size="small">
                          <MoreHorizIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <CardContent
                    style={{ paddingTop: "0px", paddingBottom: "0" }}
                  >
                    <Typography variant="body1" style={{ padding: "0" }}>
                      {poll.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ paddingTop: "0px" }}
                    >
                      {poll.poll}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ButtonGroup className="p-1" fullWidth variant="outlined">
                      <Button
                        size="small"
                        onClick={(e) => handlePollClick(e, "yes")}
                      >
                        Yes
                      </Button>
                      <Button
                        size="small"
                        onClick={(e) => handlePollClick(e, "no")}
                      >
                        No
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Card>
      )}
    </div>
  )
}
