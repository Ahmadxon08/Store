import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n.js";
import { ProductProvider } from "./context/useContext.jsx";
createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <Router
      future={{
        v7_relativeSplatPath: true,
      }}>
      <App />
    </Router>
  </ProductProvider>
);
