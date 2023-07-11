import classes from "../Clients/Table/Tables.module.css";
import { Card, Table } from "react-bootstrap";

function UsersTable(props) {
  return (
    <Card className={classes.ClientCard}>
      <div>
        <header className={`${classes.header} `}>Users</header>
      </div>
      <Table className="mt-2">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.number_tel}</td>
              <td>{item.isAdmin ? "Administrator" : "Employee"}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default UsersTable;
