import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../context/authContext/authContext"

export const CampusSignup = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    rollno: "",
    collegeId: "",
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
    name: inputValues.name,
    email: inputValues.email,
    password: inputValues.password,
    rollno: inputValues.rollno,
    collegeId: inputValues.collegeId,
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const response = await authContext.signupUser(formData)
    if (response) {
      history.push("/signin")
    }
  }
  const styleTheme1 =
    authContext.theme === "dark"
      ? { background: "black", color: "white" }
      : { background: "white", color: "black" }

  return (
    <div className="login" style={styleTheme1}>
      <div className="container text-center">
        <Grid
          container
          alignItems="center"
          justify="space-around"
          direction="row"
        >
          <Grid item>
            <img src="logo1.png" alt="logo" />
          </Grid>
          <Grid item>
            <h1 id="header-name">My Fellow</h1>
            <Paper elevation={9} variant="elevation">
              <Box pt={5} pb={3} px={3} width="400px">
                <form onSubmit={handleOnSubmit}>
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
                        label="Institution Name"
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
                      spacing={3}
                    >
                      <Grid item xs={6}>
                        <TextField
                          name="rollno"
                          variant="outlined"
                          label="Registration No"
                          size="small"
                          value={inputValues.rollno}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name="collegeId"
                          label="College Id"
                          type="text"
                          variant="outlined"
                          size="small"
                          value={inputValues.collegeId}
                          onChange={handleChange}
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
                        type="submit"
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
                        disabled
                        variant="text"
                        style={{
                          textTransform: "none",
                        }}
                      >
                        Already have an account!{" "}
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
                          background: "#1712c5",
                        }}
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
            <Grid container className="mt-1" justify="center">
              <Button
                size="small"
                onClick={() => {
                  history.push("/signup")
                }}
              >
                <Typography variant="button" color="textSecondary">
                  Signup as{" "}
                  <Typography variant="button" color="textPrimary">
                    Student
                  </Typography>
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
