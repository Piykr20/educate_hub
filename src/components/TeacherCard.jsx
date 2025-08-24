import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';

export const TeacherCard = ({ teacher }) => {
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

  return (
    <Card className="teacher-card h-100 border-0 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="text-center mb-3">
          <img 
            src={teacher.avatar} 
            alt={teacher.name}
            className="rounded-circle mb-3"
            width="80"
            height="80"
            style={{ objectFit: 'cover' }}
          />
          <Card.Title className="h5 mb-1">{teacher.name}</Card.Title>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <div className="me-2">
              {renderStars(teacher.rating)}
            </div>
            <small className="fw-bold me-1">{teacher.rating}</small>
            <small className="text-muted">({teacher.totalStudents.toLocaleString()})</small>
          </div>
        </div>

        <Card.Text className="text-muted small line-clamp-3 mb-3">
          {teacher.bio}
        </Card.Text>

        <div className="mb-3">
          <h6 className="small fw-bold text-muted mb-2">QUALIFICATIONS</h6>
          <div className="d-flex flex-column gap-1">
            {teacher.qualifications.slice(0, 2).map((qual, index) => (
              <div key={index} className="d-flex align-items-start">
                <div className="bg-success bg-opacity-10 p-1 rounded-circle me-2 mt-1" style={{ minWidth: '16px', height: '16px' }}>
                  <i className="bi bi-check text-success" style={{ fontSize: '10px' }}></i>
                </div>
                <small className="text-muted">{qual}</small>
              </div>
            ))}
            {teacher.qualifications.length > 2 && (
              <small className="text-muted ms-4">+{teacher.qualifications.length - 2} more</small>
            )}
          </div>
        </div>

        <div className="mb-3">
          <h6 className="small fw-bold text-muted mb-2">SPECIALIZATIONS</h6>
          <div className="d-flex flex-wrap gap-1">
            {teacher.specializations.slice(0, 3).map((spec, index) => (
              <Badge key={index} bg="primary" pill className="small">
                {spec}
              </Badge>
            ))}
            {teacher.specializations.length > 3 && (
              <Badge bg="secondary" pill className="small">
                +{teacher.specializations.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-book me-1"></i>
            <span>{teacher.totalCourses} courses</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-calendar me-1"></i>
            <span>{teacher.yearsExperience}+ years</span>
          </div>
        </div>

        <div className="mt-auto">
          <Button 
            as={Link} 
            to={`/teacher/${teacher.id}`}
            variant="primary"
            className="w-100 btn-gradient"
          >
            View Profile
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};