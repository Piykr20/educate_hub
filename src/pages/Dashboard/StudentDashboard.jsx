import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { useAuth, useEnrollment } from '../../hooks/useRedux';
import { mockCourses, mockEnrollments } from '../../data/mockData';
import { CourseCard } from '../../components/CourseCard';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { enrollments } = useEnrollment();
  
  // Get enrolled courses for the current user
  const userEnrollments = enrollments.length > 0 ? enrollments : mockEnrollments.filter(e => e.userId === user?.id);
  const enrolledCourses = userEnrollments.map(enrollment => {
    const course = mockCourses.find(c => c.id === enrollment.courseId);
    return { course, enrollment };
  }).filter(item => item.course);

  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(item => item.enrollment.progress >= 100).length;
  const averageProgress = totalCourses > 0 ? 
    enrolledCourses.reduce((sum, item) => sum + item.enrollment.progress, 0) / totalCourses : 0;
  const totalHours = enrolledCourses.reduce((sum, item) => {
    const duration = item.course?.duration || '0h 0m';
    const hours = parseFloat(duration.match(/(\d+)h/)?.[1] || '0');
    const minutes = parseFloat(duration.match(/(\d+)m/)?.[1] || '0');
    return sum + hours + minutes / 60;
  }, 0);

  const recommendations = mockCourses.filter(course => 
    !userEnrollments.some(e => e.courseId === course.id)
  ).slice(0, 4);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 fw-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted">Continue your learning journey</p>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-bookmark text-primary fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">{totalCourses}</h3>
                <small className="text-muted">Enrolled Courses</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-trophy text-success fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">{completedCourses}</h3>
                <small className="text-muted">Completed Courses</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-clock text-info fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">{Math.round(averageProgress)}%</h3>
                <small className="text-muted">Average Progress</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                <i className="bi bi-clock text-warning fs-4"></i>
              </div>
              <div>
                <h3 className="mb-0">{Math.round(totalHours)}h</h3>
                <small className="text-muted">Total Learning</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Continue Learning */}
      {enrolledCourses.length > 0 && (
        <div className="mb-5">
          <h2 className="h4 fw-bold mb-4">Continue Learning</h2>
          <Row>
            {enrolledCourses.slice(0, 2).map(({ course, enrollment }) => (
              <Col key={course.id} lg={6} className="mb-4">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={4} md={3}>
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={8} md={9}>
                        <h5 className="mb-2">{course.title}</h5>
                        <div className="d-flex align-items-center mb-3">
                          <img 
                            src={course.instructor.avatar} 
                            alt={course.instructor.name}
                            className="rounded-circle me-2"
                            width="20"
                            height="20"
                          />
                          <small className="text-muted">{course.instructor.name}</small>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between small text-muted mb-1">
                            <span>Progress</span>
                            <span>{Math.round(enrollment.progress)}%</span>
                          </div>
                          <ProgressBar 
                            now={enrollment.progress} 
                            className="progress-bar-custom"
                          />
                        </div>
                        <Button 
                          as={Link} 
                          to={`/learn/${course.id}`}
                          variant="primary"
                          size="sm"
                          className="btn-gradient"
                        >
                          <i className="bi bi-play me-2"></i>
                          Continue Learning
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Recommended Courses */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold mb-0">Recommended for You</h2>
          <Button as={Link} to="/courses" variant="outline-primary">
            View All Courses
          </Button>
        </div>
        <Row>
          {recommendations.map((course) => (
            <Col key={course.id} md={6} lg={3} className="mb-4">
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Recent Activity</h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column gap-3">
            {enrolledCourses.slice(0, 3).map(({ course, enrollment }) => (
              <div key={course.id} className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                  <i className="bi bi-play text-primary"></i>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 small fw-medium">
                    Continued learning "{course.title}"
                  </p>
                  <small className="text-muted">
                    {enrollment.completedLessons.length} lessons completed
                  </small>
                </div>
                <small className="text-muted">2 hours ago</small>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};