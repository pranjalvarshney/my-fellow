import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import React from "react"

export const LoadingPoll = () => {
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
