import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
} from "@material-ui/core"
import React from "react"
import "./Login.css"

export const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <Grid container justify="space-around">
          <Grid item>
            <h2>My Fellow</h2>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>{" "}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
