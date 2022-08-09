import React, { useState ,useEffect} from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBIcon,
  MDBCardBody,MDBSpinner ,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { Link ,useNavigate} from "react-router-dom";
import { toast} from 'react-toastify';
import {useDispatch,useSelector} from'react-redux'
import { register } from "../redux/features/authSlice";

const Register = () => {
  const initialSate = {
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    confirmPasswod:""
  };
  const [formvalue, setFormvalue] = useState(initialSate);
  const { firstName,lastName,email, password,confirmPasswod } = formvalue;
  const dispatch=useDispatch();
  const navigate=useNavigate()
const {error,loading}=useSelector((state)=>({...state.auth}))

useEffect(() => {
  error && toast.error(error)  
}, [error])

  const onChange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPasswod)
      return toast.error("confirm password is not match with password")

    if(email && password && firstName && lastName ){
      dispatch(register({formvalue,navigate,toast}))
    }
  };

  return (
    <div
      style={{
     
       margin:"auto",
       maxWidth:"450px",
    //  alignContent:"center"
      marginTop:"120px"
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
          <MDBValidationItem
              className="col-md-6"
              invalid
              feedback="Please enter first Name"
            >
              <MDBInput
                value={firstName}
                type="text"
                name="firstName"
                onChange={onChange}
                required
                label="First Name"
              />
            </MDBValidationItem>

            <MDBValidationItem
              className="col-md-6"
              invalid
              feedback="Please enter last name"
            >
              <MDBInput
                value={lastName}
                type="text"
                name="lastName"
                onChange={onChange}
                required
                label="Last Name"
              />
            </MDBValidationItem>

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

            <MDBValidationItem
              className="col-md-12"
              invalid
              feedback="Please confirm Password"
            >
              <MDBInput
                value={confirmPasswod}
                type="password"
                name="confirmPasswod"
                onChange={onChange}
                required
                label="Confirm Passwod"
              />
            </MDBValidationItem>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} type="submit">
                {loading && (<MDBSpinner role="status" size="sm" tag="span" className="me-2"/>)}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? sign in</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
