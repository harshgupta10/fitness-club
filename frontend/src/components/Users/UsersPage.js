import ContactCart from "../UI/ContactCart";
import NavbarLayout from "../Layout/NavbarLayout";
import SidebarLayout from "../Layout/SidebarLayout";
import {Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import UsersTable from "./UsersTable";
import AddUserForm from "./AddUserForm";
import useGet from "../../hooks/useGet";

function UsersPage() {


    const [users, setUsers] = useState([])
    const [isCartShow, setIsCartShow] = useState(false)
    const [isAddModalShow, setIsAddModalShow] = useState(false)

    const fetchUsers = useGet("http://localhost:5000/Users");

    useEffect(() => {
        setUsers(() => fetchUsers);
    }, [fetchUsers])

    /*useEffect(() => {
        fetch(`http://localhost:5000/Users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => setUsers(res))
    }, [])*/

    const showModalCart = () => {
        setIsCartShow(() => true)
    }

    const closeModalCart = () => {
        setIsCartShow(() => false)
    }

    const addModalShow = () => {
        setIsAddModalShow(() => true)
    }

    const addCloseModal = () => {
        setIsAddModalShow(() => false)
    }

    const addWorkerHandler = (data) => {
        console.log(data)
        fetch(`http://localhost:5000/Users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => setUsers((prev) => [...prev, res]))
        setIsAddModalShow(() => false)
    }

    /*const xmlexampleGet = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/Users", true);

        xhr.onload = () => {
            const data = JSON.parse(xhr.response);
            console.log(xhr.response);
            console.log(data);
            setTestUsers(data);
        }
        xhr.send();

    }*/

    /*const axiosexampleGet = () => {
        axios.get("http://localhost:5000/Users", {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => setTestUsers2(res.data))
            .catch(err => console.log(err))
    }*/

    return (
        <Row>
            {isCartShow && <ContactCart onClose={closeModalCart}/>}
            <NavbarLayout onShowContact={showModalCart}/>
            <SidebarLayout/>
            <Col xs={10} lg={10} className="pageWrapper">
                <Col lg={11} className="clientsPage">
                    <Row className="m-5">
                        <Col xs={3} className="mt-2">
                            <button className="redBtn text-nowrap" onClick={addModalShow}>Register user</button>
                        </Col>
                    </Row>
                    <UsersTable users={users}/>
                    {isAddModalShow && <AddUserForm onClose={addCloseModal} onReceive={addWorkerHandler}/>}
                </Col>

            </Col>

        </Row>
    )
}

export default UsersPage