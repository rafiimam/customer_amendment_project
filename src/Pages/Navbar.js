import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Logo from "../Assets/JBL_NEW_LOGO.png";
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/Navbar.css';

const CustomNavbar = ({ isAuthenticated, handleLogout }) => {
    const storedEmployeeInfo = localStorage.getItem('employeeInfo');
    const employeeInfo = storedEmployeeInfo ? JSON.parse(storedEmployeeInfo) : null;
    const location = useLocation();

    const isActiveTab = (path) => {
        return location.pathname === path;
    };

    return (
        <Navbar className="navbar">
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">
                    <img src={Logo} className="logo" alt="JamunaBankLogo" />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/dashboard" className={isActiveTab("/dashboard") ? "active" : ""}>Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/amend-customer" className={isActiveTab("/amend-customer") ? "active" : ""}>Customer Amend</Nav.Link>
                    <Nav.Link as={Link} to="/authorization" className={isActiveTab("/authorization") ? "active" : ""}>Authorization</Nav.Link>
                </Nav>

                {isAuthenticated && employeeInfo && (
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ backgroundColor: '#7175BA' }}>
                            {/* Display some information about the employee */}
                            {`Hello, ${employeeInfo.Full_Name}`}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* Dropdown content with employee information */}
                            <Dropdown.Item>{`Name: ${employeeInfo.Full_Name}`}</Dropdown.Item>
                            <Dropdown.Item>{`ID: ${employeeInfo.Employee_ID}`}</Dropdown.Item>
                            <Dropdown.Item>{`Teller Num: ${employeeInfo.Teller_num}`}</Dropdown.Item>
                            <Dropdown.Item>{`Branch Code: ${employeeInfo.branch_code}`}</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
