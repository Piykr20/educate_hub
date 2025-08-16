import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, ProgressBar, ListGroup } from 'react-bootstrap';
import { mockCourses, mockEnrollments } from '../../data/mockData';
import { VideoPlayer } from '../../components/VideoPlayer';
import { useAuth } from '../../hooks/useRedux';

export const CourseLearning = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);

  const course = mockCourses.find(c => c.id === courseId);
  const enrollment = mockEnrollments.find(e => e.courseId === courseId && e.userId === user?.id);

  useEffect(() => {
    if (enrollment) {
      setCompletedLessons(enrollment.completedLessons);
      setProgress(enrollment.progress);
      
      // Find the last watched lesson
      if (enrollment.lastWatched) {
        const lastWatchedIndex = course?.lessons.findIndex(l => l.id === enrollment.lastWatched) ?? 0;
        setCurrentLessonIndex(Math.max(0, lastWatchedIndex));
      }
    }
  }, [enrollment, course]);

  if (!course) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h2 fw-bold mb-4">Course not found</h1>
        <Button as={Link} to="/dashboard" variant="primary">
          Return to Dashboard
        </Button>
      </Container>
    );
  }

  const currentLesson = course.lessons[currentLessonIndex];
  const isLessonCompleted = completedLessons.includes(currentLesson?.id);

  const handleLessonComplete = () => {
    if (currentLesson && !isLessonCompleted) {
      const newCompletedLessons = [...completedLessons, currentLesson.id];
      setCompletedLessons(newCompletedLessons);
      
      // Update progress
      const newProgress = (newCompletedLessons.length / course.lessons.length) * 100;
      setProgress(newProgress);
    }
  };

  const handleVideoProgress = (videoProgress) => {
    // Mark lesson as complete when video reaches 90%
    if (videoProgress >= 90 && !isLessonCompleted) {
      handleLessonComplete();
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <div className="d-flex h-100">
        {/* Main Content */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Header */}
          <div className="learning-header p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Button 
                  as={Link} 
                  to="/dashboard"
                  variant="link"
                  className="text-white p-0 me-3"
                >
                  <i className="bi bi-chevron-left fs-5"></i>
                </Button>
                <div>
                  <h5 className="mb-0 text-truncate" style={{ maxWidth: '300px' }}>{course.title}</h5>
                  <small className="text-muted">
                    Lesson {currentLessonIndex + 1} of {course.lessons.length}
                  </small>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <small className="text-muted me-3">
                  Progress: {Math.round(progress)}%
                </small>
                <div style={{ width: '120px' }}>
                  <ProgressBar 
                    now={progress} 
                    className="progress-bar-custom"
                    style={{ height: '6px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-grow-1 bg-black">
            {currentLesson && (
              <VideoPlayer
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                onProgress={handleVideoProgress}
                onComplete={handleLessonComplete}
                initialProgress={isLessonCompleted ? 100 : 0}
              />
            )}
          </div>

          {/* Controls */}
          <div className="learning-header p-3">
            <div className="d-flex justify-content-between align-items-center">
              <Button
                onClick={goToPreviousLesson}
                disabled={currentLessonIndex === 0}
                variant="secondary"
                className="btn-nav"
              >
                <i className="bi bi-chevron-left me-2"></i>
                Previous
              </Button>

              <div>
                <Button
                  onClick={handleLessonComplete}
                  disabled={isLessonCompleted}
                  variant={isLessonCompleted ? 'success' : 'primary'}
                >
                  <i className="bi bi-check me-2"></i>
                  {isLessonCompleted ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>

              <Button
                onClick={goToNextLesson}
                disabled={currentLessonIndex === course.lessons.length - 1}
                variant="secondary"
                className="btn-nav"
              >
                Next
                <i className="bi bi-chevron-right ms-2"></i>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-learning" style={{ width: '320px' }}>
          <div className="p-3 border-bottom border-secondary">
            <h6 className="mb-1">Course Content</h6>
            <small className="text-muted">
              {completedLessons.length} of {course.lessons.length} lessons completed
            </small>
          </div>

          <ListGroup variant="flush">
            {course.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isCurrent = index === currentLessonIndex;
              
              return (
                <ListGroup.Item
                  key={lesson.id}
                  action
                  onClick={() => setCurrentLessonIndex(index)}
                  className={`lesson-item bg-transparent text-white border-secondary ${isCurrent ? 'active' : ''}`}
                >
                  <div className="d-flex align-items-start">
                    <div className={`me-3 mt-1 rounded-circle d-flex align-items-center justify-content-center ${
                      isCompleted 
                        ? 'bg-success text-white' 
                        : isCurrent 
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-white'
                    }`} style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                      {isCompleted ? (
                        <i className="bi bi-check"></i>
                      ) : isCurrent ? (
                        <i className="bi bi-play-fill"></i>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <h6 className={`mb-1 small ${isCurrent ? 'text-white' : 'text-light'}`}>
                        {lesson.title}
                      </h6>
                      <small className="text-muted">{lesson.duration}</small>
                      {lesson.description && (
                        <p className="small text-muted mt-1 mb-0 line-clamp-2">
                          {lesson.description}
                        </p>
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};