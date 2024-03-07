import React from "react";
import Header from "../Header";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";
import Footer from "../Footer";
import { useSelector } from "react-redux";

function Layout(props) {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Header></Header>
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact="true" to={"/"}>
                    <i className="fa fa-home"></i>
                    &nbsp; Home
                  </NavLink>
                </li>

                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink exact="true" to={"/employee"}>
                      <i className="fa fa-user"></i>
                      &nbsp;  Users
                    </NavLink>
                  </li>
                ) : null}
                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/categories"}>
                      <i className="fa fa-cubes"></i>
                      &nbsp; Categories
                    </NavLink>
                  </li>
                ) : null}
                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/products"}>
                      <i className="fa fa-cutlery"></i>
                      &nbsp; SubCategories
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <NavLink to={"/orders"}>
                    <i className="fa fa-motorcycle"></i>
                    &nbsp; Orders
                  </NavLink>
                </li>
                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/reports"}>
                      <i className="fa fa-pie-chart"></i>
                      &nbsp; Reports
                    </NavLink>
                  </li>
                ) : null} 
              {/*   {auth.user.role !== "deliveryrider" ? (
                  <li>
                    <NavLink to={"/inventory"}>
                      <i className="fa fa-suitcase"></i>
                      &nbsp; Inventory
                    </NavLink>
                  </li>
                ) : null} */}
               {/*  {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/purchases"}>
                      <i className="fa fa-money"></i>
                      &nbsp; Purchases
                    </NavLink>
                  </li>
                ) : null} */}
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", padding: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
      <Footer></Footer>
    </div>
  );
}

export default Layout;










