import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect } from "react"
import { NoticeContext } from "../../../../context/noticeContext/NoticeContext"
import { Home } from "../../../common/Base/Home"

export const Notice = () => {
  const noticeContext = useContext(NoticeContext)
  useEffect(() => {
    noticeContext.getNotices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Home>
      <div>
        {noticeContext.loading ? (
          <div>loading</div>
        ) : (
          noticeContext.notice.map((not, index) => {
            return (
              <Card elevation={1} className="mb-3">
                <CardContent>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography color="textSecondary" variant="caption">
                        Notice no.{index + 100}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {new Date(not.createdAt).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography color="primary">{not.title}</Typography>
                  <Typography variant="body1">{not.description}</Typography>
                </CardContent>
                <CardActions className="pt-0 px-3">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      window.open(`${not.link}`)
                    }}
                  >
                    Link
                  </Button>
                </CardActions>
              </Card>
            )
          })
        )}
      </div>
    </Home>
  )
}
