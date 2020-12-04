import React from "react";
import { API } from "../backend";
import Menu from "./menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-light text-white p-4",
  children
}) => (
  <div>
  <Menu />
    <div className="container-fluid bg-light">
      <div className="jumbotron bg-light text-dark text-center">
        <h4 className="display-4">{title}</h4>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Base;
