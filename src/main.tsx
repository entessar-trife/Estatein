import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PropertiesPage from "./pages/PropertiesPage";
import ContactPage from "./pages/ContactPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import MainLayout from "./layouts/MainLayout";
import { Provider } from "react-redux";
import store from "./redux/store";
import ThemeController from "./components/shared/ThemeController";
import AllFaqsPage from "./pages/AllFaqsPage";
import AllClientsPage from "./pages/AllClientsPage";
import AllPropertiesPage from "./pages/AllPropertiesPage";
import SearchResults from "./pages/SearchResult";
import UnderProcessPage from "./pages/UnderProcessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "properties/:id", element: <PropertyDetailsPage /> },
      { path: "/search-results", element: <SearchResults /> },
      { path: "allFaq", element: <AllFaqsPage /> },
      { path: "allTestimonials", element: <AllClientsPage /> },
      { path: "allProperties", element: <AllPropertiesPage /> },
      { path: "under-process", element: <UnderProcessPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeController>
        <RouterProvider router={router} />
      </ThemeController>
    </Provider>
  </StrictMode>
);
