import NotFound from "@/components/NotFound";
import React from "react";

/**
 * PageNotFound page to render the 404 error info.
 * This serves as a simple wrapper to display the NotFound component.
 *
 * @returns {JSX.Element} The rendered PageNotFound component.
 */
const PageNotFound = () => {
  return <NotFound />; // Rendering the NotFound component
};

export default PageNotFound;
