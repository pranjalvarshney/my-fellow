import { Box, Button, Grid, Paper, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Signup = () => {
  const history = useHistory()
  const defaultdob =
    new Date().getFullYear() +
    "-" +
    new Date().getMonth() +
    "-" +
    new Date().getDate()

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    dob: defaultdob,
    age: 0,
  })

  console.log(inputValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value,
      age:
        parseInt(new Date().getFullYear()) -
        parseInt(inputValues.dob.slice(0, 4)),
    })
  }

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
                        name="name"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={inputValues.name}
                        onChange={handleChange}
                        label="Name"
                      />
                    </Grid>
                    <Grid item container>
                      <TextField
                        type="text"
                        name="email"
                        value={inputValues.email}
                        onChange={handleChange}
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
                          name="dob"
                          variant="outlined"
                          label="Birthday"
                          size="small"
                          value={inputValues.dob}
                          onChange={handleChange}
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          age="age"
                          label="Age"
                          disabled
                          type="number"
                          variant="outlined"
                          size="small"
                          value={inputValues.age}
                          onChange={handleChange}
                          style={{ width: "auto" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <TextField
                        fullWidth
                        name="password"
                        type="password"
                        size="small"
                        variant="outlined"
                        value={inputValues.password}
                        onChange={handleChange}
                        label="Create password"
                      />
                    </Grid>
                    <Grid item container>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                      >
                        Signup
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
                          history.push("/signin")
                        }}
                        variant="contained"
                        style={{
                          color: "white",
                          background: "limegreen",
                        }}
                      >
                        Login
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
