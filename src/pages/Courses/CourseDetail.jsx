import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Nav, Accordion, Alert } from 'react-bootstrap';
import { mockCourses, mockReviews } from '../../data/mockData';
import { useAuth } from '../../hooks/useRedux';

export const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const course = mockCourses.find(c => c.id === id);
  const reviews = mockReviews.filter(r => r.courseId === id);

  if (!course) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h2 fw-bold mb-4">Course not found</h1>
        <Button as={Link} to="/courses" variant="primary">
          Browse all courses
        </Button>
      </Container>
    );
  }

  const discountPercentage = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill rating-stars"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star rating-stars"></i>);
      }
    }
    return stars;
  };

  const handleEnroll = () => {
    // In a real app, this would handle enrollment logic
    alert('Enrollment functionality would be implemented here with payment processing');
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col lg={8}>
              <Badge bg="primary" className="mb-3">{course.category}</Badge>
              
              <h1 className="display-4 fw-bold mb-4">{course.title}</h1>
              
              <p className="lead mb-4">{course.description}</p>

              <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    {renderStars(course.rating)}
                  </div>
                  <span className="fw-medium me-2">{course.rating}</span>
                  <span className="text-light">({course.studentsCount.toLocaleString()} students)</span>
                </div>
                
                <div className="d-flex align-items-center text-light">
                  <i className="bi bi-clock me-2"></i>
                  <span>{course.duration}</span>
                </div>
                
                <div className="d-flex align-items-center text-light">
                  <i className="bi bi-people me-2"></i>
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  className="rounded-circle me-3"
                  width="48"
                  height="48"
                />
                <div>
                  <p className="mb-0 fw-medium">Created by {course.instructor.name}</p>
                  <small className="text-light">Expert Instructor</small>
                </div>
              </div>
            </Col>

            {/* Course Card */}
            <Col lg={4}>
              <Card className="shadow-lg">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={course.thumbnail} 
                    alt={course.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <Button variant="light" className="rounded-circle" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-play-fill fs-4"></i>
                    </Button>
                  </div>
                </div>
                
                <Card.Body>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="h3 fw-bold me-2">${course.price}</span>
                      {course.originalPrice && (
                        <>
                          <span className="text-muted text-decoration-line-through me-2">
                            ${course.originalPrice}
                          </span>
                          <Badge bg="danger">
                            {discountPercentage}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                    <small className="text-danger fw-medium">
                      🔥 Limited time offer!
                    </small>
                  </div>

                  {user ? (
                    <Button
                      onClick={handleEnroll}
                      variant="danger"
                      size="lg"
                      className="w-100 mb-3 btn-gradient"
                    >
                      Enroll Now
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to="/register"
                      variant="danger"
                      size="lg"
                      className="w-100 mb-3 btn-gradient"
                    >
                      Sign up to Enroll
                    </Button>
                  )}
                  
                  <Button variant="outline-secondary" className="w-100 mb-3 btn-hover-fill">
                    Add to Wishlist
                  </Button>

                  <div className="small">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Total lectures:</span>
                      <span className="fw-medium">{course.lessons.length}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Duration:</span>
                      <span className="fw-medium">{course.duration}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Skill level:</span>
                      <span className="fw-medium">{course.level}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Certificate:</span>
                      <span className="fw-medium">Yes</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Course Content */}
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            {/* Tabs */}
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')}
                  className="text-decoration-none"
                >
                  Overview
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'curriculum'} 
                  onClick={() => setActiveTab('curriculum')}
                  className="text-decoration-none"
                >
                  Curriculum
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'reviews'} 
                  onClick={() => setActiveTab('reviews')}
                  className="text-decoration-none"
                >
                  Reviews
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <h4 className="fw-bold mb-4">What you'll learn</h4>
                    <Row>
                      {[
                        'Master React fundamentals and advanced concepts',
                        'Build real-world projects from scratch',
                        'Learn modern React patterns and best practices',
                        'Understand state management with hooks',
                        'Implement routing and navigation',
                        'Deploy React applications to production',
                      ].map((item, index) => (
                        <Col key={index} md={6} className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="bg-success bg-opacity-10 p-1 rounded-circle me-3 mt-1">
                              <i className="bi bi-check text-success"></i>
                            </div>
                            <span>{item}</span>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h4 className="fw-bold mb-4">Course Description</h4>
                    <div>
                      <p>
                        This comprehensive React course is designed to take you from a complete beginner to an advanced React developer. 
                        You'll learn everything you need to know to build modern, scalable web applications using React.js.
                      </p>
                      <p>
                        Throughout this course, you'll work on real-world projects that will help you understand how React works in practice. 
                        We'll cover everything from basic components to advanced patterns like render props, higher-order components, and hooks.
                      </p>
                      <p>
                        By the end of this course, you'll have the confidence and skills to build your own React applications from scratch 
                        and contribute to existing React projects.
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <Card className="border-0 shadow-sm">
                <Card.Header>
                  <h4 className="mb-0">Course Curriculum</h4>
                  <small className="text-muted">
                    {course.lessons.length} lectures • {course.duration} total length
                  </small>
                </Card.Header>
                <Card.Body className="p-0">
                  <Accordion flush>
                    {course.lessons.map((lesson, index) => (
                      <Accordion.Item key={lesson.id} eventKey={index.toString()}>
                        <Accordion.Header>
                          <div className="d-flex align-items-center w-100">
                            <Badge bg="primary" className="me-3">{index + 1}</Badge>
                            <div className="flex-grow-1">
                              <div className="fw-medium">{lesson.title}</div>
                              <small className="text-muted">
                                <i className="bi bi-clock me-1"></i>
                                {lesson.duration}
                              </small>
                            </div>
                          </div>
                        </Accordion.Header>
                        {lesson.description && (
                          <Accordion.Body>
                            <p className="text-muted mb-0">{lesson.description}</p>
                          </Accordion.Body>
                        )}
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            )}

            {activeTab === 'reviews' && (
              <div>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <h4 className="fw-bold mb-4">Student Reviews</h4>
                    <Row className="align-items-center">
                      <Col md={4} className="text-center">
                        <div className="h1 fw-bold">{course.rating}</div>
                        <div className="mb-2">
                          {renderStars(course.rating)}
                        </div>
                        <small className="text-muted">Course Rating</small>
                      </Col>
                      <Col md={8}>
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="d-flex align-items-center mb-2">
                            <span className="small text-muted me-2">{stars} stars</span>
                            <div className="flex-grow-1 bg-light rounded" style={{ height: '8px' }}>
                              <div 
                                className="bg-warning rounded h-100"
                                style={{ width: `${stars === 5 ? 60 : stars === 4 ? 25 : 10}%` }}
                              />
                            </div>
                            <span className="small text-muted ms-2">
                              {stars === 5 ? '60%' : stars === 4 ? '25%' : '10%'}
                            </span>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <div className="d-flex flex-column gap-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex align-items-start">
                          <img 
                            src={review.userAvatar} 
                            alt={review.userName}
                            className="rounded-circle me-3"
                            width="48"
                            height="48"
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="mb-0 me-3">{review.userName}</h6>
                              <div>
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="mb-2">{review.comment}</p>
                            <small className="text-muted">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header>
                <h5 className="mb-0">Course Features</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column gap-2 small">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">On-demand video:</span>
                    <span className="fw-medium">{course.duration}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Downloadable resources:</span>
                    <span className="fw-medium">Yes</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Full lifetime access:</span>
                    <span className="fw-medium">Yes</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Certificate of completion:</span>
                    <span className="fw-medium">Yes</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Header>
                <h5 className="mb-0">About the Instructor</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    className="rounded-circle me-3"
                    width="64"
                    height="64"
                  />
                  <div>
                    <h6 className="mb-0">{course.instructor.name}</h6>
                    <small className="text-muted">Expert Instructor</small>
                  </div>
                </div>
                <p className="text-muted small mb-0">
                  Expert instructor with years of experience in web development and React.js. 
                  Passionate about teaching and helping students achieve their goals.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};