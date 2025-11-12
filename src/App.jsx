import React, { useContext } from 'react'; // 1. Add useContext
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext.jsx"; // 2. Add ThemeContext
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

// 3. Create a component that can access the theme context
const AppContent = () => {
  // Get the colors object from our context
  const { colors } = useContext(ThemeContext);

  // Define the inline style for the main app container
  const appStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: '100vh',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  // This is your original JSX, now wrapped in a styled div
  return (
    <div style={appStyle}>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<BlogPostsPage />} />
          <Route path="/post/:id" element={<IndividualPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Your main App component is now simpler
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* 4. Render the new component that applies the theme */}
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;