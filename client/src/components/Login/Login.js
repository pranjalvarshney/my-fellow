import { Box, Button, Grid, Paper, TextField } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = () => {
  const history = useHistory()
  return (
    <div className="login">
      <div className="container">
        <Grid
          container
          alignItems="center"
          justify="space-around"
          direction="row"
        >
          <Grid item>
            <h2>My Fellow</h2>
          </Grid>
          <Grid item>
            <Paper>
              <Box py={6} px={3} width="400px">
                <form>
                  <Grid
                    spacing={1}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item container>
                      <TextField
                        type="email"
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
                      />
                    </Grid>
                    <Grid item container>
                      <TextField
                        fullWidth
                        type="password"
                        size="small"
                        variant="outlined"
                        label="Password"
                      />
                    </Grid>
                    <Grid item container>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </form>
                <Box my={2}>
                  <Grid
                    alignItems="center"
                    justify="space-between"
                    spacing={1}
                    container
                    direction="row"
                  >
                    <Grid item>
                      <Button
                        variant="text"
                        style={{
                          textTransform: "none",
                        }}
                      >
                        Forgot password
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => {
                          history.push("/signup")
                        }}
                        variant="contained"
                        style={{
                          color: "white",
                          background: "limegreen",
                        }}
                      >
                        Create Account
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
