import classes from "./MachinesTable.module.css"
import {Card, Table} from "react-bootstrap";

function MachinesTable(props) {

    return (
        <Card className={classes.cardMachines}>
            <div>
                <header className={`${classes.header}`}>Maszyny</header>
            </div>
            <Table>
                <thead>
                <tr>
                    <th/>
                    <th>Serial number</th>
                    <th>Name</th>
                    <th>Producent</th>
                    <th>Producer</th>
                    <th>date of purchase</th>
                    <th/>

                </tr>
                </thead>
                <tbody>
                {props.machines.map((machine, idx) => (
                    <tr key={machine._id}>
                        <td>{idx + 1}.</td>
                        <td>{machine.serial_number}</td>
                        <td>{machine.name}</td>
                        <td>{machine.producent}</td>
                        <td>{machine.price}zł</td>
                        <td>{machine.date}</td>
                        <td>
                            <button className={classes.btnTable} onClick={() => {
                                props.setTempMachine(() => machine)
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

export default MachinesTable;