import { Card, Table } from "react-bootstrap";
import classes from "./Tables.module.css";

function ClientsTable(props) {
  return (
    <Card className={classes.ClientCard}>
      <div>
        <header className={`${classes.header}`}>Clients</header>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Magnetic Card Number</th>
            <th>Membership</th>
            <th>Active</th>
            <th>Creation Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.clients
            .filter((val) => {
              if (props.searchUsers === "") {
                return val;
              } else if (
                val.email.toLowerCase().includes(props.searchUsers.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>{item.number_tel}</td>
                <td>
                  {item.number_magnetic_cart}
                  <button
                    className={classes.btnTable}
                    onClick={() => {
                      props.isHistoryShowTrigger();
                      props.getIdToHistory(item._id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className={classes.btnTable}
                    disabled={!item.isClientIn}
                    style={{
                      background: "green",
                    }}
                    onClick={() => {
                      props.getIdToUpdateWhenIn(item._id);
                      props.updateWhenInFlag(item._id);
                    }}
                  >
                    In Gym
                  </button>
                  <button
                    className={classes.btnTable}
                    disabled={item.isClientIn}
                    onClick={(e) => {
                      props.getIdToUpdateWhenOut(item._id);
                      props.updateWhenOutFlag(item._id);
                    }}
                  >
                    Outside Gym
                  </button>
                </td>
                <td>
                  <button
                    className={classes.btnTable}
                    onClick={() => {
                      props.isKarnetShowTrigger();
                      props.checkKarnet(item._id);
                    }}
                  >
                    Check
                  </button>
                </td>
                <td>{item.active ? "Yes" : "No"}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button
                    className={classes.btnTable}
                    onClick={() => {
                      props.setTempClient(() => item);
                      props.onShowEdit();
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

export default ClientsTable;