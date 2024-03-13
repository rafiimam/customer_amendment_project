import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const Sidebar = () => (
  <Nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{ backgroundColor: '#C5E1FC', paddingTop: '20px', paddingBottom: '20px', marginTop: '56px' }}>
    <div className="sidebar-sticky">
      <Nav.Link as={Link} to="/amend-customer" style={linkStyle}>Customer Amend</Nav.Link>
      <Nav.Link as={Link} to="/authorization" style={linkStyle}>Journal Authorization</Nav.Link>
      <Nav.Link as={Link} to="/dashboard" style={linkStyle}>Journal Status</Nav.Link>
      {/* Add more links as needed */}
    </div>
  </Nav>
);

const linkStyle = {
  padding: '10px', // Adjust the padding as needed
  marginBottom: '10px', // Adjust the margin as needed
  color: '#333', // Adjust the text color
  textDecoration: 'none', // Remove underline
};

export default Sidebar;