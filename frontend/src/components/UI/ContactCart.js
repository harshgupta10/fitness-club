import Modal from "./Modal";
import classes from "./ContactCart.module.css"

function ContactCart(props) {
    return (
        <Modal onClose={props.onClose}>
            <button className={classes.exit} onClick={props.onClose}>X</button>
            <div className={classes.cartContact}>
            <h2>Contact information for the administrator:</h2>
                <p>Harsh Gupta</p>
                <p>VIT Bhopal</p>
                <p>Ashta 466114</p>
                <p>+91 123456789</p>
                <p>har5shx@gmail.com</p>
            </div>
        </Modal>
    )

}

export default ContactCart;