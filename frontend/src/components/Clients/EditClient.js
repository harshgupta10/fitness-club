import { Card, Col, FormGroup, Row } from "react-bootstrap";
import classes from "./RegisterClientForm.module.css";
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

function EditClient(props) {
  const [isActive, setIsActive] = useState("Tak");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [nrMagneticCard, setNrMagneticCard] = useState(0);
  const [correctMessage, setCorrectMessage] = useState("");
  const [isEditFormValid, setIsEditFormValid] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: props.client.email,
    isValid: true,
    message: "",
  });
  const [nrTelState, dispatchNrTel] = useReducer(nrTelReducer, {
    value: props.client.number_tel,
    isValid: true,
    message: "",
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsEditFormValid(emailState.isValid && nrTelState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState, nrTelState]);

  useEffect(() => {
    setName(props.client.name);
    setLastName(props.client.lastName);
    setAddress(props.client.address);
    setNrMagneticCard(props.client.number_magnetic_cart);
    setIsActive(props.client.active);
  }, []);

  const editUserHandler = (e) => {
    e.preventDefault();
    let active = true;
    if (isActive === "Tak") active = true;
    if (isActive === "Nie") active = false;

    const editData = {
      _id: props.client._id,
      name: name,
      lastName: lastName,
      address: address,
      email: emailState.value,
      number_tel: nrTelState.value,
      number_magnetic_cart: nrMagneticCard,
      active: active,
    };
    if (isEditFormValid) {
      setIsCorrect(true);
      setCorrectMessage("Edit successful!");
      props.editedClientData(editData);
    } else {
      setIsCorrect(false);
      setCorrectMessage("Invalid form data!");
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <Card className={classes.ClientCard}>
        <form onSubmit={editUserHandler}>
          <Row>
            <p>{props.client._id}</p>
            <Col>
              <FormGroup className={classes.center}>
                <label htmlFor="imie">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  defaultValue={props.client.name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <p />
              </FormGroup>
              <FormGroup className={classes.center}>
                <label htmlFor="model">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  defaultValue={props.client.lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                <p />
              </FormGroup>
              <FormGroup className={classes.center}>
                <label htmlFor="model">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  defaultValue={props.client.address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
                <p />
              </FormGroup>
              <FormGroup className={classes.center}>
                <label htmlFor="model">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  defaultValue={props.client.email}
                  onChange={(event) => {
                    dispatchEmail({ type: "EMAIL", val: event.target.value });
                  }}
                />
                {!emailState.isValid && (
                  <p style={{ color: "red" }}>{emailState.message}</p>
                )}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className={classes.center}>
                <label htmlFor="model">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="nrTel"
                  defaultValue={props.client.number_tel}
                  onChange={(event) => {
                    dispatchNrTel({ type: "TEL", val: event.target.value });
                  }}
                />
                {!nrTelState.isValid && (
                  <p style={{ color: "red", height: "0px" }}>
                    {nrTelState.message}
                  </p>
                )}
              </FormGroup>
              <FormGroup className={classes.center}>
                <label htmlFor="model">Magnetic Card Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="nrMagneticCard"
                  defaultValue={props.client.number_magnetic_cart}
                  onChange={(event) => {
                    setNrMagneticCard(+event.target.value);
                  }}
                />
                <p />
              </FormGroup>
              <FormGroup className={classes.center}>
                <label htmlFor="active">Is Client Active?</label>
                <select
                  className="form-control"
                  name="active"
                  defaultValue={isActive}
                  onChange={(event) => {
                    setIsActive(event.target.value);
                  }}
                >
                  <option>Tak</option>
                  <option>Nie</option>
                </select>
                <p />
              </FormGroup>
            </Col>

            <div className="m-3 text-center">
              <button
                type="submit"
                className="redBtn"
                style={{ width: "100px" }}
              >
                Edit
              </button>
              <button
                className="redBtn"
                type="button"
                style={{ width: "100px", marginLeft: "20px" }}
                onClick={props.onClose}
              >
                Cancel
              </button>
              {isCorrect ? (
                <p style={{ color: "green" }}>{correctMessage}</p>
              ) : (
                <p style={{ color: "red" }}>{correctMessage}</p>
              )}
            </div>
          </Row>
        </form>
      </Card>
    </Modal>
  );
}

export default EditClient;
