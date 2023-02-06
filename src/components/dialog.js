import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import "./dialog.css";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    id,
    name,
    email,
    lastName,
    adress,
    city,
    country,
    phoneNum,
    email1,
    email2,
    email3,
    phoneNum1,
    phoneNum2,
    phoneNum3,
  } = data;
  const [isActive, setIsActive] = useState(false);
  const [isActiveS, setIsActiveS] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setIsActive((prev) => !prev);
  };
  const handleChangeSecond = (e) => {
    e.preventDefault();
    setIsActiveS((prev) => !prev);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="form">
          {id ? "Edit" : "Register new user"}
        </DialogTitle>
        <DialogContent className="form">
          <form>
            <TextField
              id="name"
              value={name}
              onChange={(e) => onChange(e)}
              placeholder="Enter name"
              label="Name"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
              placeholder="Enter Last name"
              label="Last Name"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="adress"
              value={adress}
              onChange={(e) => onChange(e)}
              placeholder="Enter Adress"
              label="Adress"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="city"
              value={city}
              onChange={(e) => onChange(e)}
              placeholder="Enter city"
              label="City"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="country"
              value={country}
              onChange={(e) => onChange(e)}
              placeholder="Enter country"
              label="Country"
              variant="outlined"
              margin="dense"
              fullWidth
            />

            <TextField
              id="email"
              value={email}
              onChange={(e) => onChange(e)}
              placeholder="Enter email"
              label="Email"
              variant="outlined"
              margin="dense"
              Button
              fullWidth
            />

            <div className="addInput">
              <button onClick={handleChange} className="addOptional">
                {!isActive ? "Add optional email" : "Close"}
              </button>
              {isActive ? (
                <div>
                  <TextField
                    id="email1"
                    value={email1}
                    onChange={(e) => onChange(e)}
                    placeholder="Enter email"
                    label="Email2(optional)"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                  <TextField
                    id="email2"
                    value={email2}
                    onChange={(e) => onChange(e)}
                    placeholder="Enter email"
                    label="Email3(optional)"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                  <TextField
                    id="email3"
                    value={email3}
                    onChange={(e) => onChange(e)}
                    placeholder="Enter email"
                    label="Email4(optional)"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </div>
              ) : null}
            </div>

            <TextField
              id="phoneNum"
              value={phoneNum}
              onChange={(e) => onChange(e)}
              placeholder="Enter Num"
              label="Phone Number"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <div className="addInput phoneClass">
              <button onClick={handleChangeSecond} className="addOptional">
                {!isActiveS ? "Add optional phone" : "Close"}
              </button>
              {isActiveS ? (
                <div>
                  <TextField
                    id="phoneNum1"
                    value={phoneNum1}
                    onChange={(e) => onChange(e)}
                    placeholder="phoneNum1"
                    label="Phone Number2(optional)"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                  <TextField
                    id="phoneNum2"
                    value={phoneNum2}
                    onChange={(e) => onChange(e)}
                    placeholder="phoneNum2"
                    label="Phone Number 3(optional)"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                  <TextField
                    id="phoneNum3"
                    value={phoneNum3}
                    onChange={(e) => onChange(e)}
                    placeholder="phoneNum3"
                    label="Phone Number 4(optional)"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </div>
              ) : null}
            </div>
          </form>
        </DialogContent>
        <DialogActions className="form">
          <div className="cancelBtn">
            <Button onClick={handleClose}>Cancel</Button>
          </div>
          <div className="saveBtn">
            <Button onClick={() => handleFormSubmit()}>
              {id ? "Update" : "Save"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
