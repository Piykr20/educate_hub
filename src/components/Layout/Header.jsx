import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useAuth, useTheme, useAppDispatch } from '../../hooks/useRedux';
import { logoutUser } from '../../store/slices/authSlice';
import { toggleDarkMode } from '../../store/slices/themeSlice';

export const Header = () => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };


  return (
    <Navbar bg="white" expand="lg" className="shadow-sm border-bottom sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="bi bi-book me-2 text-primary fs-3"></i>
          <span className="fw-bold text-primary">LearnHub</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search Form */}
          <div className="mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
            <Form className="d-flex gap-2" onSubmit={handleSearch}>
              <div className="position-relative flex-grow-1">
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <FormControl
                  type="search"
                  placeholder="Search courses, teachers..."
                  className="ps-5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" className="btn-gradient">
                <i className="bi bi-search"></i>Search
              </Button>
            </Form>
          </div>

          <Nav className="ms-auto align-items-center">
            {/* Theme Toggle */}
            <Button
              onClick={handleThemeToggle}
              className="theme-toggle me-3"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
            </Button>

            {user ? (
              <>
                {user.role === 'instructor' && (
                  <NavDropdown title="Instructor" id="instructor-dropdown" className="me-3">
                    <NavDropdown.Item as={Link} to="/instructor">
                      <i className="bi bi-speedometer2 me-2"></i>
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/teacher/content">
                      <i className="bi bi-camera-video me-2"></i>
                      Manage Content
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                
                <Button variant="outline-secondary" className="me-3 position-relative btn-floating" style={{ width: 'auto', height: 'auto', borderRadius: '8px' }}>
                  <i className="bi bi-bell"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6em' }}>
                    3
                  </span>
                </Button>

                <NavDropdown 
                  title={
                    <div className="d-flex align-items-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="rounded-circle me-2" width="32" height="32" />
                      ) : (
                        <i className="bi bi-person-circle me-2 fs-5"></i>
                      )}
                      <span>{user.name}</span>
                    </div>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/dashboard">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <Nav.Link as={Link} to="/login" className="me-3">
                  Log in
                </Nav.Link>
                <Button as={Link} to="/register" variant="primary" className="btn-gradient">
                  Sign up
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};