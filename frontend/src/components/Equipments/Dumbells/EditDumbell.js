import { Card, Col, FormGroup, Row } from "react-bootstrap";
import classes from "../../Clients/RegisterClientForm.module.css";
import Modal from "../../UI/Modal";
import { useEffect, useState } from "react";

function EditDumbbell(props) {
    const [producent, setProducent] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState(2);
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState("");

    const editDumbbellHandler = (e) => {
        e.preventDefault();

        const data = {
            producent: producent,
            type: type,
            weight: weight,
            amount: amount,
            price: price,
            date: date,
        };
        props.onReceive(data, props.tempDumbbell._id);
    };

    useEffect(() => {
        setProducent(props.tempDumbbell.producent);
        setType(props.tempDumbbell.type);
        setWeight(props.tempDumbbell.weight);
        setAmount(props.tempDumbbell.amount);
        setPrice(props.tempDumbbell.price);
        setDate(props.tempDumbbell.date);
    }, []);

    return (
        <Modal onClose={props.onClose}>
            <Card className={classes.ClientCard}>
                <form onSubmit={editDumbbellHandler}>
                    <Row>
                        <Col>
                            <FormGroup className={classes.center}>
                                <label htmlFor="producent">Manufacturer</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="producent"
                                    defaultValue={props.tempDumbbell.producent}
                                    onChange={(event) => {
                                        setProducent(event.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className={classes.center}>
                                <label htmlFor="name">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="typ"
                                    defaultValue={props.tempDumbbell.type}
                                    onChange={(event) => {
                                        setType(event.target.value);
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className={classes.center}>
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    defaultValue={props.tempDumbbell.price}
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
                                    defaultValue={props.tempDumbbell.amount}
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
                                    defaultValue={props.tempDumbbell.weight}
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
                                    defaultValue={props.tempDumbbell.date}
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
                                Save
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

export default EditDumbbell;
