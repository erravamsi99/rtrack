import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import {authService} from "../../services/authService";
import {UnauthenticatedHeader} from "../../components/UnauthenticatedHeader";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isSuccess = await authService.login(email, password);

      if (isSuccess) {
        navigate('/');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    window.location.href = 'http://rightrack.ai/auth/google';
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // TODO: Implement Facebook login flow
  };

  return (
    <>
      <UnauthenticatedHeader/>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Card style={{width: '24rem', padding: '2rem'}}>
          <Card.Body>
            <h2 className="mb-4 text-center">RighTrack Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm"/> : 'Login'}
              </Button>
            </Form>

            <div className="text-center mb-2">or</div>

            <Button
              variant="outline-danger"
              className="w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGoogleLogin}
            >
              {/*<FaGoogle /> Login with Google*/} Login with Google
            </Button>

            <Button
              variant="outline-primary"
              className="w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={handleFacebookLogin}
            >
              {/*<FaFacebook /> */} Login with Facebook
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
