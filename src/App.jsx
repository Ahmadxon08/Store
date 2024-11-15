import { Route, Routes } from "react-router-dom";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppRouter />} />
    </Routes>
  );
};

export default App;
