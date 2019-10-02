import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ImageGallery from "../Component/index";
const Routes = (
  <Router>
    <Route path={"/"} component={ImageGallery} exact />
    <Route path={"/:id"} component={ImageGallery} exact />
  </Router>
);
export default Routes