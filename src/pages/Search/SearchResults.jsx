import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { CourseCard } from '../../components/CourseCard';
import { TeacherCard } from '../../components/TeacherCard';
import { mockCourses, mockTeachers } from '../../data/mockData';

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'courses';
  const [searchQuery, setSearchQuery] = useState(query);
  const [activeTab, setActiveTab] = useState(type);

  const filteredCourses = useMemo(() => {
    if (!query) return mockCourses;
    
    return mockCourses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredTeachers = useMemo(() => {
    if (!query) return mockTeachers;
    
    return mockTeachers.filter(teacher => 
      teacher.name.toLowerCase().includes(query.toLowerCase()) ||
      teacher.bio.toLowerCase().includes(query.toLowerCase()) ||
      teacher.specializations.some(spec => spec.toLowerCase().includes(query.toLowerCase())) ||
      teacher.qualifications.some(qual => qual.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    params.set('type', activeTab);
    setSearchParams(params);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('type', tab);
    setSearchParams(params);
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 fw-bold">Search Results</h1>
        {query && (
          <p className="text-muted">
            Results for "<strong>{query}</strong>"
          </p>
        )}
      </div>

      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-4">
        <div className="position-relative" style={{ maxWidth: '500px' }}>
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
          <Form.Control
            type="text"
            placeholder="Search courses, teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-5"
            size="lg"
          />
        </div>
      </Form>

      {/* Tabs */}
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'courses'} 
            onClick={() => handleTabChange('courses')}
            className="text-decoration-none"
          >
            <i className="bi bi-book me-2"></i>
            Courses ({filteredCourses.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'teachers'} 
            onClick={() => handleTabChange('teachers')}
            className="text-decoration-none"
          >
            <i className="bi bi-person me-2"></i>
            Teachers ({filteredTeachers.length})
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Results */}
      {activeTab === 'courses' && (
        <div>
          {filteredCourses.length > 0 ? (
            <Row>
              {filteredCourses.map((course) => (
                <Col key={course.id} md={6} lg={4} xl={3} className="mb-4">
                  <CourseCard course={course} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search display-1 text-muted mb-3"></i>
              <h3 className="text-muted">No courses found</h3>
              <p className="text-muted">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'teachers' && (
        <div>
          {filteredTeachers.length > 0 ? (
            <Row>
              {filteredTeachers.map((teacher) => (
                <Col key={teacher.id} md={6} lg={4} xl={3} className="mb-4">
                  <TeacherCard teacher={teacher} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-person display-1 text-muted mb-3"></i>
              <h3 className="text-muted">No teachers found</h3>
              <p className="text-muted">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};