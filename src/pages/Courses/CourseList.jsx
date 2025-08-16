import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { CourseCard } from '../../components/CourseCard';
import { useCourses, useAppDispatch } from '../../hooks/useRedux';
import { setFilters, clearFilters } from '../../store/slices/coursesSlice';

export const CourseList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { courses, categories, filters } = useCourses();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceFilter, setPriceFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceFilter === 'free') matchesPrice = course.price === 0;
      else if (priceFilter === 'paid') matchesPrice = course.price > 0;
      else if (priceFilter === 'under50') matchesPrice = course.price < 50;
      else if (priceFilter === 'under100') matchesPrice = course.price < 100;
      
      const matchesLevel = !levelFilter || course.level === levelFilter;
      const matchesRating = !ratingFilter || course.rating >= parseFloat(ratingFilter);

      return matchesSearch && matchesCategory && matchesPrice && matchesLevel && matchesRating;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popularity':
        default:
          return b.studentsCount - a.studentsCount;
      }
    });

    return filtered;
  }, [courses, searchQuery, selectedCategory, priceFilter, levelFilter, ratingFilter, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    dispatch(clearFilters());
    setSearchQuery('');
    setSelectedCategory('');
    setPriceFilter('');
    setLevelFilter('');
    setRatingFilter('');
    setSortBy('popularity');
    setSearchParams(new URLSearchParams());
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 fw-bold">All Courses</h1>
        <p className="text-muted">Discover thousands of courses from expert instructors</p>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="position-relative">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <Form.Control
                type="text"
                placeholder="Search courses, instructors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-5"
                size="lg"
              />
            </div>
          </Form>

          <Row>
            {/* Category Filter */}
            <Col md={6} lg={2} className="mb-3">
              <Form.Label className="small fw-medium text-muted">Category</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </Form.Select>
            </Col>

            {/* Price Filter */}
            <Col md={6} lg={2} className="mb-3">
              <Form.Label className="small fw-medium text-muted">Price</Form.Label>
              <Form.Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="under50">Under $50</option>
                <option value="under100">Under $100</option>
              </Form.Select>
            </Col>

            {/* Level Filter */}
            <Col md={6} lg={2} className="mb-3">
              <Form.Label className="small fw-medium text-muted">Level</Form.Label>
              <Form.Select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="">Any Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Form.Select>
            </Col>

            {/* Rating Filter */}
            <Col md={6} lg={2} className="mb-3">
              <Form.Label className="small fw-medium text-muted">Rating</Form.Label>
              <Form.Select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5 & up</option>
                <option value="4.0">4.0 & up</option>
                <option value="3.5">3.5 & up</option>
              </Form.Select>
            </Col>

            {/* Sort By */}
            <Col md={6} lg={2} className="mb-3">
              <Form.Label className="small fw-medium text-muted">Sort By</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </Form.Select>
            </Col>

            {/* Clear Filters */}
            <Col md={6} lg={2} className="mb-3 d-flex align-items-end">
              <Button
                onClick={clearFilters}
                variant="outline-secondary"
                className="w-100"
              >
                <i className="bi bi-funnel me-2"></i>
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-muted mb-0">
            Showing {filteredAndSortedCourses.length} of {courses.length} courses
            {searchQuery && (
              <span> for "<strong>{searchQuery}</strong>"</span>
            )}
          </p>
        </div>
      </div>

      {/* Course Grid */}
      <Row>
        {filteredAndSortedCourses.map((course) => (
          <Col key={course.id} md={6} lg={4} xl={3} className="mb-4">
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>

      {/* No Results */}
      {filteredAndSortedCourses.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted h5">No courses found matching your criteria.</p>
          <Button
            onClick={clearFilters}
            variant="primary"
           
            className="mt-3 btn-gradient mt-3"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </Container>
  );
};