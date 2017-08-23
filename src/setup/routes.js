import React from "react";
import { Route, Switch } from "react-router-dom";

import ReduxTest from "../ReduxTest";
import ImageUploadPage from "../components/ImageUpload/ImageUploadPage";
import ColorAnalysisPage from "../components/ColorAnalysis/ColorAnalysisPage";
import AuthorizationPage from "../components/Authorization/AuthorizationPage";

const routes = () => (
  <Switch>
    <Route path="/submit" component={ImageUploadPage} />
    <Route path="/analyze" component={ColorAnalysisPage} />
    <Route path="/authorize" component={AuthorizationPage} />
  </Switch>
);

export default routes;
