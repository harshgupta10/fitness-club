import Modal from "../UI/Modal";
import classes from "../UI/ContactCart.module.css";

function WorkerInfo(props) {

    return (
        <Modal onClose={props.onClose}>
            <button className={classes.exit} onClick={props.onClose}>X</button>
            <div className="text-center">
                <label className="text-white">Assigned Events:</label>
                < br/>
                < br/>
                {props.individualEvents.map((event, idx) => (
                    <ul key={event._id} className="text-white">
                        {idx + 1}.
                        <li>Name: {event.title}</li>
                        <li>Start date: {event.start}</li>
                        <li>Start time: {event.timeStart}</li>

                    </ul>
                ))}
            </div>
        </Modal>
    )
}

export default WorkerInfo