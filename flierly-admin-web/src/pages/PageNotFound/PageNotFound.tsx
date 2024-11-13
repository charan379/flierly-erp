import NotFound from "@/components/NotFound";
import React from "react";

/**
 * PageNotFound component to render the 404 error page.
 * This serves as a simple wrapper for the NotFound component.
 *
 * @returns {JSX.Element} The rendered PageNotFound component.
 */
const PageNotFound: React.FC = () => {
  return <NotFound />; // Rendering the NotFound component
};

export default PageNotFound;
