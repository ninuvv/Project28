import React, { useState, useEffect } from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBIcon,
  MDBCardBody,
  MDBSpinner,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {  login } from "../redux/features/authSlice";


const Login = () => {
  const initialSate = {
    email: "",
    password: "",
  };
  const [formvalue, setFormvalue] = useState(initialSate);
  const { email, password } = formvalue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);


  const onChange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formvalue, navigate, toast }));
    }
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "250px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              invalid
              feedback="Please enter email"
            >
              <MDBInput
                value={email}
                type="email"
                name="email"
                onChange={onChange}
                required
                label="Email"
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              invalid
              feedback="Please enter Password"
            >
              <MDBInput
                value={password}
                type="password"
                name="password"
                onChange={onChange}
                required
                label="Password"
              />
            </MDBValidationItem>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} type="submit">
                {loading && (
                  <MDBSpinner
                    role="status"
                    size="sm"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />        

     
           
      
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
