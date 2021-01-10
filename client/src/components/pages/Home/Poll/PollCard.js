import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Carousel } from "react-bootstrap"
import { AuthContext } from "../../../../context/authContext/authContext"
import { PollContext } from "../../../../context/pollContext/PollContext"
import { LoadingPoll } from "./LoadingPoll"

export const PollCard = () => {
  const authContext = useContext(AuthContext)
  const pollContext = useContext(PollContext)
  const [index, setIndex] = useState(0)
  const [responseValue, setResponseValue] = useState({
    loading: false,
    error: "",
  })
  const [pollResult, setPollResult] = useState({
    total: "",
    yes: "",
    no: "",
    skip: "",
  })
  const [showResult, setShowResult] = useState(false)
  useEffect(() => {
    pollContext.getAllPolls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // console.log(pollContext.polls)

  const handlePollClick = async (e, typeOf, pollId) => {
    setResponseValue({
      ...responseValue,
      loading: true,
    })
    try {
      let response
      if (typeOf === "yes") {
        response = await pollContext.markPollYes(authContext.user._id, pollId)
      }
      if (typeOf === "no") {
        response = await pollContext.markPollNo(authContext.user._id, pollId)
      }
      if (typeOf === "skip") {
        response = await pollContext.skipPoll(authContext.user._id, pollId)
      }
      if (response._id === pollId) {
        setPollResult({
          total:
            response.yes.length + response.no.length + response.skip.length,
          yes: response.yes.length,
          no: response.no.length,
          skip: response.skip.length,
        })
        setResponseValue({
          ...responseValue,
          loading: false,
        })
        setShowResult(true)
      }
      console.log(response)
    } catch (error) {
      setResponseValue({
        ...setResponseValue,
        // error: error.response.data.errorMsg,
        loading: false,
      })
    }
  }
  return (
    <div>
      {pollContext.loading ? (
        LoadingPoll()
      ) : (
        <>
          <h6>
            <b>Polls</b>
          </h6>
          <Card variant="elevation" elevation={3} className="pb-1">
            <Carousel
              indicators={false}
              controls={false}
              interval={null}
              activeIndex={index}
            >
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
                          {!showResult ? (
                            <Button
                              variant="text"
                              size="small"
                              onClick={(e) =>
                                handlePollClick(e, "skip", poll._id)
                              }
                            >
                              Skip
                            </Button>
                          ) : (
                            <Button
                              variant="text"
                              size="small"
                              onClick={() => {
                                if (index < pollContext.polls.length) {
                                  setIndex(index + 1)
                                }
                                setShowResult(false)
                              }}
                            >
                              Next
                            </Button>
                          )}
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
                      {responseValue.loading && (
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled
                        >
                          Loading
                        </Button>
                      )}
                      {responseValue.loading ? null : !showResult ? (
                        <ButtonGroup
                          className="p-1"
                          fullWidth
                          variant="outlined"
                        >
                          <Button
                            size="small"
                            onClick={(e) => handlePollClick(e, "yes", poll._id)}
                          >
                            Yes
                          </Button>
                          <Button
                            size="small"
                            onClick={(e) => handlePollClick(e, "no", poll._id)}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <div
                          className="px-1"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              background: "#6eff00",
                              borderRadius: "2px",
                              width: `${
                                (pollResult.yes / pollResult.total) * 100
                              }%`,
                            }}
                          >
                            {Math.round(
                              (pollResult.yes / pollResult.total) * 100
                            )}
                            %
                          </div>
                          <div
                            style={{
                              background: "#b5b5b5",
                              borderRadius: "2px",
                              width: `${
                                (pollResult.skip / pollResult.total) * 100
                              }%`,
                            }}
                          >
                            {Math.round(
                              (pollResult.skip / pollResult.total) * 100
                            )}
                            %
                          </div>
                          <div
                            style={{
                              background: "tomato",
                              borderRadius: "2px",
                              width: `${
                                (pollResult.no / pollResult.total) * 100
                              }%`,
                            }}
                          >
                            {Math.round(
                              (pollResult.no / pollResult.total) * 100
                            )}
                            %
                          </div>
                        </div>
                      )}
                    </CardActions>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Card>
        </>
      )}
    </div>
  )
}
