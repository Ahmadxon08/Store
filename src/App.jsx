import { Route, Routes } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import NotFound from "./components/not-found/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppRouter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
