import React from "react"
import { Card, CardContent, CardHeader } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

export const LoadingPost = () => {
  return (
    <Card variant="elevation" elevation={3}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton
        animation="wave"
        variant="rect"
        style={{ width: "100%", height: "250px" }}
      />
      <CardContent>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
    </Card>
  )
}
