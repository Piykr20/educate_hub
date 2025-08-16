import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';

export const CourseCard = ({ course, showEnrollButton = true }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill rating-stars"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="bi bi-star-half rating-stars"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star rating-stars"></i>);
      }
    }

    return stars;
  };

  const discountPercentage = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <Card className="course-card h-100 border-0 shadow-sm">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={course.thumbnail} 
          alt={course.title}
          className="course-thumbnail"
        />
        {discountPercentage > 0 && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            -{discountPercentage}%
          </Badge>
        )}
        <Badge bg="dark" className="position-absolute top-0 end-0 m-2">
          {course.level}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title as={Link} to={`/course/${course.id}`} className="text-decoration-none text-dark line-clamp-2 mb-2">
          {course.title}
        </Card.Title>

        <div className="d-flex align-items-center mb-2">
          <img 
            src={course.instructor.avatar || '/default-avatar.png'} 
            alt={course.instructor.name}
            className="instructor-avatar rounded-circle me-2"
          />
          <small className="text-muted">{course.instructor.name}</small>
        </div>

        <Card.Text className="text-muted small line-clamp-2 mb-3">
          {course.description}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-clock me-1"></i>
            <span>{course.duration}</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-people me-1"></i>
            <span>{course.studentsCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <div className="me-2">
              {renderStars(course.rating)}
            </div>
            <small className="fw-bold me-1">{course.rating}</small>
            <small className="text-muted">({course.studentsCount})</small>
          </div>
          <Badge bg="primary" pill className="small">
            {course.category}
          </Badge>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex align-items-center">
            <span className="h5 fw-bold mb-0 me-2">
              ${course.price}
            </span>
            {course.originalPrice && (
              <small className="text-muted text-decoration-line-through">
                ${course.originalPrice}
              </small>
            )}
          </div>

          {showEnrollButton && (
            <Button 
              as={Link} 
              to={`/course/${course.id}`}
              variant="primary"
              size="sm"
              className="btn-gradient"
            >
              View Course
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};