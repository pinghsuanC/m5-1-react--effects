import React, { useEffect } from "react";

function useDocumentTitle(fallbackTitle, title) {
  useEffect(() => {
    document.title = `${title} cookies - Cookie Click`;
  }, [title]);
}
export default useDocumentTitle;
