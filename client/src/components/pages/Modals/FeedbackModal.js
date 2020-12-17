import { Button } from "@material-ui/core";
import React from "react";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export const FeedbackModal = ({ show, onhide }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="modal-feedback">
      <div className="modal-feedback-wrapper">
        <Modal show={show} onHide={onhide} centered>
          <Modal.Header closeButton>
            <Modal.Title className="ml-auto">Feedback Form</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form className={classes.root} noValidate autoComplete="off">
              <div className="text-center">
                <TextField
                  id="filled-multiline-static"
                  label="Feedback"
                  multiline
                  rows={4}
                  rowsMax={6}
                  variant="outlined"
                  className="w-100 mx-auto"
                />
                <input
                  accept="image/*, video/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className="py-3 my-3">
                    <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
                    Share a Screenshot or a Video
                  </Button>
                </label>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onhide}>
              Cancel
            </Button>
            <Button variant="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
