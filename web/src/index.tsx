import "semantic-ui-css/semantic.min.css";

import "@crispengari/react-activity-indicators/dist/react-activity-indicators.cjs.development.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UrqlProvider from "./providers/UrqlProvider";
import ReduxProvider from "./providers/ReduxProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UrqlProvider>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </UrqlProvider>
  </React.StrictMode>
);
