import { Fab, Grid, Button, Paper, Avatar } from "@material-ui/core"
import React, { useContext } from "react"
import { AuthContext } from "../../../context/authContext/authContext"
import BrokenImageIcon from "@material-ui/icons/BrokenImage"
import PollIcon from "@material-ui/icons/Poll"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faFeather } from "@fortawesome/free-solid-svg-icons"

export const InputBox = () => {
  const context = useContext(AuthContext)
  return (
    <Paper elevation={1} variant="outlined" className="p-3 mb-3">
      <Button fullWidth>
        <Grid container justify="space-between" alignItems="center">
          <Avatar />
          <Fab
            variant="extended"
            disabled
            style={{ width: "90%" }}
            size="medium"
            no
          >
            {`What's on your mind? ${context.user.name}`}
          </Fab>
        </Grid>
      </Button>

      <Grid
        container
        justify="space-around"
        alignItems="center"
        className="pt-2"
      >
        <Grid item>
          <Button startIcon={<FontAwesomeIcon icon={faEdit} />}>
            Create Post
          </Button>
        </Grid>
        <Grid item>
          <Button startIcon={<FontAwesomeIcon icon={faFeather} />}>
            Write Blog
          </Button>
        </Grid>
        <Grid item>
          <Button startIcon={<BrokenImageIcon />}>Post Ad</Button>
        </Grid>
        <Grid item>
          <Button startIcon={<PollIcon />}>Poll</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
