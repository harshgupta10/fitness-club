import { Card, FormGroup, Row } from "react-bootstrap";
import classes from "./AddUserForm.module.css";
import Modal from "../UI/Modal";
import { useEffect, useReducer, useState } from "react";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return {
      value: action.val,
      isValid: action.val.includes("@") && action.val.includes("."),
      message: "Invalid email address",
    };
  }
  return { value: "", isValid: false, message: "" };
};

const nrTelReducer = (state, action) => {
  if (action.type === "TEL") {
    return {
      value: action.val,
      isValid: action.val.length === 9,
      message: "Invalid phone number",
    };
  }
  return { value: "", isValid: false, message: "" };
};

function AddUserForm(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState("Employee");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
    message: "",
  });
  const [nrTelState, dispatchNrTel] = useReducer(nrTelReducer, {
    value: 0,
    isValid: null,
    message: "",
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(emailState.isValid && nrTelState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState, nrTelState]);

  const sendDataUser = (e) => {
    e.preventDefault();

    let isAdminFlag = false;

    if (isAdmin === "Administrator") {
      isAdminFlag = true;
    }

    const data = {
      name: name,
      lastName: lastName,
      email: emailState.value,
      isAdmin: isAdminFlag,
      password: password,
      number_tel: nrTelState.value,
    };

    if (isFormValid) props.onReceive(data);
  };

  return (
    <Modal onClose={props.onClose}>
      <Card className={classes.userCard}>
        <form onSubmit={sendDataUser}>
          <Row>
            <FormGroup className={classes.FormsGroup}>
              <label htmlFor="imie">First Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(() => event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup className={classes.FormsGroup}>
              <label htmlFor="model">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={(event) => {
                  setLastName(() => event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup className={classes.FormsGroup}>
              <label htmlFor="model">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={emailState.value}
                onChange={(event) => {
                  dispatchEmail({ type: "EMAIL", val: event.target.value });
                }}
              />
              {!emailState.isValid && (
                <p style={{ color: "red" }}>{emailState.message}</p>
              )}
            </FormGroup>
            <FormGroup className={classes.FormsGroup}>
              <label htmlFor="model">Phone Number</label>
              <input
                type="number"
                className="form-control"
                name="nrTel"
                value={nrTelState.value}
                onChange={(event) => {
                  dispatchNrTel({ type: "TEL", val: event.target.value });
                }}
              />
              {!nrTelState.isValid && (
                <p style={{ color: "red" }}>{nrTelState.message}</p>
              )}
            </FormGroup>
            <FormGroup className={classes.FormsGroup}>
              <label htmlFor="password">Initial Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(() => event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup className={classes.FormsGroup}>
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                name="role"
                value={isAdmin}
                onChange={(event) => {
                  setIsAdmin(() => event.target.value);
                }}
              >
                <option>Employee</option>
                <option>Administrator</option>
              </select>
            </FormGroup>
            <div className="m-3 text-center">
              <button
                type="submit"
                className="redBtn"
                style={{ width: "100px" }}
              >
                Register
              </button>
              <button
                className="redBtn"
                type="button"
                style={{ width: "100px", marginLeft: "20px" }}
                onClick={props.onClose}
              >
                Cancel
              </button>
            </div>
          </Row>
        </form>
      </Card>
    </Modal>
  );
}

export default AddUserForm;
