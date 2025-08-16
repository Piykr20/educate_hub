import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer className="footer-dark py-5">
      <Container>
        <Row>
          {/* Brand */}
          <Col md={3} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-book me-2 text-primary fs-3"></i>
              <span className="fs-4 fw-bold text-white">LearnHub</span>
            </div>
            <p className="text-muted small">
              Empowering learners worldwide with high-quality online courses and expert instruction.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} className="mb-4">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/courses">Browse Courses</Link></li>
              <li className="mb-2"><Link to="/categories">Categories</Link></li>
              <li className="mb-2"><Link to="/instructors">Become Instructor</Link></li>
              <li className="mb-2"><Link to="/about">About Us</Link></li>
            </ul>
          </Col>

          {/* Support */}
          <Col md={2} className="mb-4">
            <h6 className="text-white mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/help">Help Center</Link></li>
              <li className="mb-2"><Link to="/contact">Contact Us</Link></li>
              <li className="mb-2"><Link to="/terms">Terms of Service</Link></li>
              <li className="mb-2"><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col md={5} className="mb-4">
            <h6 className="text-white mb-3">Stay Updated</h6>
            <p className="text-muted small mb-3">
              Subscribe to our newsletter for the latest courses and updates.
            </p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
              />
              <Button variant="primary">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />
        
        <Row>
          <Col className="text-center">
            <p className="text-muted small mb-0">
              &copy; 2025 LearnHub. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};