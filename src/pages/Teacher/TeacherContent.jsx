import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Table, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks/useRedux';
import { mockCourses } from '../../data/mockData';

export const TeacherContent = () => {
  const { user } = useAuth();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadedResources, setUploadedResources] = useState([]);
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoFile: null,
    duration: ''
  });
  const [resourceForm, setResourceForm] = useState({
    title: '',
    description: '',
    type: 'pdf',
    file: null
  });

  // Get instructor's courses
  const instructorCourses = mockCourses.filter(course => course.instructor.id === user?.id);

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    
    const newVideo = {
      id: Date.now().toString(),
      title: videoForm.title,
      description: videoForm.description,
      duration: videoForm.duration,
      fileName: videoForm.videoFile?.name || 'video.mp4',
      uploadedAt: new Date(),
      courseId: selectedCourse
    };
    
    setUploadedVideos(prev => [...prev, newVideo]);
    setShowVideoModal(false);
    setVideoForm({ title: '', description: '', videoFile: null, duration: '' });
  };

  const handleResourceSubmit = (e) => {
    e.preventDefault();
    
    const newResource = {
      id: Date.now().toString(),
      title: resourceForm.title,
      description: resourceForm.description,
      type: resourceForm.type,
      fileName: resourceForm.file?.name || 'resource.pdf',
      size: resourceForm.file ? `${(resourceForm.file.size / 1024 / 1024).toFixed(2)} MB` : '1.2 MB',
      uploadedAt: new Date(),
      courseId: selectedCourse
    };
    
    setUploadedResources(prev => [...prev, newResource]);
    setShowResourceModal(false);
    setResourceForm({ title: '', description: '', type: 'pdf', file: null });
  };

  if (user?.role !== 'instructor') {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          <h4>Access Denied</h4>
          <p>Only instructors can access this section.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold">Course Content Management</h1>
          <p className="text-muted">Upload and manage your course videos and resources</p>
        </div>
        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            onClick={() => setShowVideoModal(true)}
            className="btn-gradient"
          >
            <i className="bi bi-camera-video me-2"></i>
            Add Video
          </Button>
          <Button 
            variant="outline-primary" 
            onClick={() => setShowResourceModal(true)}
            className="btn-hover-fill"
          >
            <i className="bi bi-file-earmark-pdf me-2"></i>
            Add Resource
          </Button>
        </div>
      </div>

      {/* Course Selection */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form.Group>
            <Form.Label>Select Course</Form.Label>
            <Form.Select 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)}
              size="lg"
            >
              <option value="">Choose a course...</option>
              {instructorCourses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {selectedCourse && (
        <Row>
          {/* Videos Section */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-camera-video me-2"></i>
                  Course Videos
                </h5>
              </Card.Header>
              <Card.Body>
                {uploadedVideos.filter(video => video.courseId === selectedCourse).length > 0 ? (
                  <div className="table-responsive">
                    <Table className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Title</th>
                          <th>Duration</th>
                          <th>File</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedVideos.filter(video => video.courseId === selectedCourse).map((video) => (
                          <tr key={video.id}>
                            <td>
                              <div>
                                <div className="fw-medium">{video.title}</div>
                                <small className="text-muted">{video.description}</small>
                              </div>
                            </td>
                            <td>{video.duration}</td>
                            <td>
                              <small className="text-muted">{video.fileName}</small>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button variant="outline-primary" size="sm" className="btn-hover-fill">
                                  <i className="bi bi-pencil"></i>
                                </Button>
                                <Button variant="outline-danger" size="sm" className="btn-hover-fill">
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <i className="bi bi-camera-video display-4 text-muted mb-3"></i>
                    <p className="text-muted">No videos uploaded yet</p>
                    <Button 
                      variant="primary" 
                      onClick={() => setShowVideoModal(true)}
                      className="btn-gradient"
                    >
                      Upload First Video
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Resources Section */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-file-earmark-pdf me-2"></i>
                  Course Resources
                </h5>
              </Card.Header>
              <Card.Body>
                {uploadedResources.filter(resource => resource.courseId === selectedCourse).length > 0 ? (
                  <div className="table-responsive">
                    <Table className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Title</th>
                          <th>Type</th>
                          <th>Size</th>
                          <th>File</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedResources.filter(resource => resource.courseId === selectedCourse).map((resource) => (
                          <tr key={resource.id}>
                            <td>
                              <div>
                                <div className="fw-medium">{resource.title}</div>
                                <small className="text-muted">{resource.description}</small>
                              </div>
                            </td>
                            <td>
                              <Badge bg="secondary" className="text-uppercase">
                                {resource.type}
                              </Badge>
                            </td>
                            <td>{resource.size}</td>
                            <td>
                              <small className="text-muted">{resource.fileName}</small>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button 
                                  variant="outline-success" 
                                  size="sm" 
                                  className="btn-hover-fill"
                                  title="Download"
                                >
                                  <i className="bi bi-download"></i>
                                </Button>
                                <Button variant="outline-primary" size="sm" className="btn-hover-fill">
                                  <i className="bi bi-pencil"></i>
                                </Button>
                                <Button variant="outline-danger" size="sm" className="btn-hover-fill">
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <i className="bi bi-file-earmark-pdf display-4 text-muted mb-3"></i>
                    <p className="text-muted">No resources uploaded yet</p>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => setShowResourceModal(true)}
                      className="btn-hover-fill"
                    >
                      Upload First Resource
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Video Upload Modal */}
      <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleVideoSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Video Title</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                    placeholder="Enter video title"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({...videoForm, duration: e.target.value})}
                    placeholder="e.g., 15:30"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={videoForm.description}
                onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                placeholder="Enter video description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video File</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={(e) => setVideoForm({...videoForm, videoFile: e.target.files[0]})}
              />
              <Form.Text className="text-muted">
                Supported formats: MP4, AVI, MOV. Max size: 500MB
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowVideoModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="btn-gradient">
              <i className="bi bi-upload me-2"></i>
              Upload Video
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Resource Upload Modal */}
      <Modal show={showResourceModal} onHide={() => setShowResourceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Resource</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleResourceSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Resource Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={resourceForm.title}
                onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})}
                placeholder="Enter resource title"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={resourceForm.description}
                onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                placeholder="Enter resource description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resource Type</Form.Label>
              <Form.Select
                value={resourceForm.type}
                onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})}
              >
                <option value="pdf">PDF Document</option>
                <option value="ppt">PowerPoint Presentation</option>
                <option value="doc">Word Document</option>
                <option value="zip">ZIP Archive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx,.zip"
                onChange={(e) => setResourceForm({...resourceForm, file: e.target.files[0]})}
              />
              <Form.Text className="text-muted">
                Supported formats: PDF, PPT, DOC, ZIP. Max size: 50MB
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowResourceModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="btn-gradient">
              <i className="bi bi-upload me-2"></i>
              Upload Resource
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};