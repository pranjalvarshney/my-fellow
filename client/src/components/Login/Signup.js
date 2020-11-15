import { Box, Button, Grid, Paper, TextField } from "@material-ui/core"
import React from "react"
import "./Login.css"

export const Signup = () => {
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
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Name"
                      />
                    </Grid>
                    <Grid item container>
                      <TextField
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          label="Birthday"
                          size="small"
                          type="date"
                          defaultValue={
                            new Date().getFullYear() +
                            "-" +
                            new Date().getMonth() +
                            "-" +
                            new Date().getDate()
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label="Age"
                          variant="outlined"
                          size="small"
                          style={{ width: "auto" }}
                        />
                      </Grid>
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
