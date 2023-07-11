import { useState } from "react";
import Modal from "../../UI/Modal";
import { Card, Col, FormGroup, Row } from "react-bootstrap";
import classes from "../../Clients/RegisterClientForm.module.css";

function NewLoadsForm(props) {
    const [producent, setProducent] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState(0);
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState("");

    const newLoadsHandler = (e) => {
        e.preventDefault();
        const data = {
            producent: producent,
            type: type,
            amount: amount,
            weight: weight,
            price: price,
            date: date,
        };
        console.log(data);
        props.onReceive(data);
        setProducent("");
        setType("");
        setAmount(0);
        setWeight(0);
        setPrice(0);
        setDate("");
    };

    return (
        <Modal onClose={props.onClose}>
            <Card className={classes.ClientCard}>
                <form onSubmit={newLoadsHandler}>
                    <Row>
                        <Col>
                            <FormGroup className={classes.center}>
                                <label htmlFor="producent">Manufacturer</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="producent"
                                    value={producent}
                                    onChange={(event) => {
                                        setProducent(event.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className={classes.center}>
                                <label htmlFor="type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="typ"
                                    value={type}
                                    onChange={(event) => {
                                        setType(event.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className={classes.center}>
                                <label htmlFor="cena">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="cena"
                                    value={price}
                                    onChange={(event) => {
                                        setPrice(+event.target.value);
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className={classes.center}>
                                <label htmlFor="Amount">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="ilosc"
                                    value={amount}
                                    onChange={(event) => {
                                        setAmount(+event.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className={classes.center}>
                                <label htmlFor="weight">Weight</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="weight"
                                    value={weight}
                                    onChange={(event) => {
                                        setWeight(+event.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className={classes.center}>
                                <label htmlFor="model">Purchase Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dataZakupu"
                                    value={date}
                                    onChange={(event) => {
                                        setDate(event.target.value);
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
                                Add
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

export default NewLoadsForm;
