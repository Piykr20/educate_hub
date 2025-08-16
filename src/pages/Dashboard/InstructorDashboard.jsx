import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { useAuth } from '../../hooks/useRedux';
import { mockCourses } from '../../data/mockData';

export const InstructorDashboard = () => {
  const { user } = useAuth();
  
  // Get courses created by the current instructor
  const instructorCourses = mockCourses.filter(course => course.instructor.id === user?.id);
  
  // Calculate stats
  const totalStudents = instructorCourses.reduce((sum, course) => sum + course.studentsCount, 0);
  const totalEarnings = instructorCourses.reduce((sum, course) => sum + (course.price * course.studentsCount), 0);
  const averageRating = instructorCourses.length > 0 ? 
    instructorCourses.reduce((sum, course) => sum + course.rating, 0) / instructorCourses.length : 0;

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold">Instructor Dashboard</h1>
          <p className="text-muted">Manage your courses and track your performance</p>
        </div>
        <Button as={Link} to="/instructor/create-course" variant="primary" className="btn-gradient">
          <i className="bi bi-plus me-2"></i>
          Create Course
        </Button>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-eye text-primary fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">{instructorCourses.length}</h3>
                <small className="text-muted">Total Courses</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-people text-success fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">{totalStudents.toLocaleString()}</h3>
                <small className="text-muted">Total Students</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-star text-warning fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">{averageRating.toFixed(1)}</h3>
                <small className="text-muted">Average Rating</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-currency-dollar text-info fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">${totalEarnings.toLocaleString()}</h3>
                <small className="text-muted">Total Earnings</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Course Management */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Your Courses</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Course</th>
                  <th>Students</th>
                  <th>Rating</th>
                  <th>Revenue</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {instructorCourses.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="rounded me-3"
                          width="50"
                          height="50"
                          style={{ objectFit: 'cover' }}
                        />
                        <div>
                          <div className="fw-medium">{course.title}</div>
                          <small className="text-muted">{course.category}</small>
                        </div>
                      </div>
                    </td>
                    <td>{course.studentsCount.toLocaleString()}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span>{course.rating}</span>
                      </div>
                    </td>
                    <td>${(course.price * course.studentsCount).toLocaleString()}</td>
                    <td>
                      <Badge bg={course.isPublished ? 'success' : 'warning'}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          as={Link} 
                          to={`/instructor/course/${course.id}/edit`}
                          variant="outline-primary"
                          size="sm"
                          className="btn-hover-fill"
                        >
                          Edit
                        </Button>
                        <Button 
                          as={Link} 
                          to={`/course/${course.id}`}
                          variant="outline-success"
                          size="sm"
                          className="btn-hover-fill"
                        >
                          View
                        </Button>
                        <Button 
                          as={Link} 
                          to={`/instructor/course/${course.id}/analytics`}
                          variant="outline-info"
                          size="sm"
                          className="btn-hover-fill"
                        >
                          Analytics
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Recent Activity */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white">
              <h6 className="mb-0">Recent Enrollments</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                      <i className="bi bi-people text-primary"></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 small fw-medium">John Doe enrolled in React Course</p>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white">
              <h6 className="mb-0">Recent Reviews</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="d-flex align-items-start">
                    <div className="bg-warning bg-opacity-10 p-2 rounded-circle me-3">
                      <i className="bi bi-star text-warning"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <div className="text-warning me-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill small"></i>
                          ))}
                        </div>
                        <small className="text-muted">by Sarah Wilson</small>
                      </div>
                      <p className="mb-0 small">Great course! Very informative.</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};