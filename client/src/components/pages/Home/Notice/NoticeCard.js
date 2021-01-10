import { Button, Grid, Paper, Typography } from "@material-ui/core"
import React, { useContext, useEffect } from "react"
import { Carousel } from "react-bootstrap"
import { NoticeContext } from "../../../../context/noticeContext/NoticeContext"

export const NoticeCard = () => {
  const noticeContext = useContext(NoticeContext)
  useEffect(() => {
    noticeContext.getNotices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="mt-3">
      <h6>
        <b>Updates</b>
      </h6>
      <Paper variant="elevation" elevation={3}>
        <Carousel style={{ height: "150px", margin: "auto" }}>
          {noticeContext.loading ? (
            <div>loading</div>
          ) : (
            noticeContext.notice.map((not, index) => {
              return (
                <Carousel.Item key={index}>
                  <Grid
                    container
                    className="mt-3"
                    justify="space-between"
                    alignItems="center"
                    direction="column"
                  >
                    <Grid item xs={10}>
                      <Typography
                        align="center"
                        color="primary"
                        variant="caption"
                      >
                        {not.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography align="center" variant="subtitle1">
                        {not.description.slice(0, 50)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="flex-end">
                        <Button size="small">Link</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Carousel.Item>
              )
            })
          )}
        </Carousel>
      </Paper>
    </div>
  )
}
