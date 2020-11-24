import { Box, Button, Grid, Paper, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../context/authContext/authContext"
import "./Login.css"
export const Login = () => {
  const history = useHistory()
  const context = useContext(AuthContext)
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  })

  // console.log(inputValues)
  const handleChange = (e) => {
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }
  const formData = {
    email: inputValues.email,
    password: inputValues.password,
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    await context.signinUser(formData)
    try {
    } catch (error) {}
  }

  return (
    <>
      <div className="login">
        <div className="container">
          <Grid
            container
            alignItems="center"
            justify="space-around"
            direction="row"
          >
            <Grid item justify="space-around" direction="column">
              <Grid item>
                <h1>My Fellow</h1>
              </Grid>
              <Grid item>
                <h6>connect, share and poll</h6>
              </Grid>
            </Grid>
            <Grid item>
              <Paper>
                <Box py={6} px={3} width="400px">
                  <form onSubmit={handleFormSubmit}>
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
                          name="email"
                          fullWidth
                          value={inputValues.email}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                          label="Email"
                        />
                      </Grid>
                      <Grid item container>
                        <TextField
                          fullWidth
                          name="password"
                          value={inputValues.password}
                          onChange={handleChange}
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
                          type="submit"
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
    </>
  )
}
