import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth, useAppDispatch } from "../../hooks/useRedux";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase-config/config"; // Make sure this path is correct

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Error is handled by Redux
    }
  };

  async function googleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  return (
    <Container
      fluid
      className="min-vh-100 bg-light d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <div className="text-center mb-4">
              <h2 className="fw-bold">Sign in to your account</h2>
              <p className="text-muted">
                Or{" "}
                <Link to="/register" className="text-decoration-none">
                  create a new account
                </Link>
              </p>
            </div>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                {/* Demo Credentials */}
                <Alert variant="info" className="mb-4">
                  <h6 className="alert-heading">Demo Credentials:</h6>
                  <div className="small">
                    <p className="mb-1">
                      <strong>Student:</strong> student@example.com
                    </p>
                    <p className="mb-1">
                      <strong>Instructor:</strong> instructor@example.com
                    </p>
                    <p className="mb-1">
                      <strong>Admin:</strong> admin@example.com
                    </p>
                    <p className="mb-0">
                      <strong>Password:</strong> password
                    </p>
                  </div>
                </Alert>

                <Form onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="danger" className="small">
                      {error}
                    </Alert>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-50 translate-middle-y border-0 text-muted"
                        onClick={() => setShowPassword(!showPassword)}>
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-slash" : "bi-eye"
                          }`}></i>
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="remember-me"
                      label="Remember me"
                    />
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none small">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 mb-3"
                    disabled={isLoading}>
                    <span className={isLoading ? "btn-loading" : ""}>
                      {isLoading ? "Signing in..." : "Sign in"}
                    </span>
                  </Button>
                </Form>

                <div className="text-center">
                  <div className="position-relative mb-3">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                      Or continue with
                    </span>
                  </div>

                  <Row>
                    <Col>
                      <Button
                        onClick={googleSignIn}
                        variant="outline-secondary"
                        className="w-100 mb-2 btn-social">
                        <i className="bi bi-google me-2 text-danger"></i>
                        Google
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="w-100 mb-2 btn-social">
                        <i className="bi bi-facebook me-2 text-primary"></i>
                        Facebook
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
