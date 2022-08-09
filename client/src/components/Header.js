import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/features/authSlice";
const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <MDBNavbar expand="lg" light style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          // href="/"
          style={{ fontWeight: "600", fontSize: "22px" }}
        >
          Project 28
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "9px" }}>
                {" "}
                Loggin as :{user?.result?.name}
              </h5>
            )}
          
            {user?.result?._id && (
              <>
                <MDBNavbarItem style={{ fontWeight: 600 }}>
                  <MDBNavbarLink href="/canvas">Home</MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}

            {user?.result?._id ? (
              <MDBNavbarItem style={{ fontWeight: 600 }}>
                <MDBNavbarLink href="/login" onClick={handleLogOut}>
                  {" "}
                  <p className="header-text">LogOut</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem style={{ fontWeight: 600 }}>
                <MDBNavbarLink href="/">LogIn</MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
