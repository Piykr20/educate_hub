import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { CourseCard } from '../components/CourseCard';
import { mockCourses, mockCategories } from '../data/mockData';

export const Home = () => {
  const featuredCourses = mockCourses.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4">
                Learn Without
                <span className="d-block text-warning">Limits</span>
              </h1>
              <p className="lead mb-4">
                Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class instructors.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button as={Link} to="/courses" variant="warning" size="lg" className="fw-semibold btn-gradient">
                  <i className="bi bi-arrow-right me-2"></i>
                  Explore Courses
                </Button>
                <Button as={Link} to="/register" variant="outline-light" size="lg" className="fw-semibold">
                  <i className="bi bi-play me-2"></i>
                  Start Learning
                </Button>
              </div>
            </Col>
            <Col lg={6} className="position-relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Learning illustration"
                className="img-fluid rounded shadow-lg"
              />
              <Card className="position-absolute bottom-0 start-0 translate-middle-x bg-white text-dark shadow-lg" style={{ transform: 'translateX(-20px) translateY(20px)' }}>
                <Card.Body className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                    <i className="bi bi-star-fill text-success fs-4"></i>
                  </div>
                  <div>
                    <h4 className="mb-0">4.8/5</h4>
                    <small className="text-muted">Average Rating</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-primary mb-2">5,000+</div>
              <div className="text-muted">Online Courses</div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-success mb-2">50,000+</div>
              <div className="text-muted">Students Enrolled</div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-info mb-2">1,200+</div>
              <div className="text-muted">Expert Instructors</div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-warning mb-2">95%</div>
              <div className="text-muted">Success Rate</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Explore Top Categories</h2>
            <p className="lead text-muted">Find the perfect course for your career goals</p>
          </div>
          
          <Row>
            {mockCategories.map((category) => (
              <Col key={category.id} md={4} lg={2} className="mb-4">
                <Card 
                  as={Link} 
                  to={`/courses?category=${category.name}`}
                  className="category-card text-decoration-none border-0 shadow-sm text-center h-100"
                >
                  <Card.Body className="py-4">
                    <div className="fs-1 mb-3">{category.icon}</div>
                    <Card.Title className="h6 mb-1">{category.name}</Card.Title>
                    <small className="text-muted">{category.courseCount} courses</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Courses */}
      <section className="py-5 bg-white">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-3">Featured Courses</h2>
              <p className="lead text-muted">Start learning with our most popular courses</p>
            </div>
            <Button as={Link} to="/courses" variant="outline-primary">
              View All Courses
              <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </div>

          <Row>
            {featuredCourses.map((course) => (
              <Col key={course.id} md={6} lg={3} className="mb-4">
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white">
        <Container className="text-center">
          <h2 className="display-5 fw-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="lead mb-4">Join thousands of students already learning on LearnHub</p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/register" variant="light" size="lg" className="fw-semibold btn-gradient">
              Get Started for Free
            </Button>
            <Button as={Link} to="/courses" variant="outline-light" size="lg" className="fw-semibold">
              Browse Courses
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};