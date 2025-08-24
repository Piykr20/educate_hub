import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Nav, Tab } from 'react-bootstrap';
import { mockTeachers, mockCourses } from '../../data/mockData';
import { CourseCard } from '../../components/CourseCard';

export const TeacherProfile = () => {
  const { id } = useParams();
  const teacher = mockTeachers.find(t => t.id === id);
  const teacherCourses = mockCourses.filter(course => teacher?.courses.includes(course.id));

  if (!teacher) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h2 fw-bold mb-4">Teacher not found</h1>
        <Button as={Link} to="/search?type=teachers" variant="primary">
          Browse Teachers
        </Button>
      </Container>
    );
  }

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

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={3} className="text-center mb-4 mb-md-0">
              <img 
                src={teacher.avatar} 
                alt={teacher.name}
                className="rounded-circle mb-3"
                width="150"
                height="150"
                style={{ objectFit: 'cover' }}
              />
            </Col>
            <Col md={9}>
              <h1 className="display-4 fw-bold mb-3">{teacher.name}</h1>
              
              <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    {renderStars(teacher.rating)}
                  </div>
                  <span className="fw-medium me-2">{teacher.rating}</span>
                  <span className="text-light">({teacher.totalStudents.toLocaleString()} students)</span>
                </div>
                
                <div className="d-flex align-items-center text-light">
                  <i className="bi bi-book me-2"></i>
                  <span>{teacher.totalCourses} courses</span>
                </div>
                
                <div className="d-flex align-items-center text-light">
                  <i className="bi bi-calendar me-2"></i>
                  <span>{teacher.yearsExperience}+ years experience</span>
                </div>
              </div>

              <p className="lead mb-4">{teacher.bio}</p>

              <div className="d-flex flex-wrap gap-2">
                {teacher.specializations.map((spec, index) => (
                  <Badge key={index} bg="light" text="dark" className="px-3 py-2">
                    {spec}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <Tab.Container defaultActiveKey="courses">
              <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="courses">
                    <i className="bi bi-book me-2"></i>
                    Courses ({teacherCourses.length})
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="about">
                    <i className="bi bi-person me-2"></i>
                    About
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="courses">
                  <Row>
                    {teacherCourses.map((course) => (
                      <Col key={course.id} md={6} className="mb-4">
                        <CourseCard course={course} />
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey="about">
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <h4 className="fw-bold mb-4">About {teacher.name}</h4>
                      <p className="mb-4">{teacher.bio}</p>
                      
                      <h5 className="fw-bold mb-3">Qualifications & Experience</h5>
                      <ul className="list-unstyled">
                        {teacher.qualifications.map((qual, index) => (
                          <li key={index} className="d-flex align-items-start mb-2">
                            <div className="bg-success bg-opacity-10 p-1 rounded-circle me-3 mt-1">
                              <i className="bi bi-check text-success"></i>
                            </div>
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>

                      <h5 className="fw-bold mb-3 mt-4">Areas of Expertise</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {teacher.specializations.map((spec, index) => (
                          <Badge key={index} bg="primary" className="px-3 py-2">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header>
                <h5 className="mb-0">Teacher Stats</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total Students:</span>
                    <span className="fw-medium">{teacher.totalStudents.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total Courses:</span>
                    <span className="fw-medium">{teacher.totalCourses}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Average Rating:</span>
                    <span className="fw-medium">{teacher.rating}/5.0</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Experience:</span>
                    <span className="fw-medium">{teacher.yearsExperience}+ years</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {teacher.socialLinks && (
              <Card className="border-0 shadow-sm">
                <Card.Header>
                  <h5 className="mb-0">Connect</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex flex-column gap-2">
                    {teacher.socialLinks.linkedin && (
                      <Button 
                        href={teacher.socialLinks.linkedin}
                        target="_blank"
                        variant="outline-primary"
                        className="btn-social"
                      >
                        <i className="bi bi-linkedin me-2"></i>
                        LinkedIn
                      </Button>
                    )}
                    {teacher.socialLinks.twitter && (
                      <Button 
                        href={teacher.socialLinks.twitter}
                        target="_blank"
                        variant="outline-info"
                        className="btn-social"
                      >
                        <i className="bi bi-twitter me-2"></i>
                        Twitter
                      </Button>
                    )}
                    {teacher.socialLinks.github && (
                      <Button 
                        href={teacher.socialLinks.github}
                        target="_blank"
                        variant="outline-dark"
                        className="btn-social"
                      >
                        <i className="bi bi-github me-2"></i>
                        GitHub
                      </Button>
                    )}
                    {teacher.socialLinks.website && (
                      <Button 
                        href={teacher.socialLinks.website}
                        target="_blank"
                        variant="outline-secondary"
                        className="btn-social"
                      >
                        <i className="bi bi-globe me-2"></i>
                        Website
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};