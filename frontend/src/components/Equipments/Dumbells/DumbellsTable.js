import classes from "../Machines/MachinesTable.module.css";
import { Card, Table } from "react-bootstrap";

function DumbbellsTable(props) {
    return (
        <Card className={classes.cardMachines}>
            <div>
                <header className={`${classes.header}`}>Dumbbells</header>
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
                    {props.dumbbells.map((item, idx) => (
                        <tr key={item._id}>
                            <td>{idx + 1}</td>
                            <td>{item.producent}</td>
                            <td>{item.type}</td>
                            <td>{item.amount} pcs.</td>
                            <td>{item.weight} kg</td>
                            <td>{item.price} zł</td>
                            <td>{item.date}</td>
                            <td>
                                <button
                                    className={classes.btnTable}
                                    onClick={() => {
                                        props.setTempDumbell(item);
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

export default DumbbellsTable;
