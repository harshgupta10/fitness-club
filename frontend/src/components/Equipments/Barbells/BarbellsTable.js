import classes from "../../Clients/Table/Tables.module.css";
import { Card, Table } from "react-bootstrap";

function BarbellsTable(props) {
    return (
        <Card className={classes.ClientCard}>
            <div>
                <header className={`${classes.header}`}>Barbells</header>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th />
                        <th>Manufacturer</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                        <th>Price per piece</th>
                        <th>Purchase Date</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {props.barbells.map((barbell, idx) => (
                        <tr key={barbell._id}>
                            <td>{idx + 1}.</td>
                            <td>{barbell.producent}</td>
                            <td>{barbell.type}</td>
                            <td>{barbell.amount} pcs.</td>
                            <td>{barbell.weight} kg</td>
                            <td>{barbell.price} zł</td>
                            <td>{barbell.date}</td>
                            <td>
                                <button
                                    className={classes.btnTable}
                                    onClick={() => {
                                        props.setTempBarbell(barbell);
                                        props.showEditModal();
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
}

export default BarbellsTable;
