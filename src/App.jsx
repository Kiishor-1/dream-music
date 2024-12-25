import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./components/Main";
import Trends from "./pages/Trends";
import Library from "./pages/Library";
import Discover from "./pages/Discover";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="trends" element={<Trends />} />
          <Route path="library" element={<Library />} />
          <Route path="discover" element={<Discover />} />
        </Route>
      </Routes>
    </div>
  )
}