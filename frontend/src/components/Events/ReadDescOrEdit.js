import Modal from "../UI/Modal";
import classes from "./ReadDescOrEdit.module.css";
import { useEffect, useState } from "react";
import { Card, Col, FormGroup, Row } from "react-bootstrap";

function ReadDescOrEdit(props) {
  const [isEditFormShow, setIsEditFormShow] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEndd, setTimeEndd] = useState("");
  const [place, setPlace] = useState("");
  const [users, setUsers] = useState("");
  const [idCurrWorker, setIdCurrWorker] = useState(null);

  const showEditForm = () => {
    setIsEditFormShow((prev) => !prev);
  };

  const sendData = (e) => {
    e.preventDefault();

    const data = {
      id: props.currEvent[0]._id,
      title: title,
      start: start,
      end: end,
      timeStart: timeStart,
      timeEndd: timeEndd,
      worker: organizer,
      place: place,
    };
    props.onReceive(data);
    setIsEditFormShow(() => false);
  };

  useEffect(() => {
    setTitle(() => props.currEvent[0].title);
    setPlace(() => props.currEvent[0].place);
    setStart(() => props.currEvent[0].start);
    setEnd(() => props.currEvent[0].end);
    setTimeStart(() => props.currEvent[0].timeStart);
    setTimeEndd(() => props.currEvent[0].timeEndd);

    fetch("http://localhost:5000/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(() => res);
        return res;
      })
      .then((res) =>
        setOrganizer(() => res[0].name + " " + res[0].lastName)
      );

    fetch(`http://localhost:5000/Workers/${props.currEvent[0].organizer}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setIdCurrWorker(() => res._id));
  }, []);

  const sendIdToRemoveEvent = (e) => {
    e.preventDefault();
    props.onDelete(
      props.currEvent[0]._id,
      idCurrWorker,
      props.currEvent[0].title
    );
  };

  return (
    <Modal onClose={props.onClose}>
      <button className={classes.exit} onClick={props.onClose}>
        X
      </button>
      <div className="text-center m-2">
        <header className="text-white">
          Event number: {props.currEvent[0]._id}
        </header>
        <section className="mt-4">
          <p>Event Title: {props.currEvent[0].title}</p>
          <p>
            Start Date: {props.currEvent[0].start} {props.currEvent[0].timeStart}
          </p>
          <p>
            End Date:{" "}
            {props.currEvent[0].end
              ? props.currEvent[0].end + " " + props.currEvent[0].timeEndd
              : props.currEvent[0].start + " " + props.currEvent[0].timeEndd}{" "}
          </p>
          <p>Registering Worker: {props.currEvent[0].worker}</p>
          <p>Organizing Worker: {props.currEvent[0].organizer}</p>
          <p>Place: {props.currEvent[0].place}</p>
        </section>
        <button className={classes.editBtn} onClick={showEditForm}>
          {isEditFormShow ? "Hide" : "Edit"}
        </button>
        <button className={classes.editBtn} onClick={sendIdToRemoveEvent}>
          Delete
        </button>
        {props.isDeleted && (
          <p style={{ color: "#90EE90" }} className="mt-2 text-nowrap">
            Event deleted successfully!
          </p>
        )}
      </div>
      {isEditFormShow && (
        <Card className="newEventCard">
          <form onSubmit={sendData}>
            <Row>
              <Col>
                <FormGroup className="text-center">
                  <label htmlFor="titleEvent">Event Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titleEvent"
                    defaultValue={props.currEvent[0].title}
                    onChange={(event) => {
                      setTitle(() => event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <label htmlFor="organizer">Registering Worker</label>
                  <select
                    className="form-control"
                    name="organizer"
                    onChange={(event) => setOrganizer(() => event.target.value)}
                  >
                    {users.map((worker) => (
                      <option key={worker._id}>
                        {worker.name + " " + worker.lastName}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup className="text-center">
                  <label htmlFor="model">Place</label>
                  <input
                    type="text"
                    className="form-control"
                    name="place"
                    defaultValue={props.currEvent[0].place}
                    onChange={(event) => {
                      setPlace(() => event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="text-center">
                  <label htmlFor="model">Start</label>
                  <input
                    type="date"
                    className="form-control"
                    name="lastName"
                    defaultValue={props.currEvent[0].start}
                    onChange={(event) => {
                      setStart(() => event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <label htmlFor="model">End</label>
                  <input
                    type="date"
                    className="form-control"
                    name="lastName"
                    defaultValue={props.currEvent[0].end}
                    onChange={(event) => {
                      setEnd(() => event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <label htmlFor="model">Event Start Time</label>
                  <input
                    type="time"
                    defaultValue={props.currEvent[0].timeStart}
                    className="m-2"
                    onChange={(event) => {
                      setTimeStart(() => event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <label htmlFor="model">Event End Time</label>
                  <input
                    type="time"
                    defaultValue={props.currEvent[0].timeEndd}
                    className="m-2"
                    onChange={(event) => {
                      setTimeEndd(() => event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <div className="m-3 text-center">
                <button
                  type="submit"
                  className="redBtn"
                  style={{ width: "100px" }}
                >
                  Confirm
                </button>
              </div>
            </Row>
          </form>
        </Card>
      )}
    </Modal>
  );
}

export default ReadDescOrEdit;
