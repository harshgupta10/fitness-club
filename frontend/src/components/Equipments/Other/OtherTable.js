import classes from "../Machines/MachinesTable.module.css";
import {Card, Table} from "react-bootstrap";

function OtherTable(props) {

    return (
        <Card className={classes.cardMachines}>
            <div>
                <header className={`${classes.header}`}>Pozostałe</header>
            </div>
            <Table>
                <thead>
                <tr>
                <th/>
                    <th>Producer</th>
                    <th>Name</th>
                    <th>Purpose</th>
                    <th>Quantity</th>
                    <th>Price per piece</th>
                    <th>Purchase Date</th>
                    <th/>

                </tr>
                </thead>
                <tbody>
                {props.others.map((item, idx) => (
                    <tr key={item._id}>
                        <td>{idx + 1}.</td>
                        <td>{item.producent}</td>
                        <td>{item.name}</td>
                        <td>{item.destination}</td>
                        <td>{item.amount}pcs.</td>
                        <td>{item.price}rs</td>
                        <td>{item.date}</td>
                        <td>
                            <button className={classes.btnTable} onClick={() => {
                                props.setTempOther(() => item)
                                props.showEditModal()
                            }}>
                            Edit
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </Table>
        </Card>
    )
}

export default OtherTable;