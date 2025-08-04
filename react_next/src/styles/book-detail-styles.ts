import { css } from "builder-css";

export const skeletonBaseClassName = css({
  "@keyframes pulse": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.6 },
  },
  // backgroundColor: "#f0f0f0",
  // make bg color a gradient that goes left to right and fills space of element
  background: "linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 100%)",
  backgroundSize: "200% 100%",
  backgroundPosition: "0% 0%",
  borderRadius: "8px",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    opacity: 0.8,
    transform: "scale(1.02)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
});

// Import loading styles to ensure they're available for SSR
export const loadingStyles = {
  container: css({
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  }),

  loadingCard: css({
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "3rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
  }),

  header: css({
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "3rem",
    marginBottom: "3rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "2rem",
    },
  }),

  // skeleton: css({
  //   backgroundColor: "#f0f0f0",
  //   animation: "pulse 1.5s infinite",
  //   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  //   transition: "background-color 0.3s ease",
  //   "&:hover": {
  //     backgroundColor: "#e0e0e0",
  //     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  //   },
  // }),

  coverSkeleton: css({
    width: "100%",
    height: "400px",
    // backgroundColor: "#f0f0f0",
    // borderRadius: "12px",
    // animation: "pulse 1.5s infinite",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    // transition: "background-color 0.3s ease",
    // "&:hover": {
    //   backgroundColor: "#e0e0e0",
    //   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    // },
  }),

  titleSkeleton: css({
    height: "3rem",
    width: "80%",
    marginBottom: "1rem",
    // backgroundColor: "#f0f0f0",
    // borderRadius: "8px",
    // animation: "pulse 1.5s infinite",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    // transition: "background-color 0.3s ease",
    // "&:hover": {
    //   backgroundColor: "#e0e0e0",
    //   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    // },
  }),

  authorSkeleton: css({
    height: "1.5rem",
    width: "60%",
    marginBottom: "2rem",
    // backgroundColor: "#f0f0f0",
    // borderRadius: "8px",
    // animation: "pulse 1.5s infinite",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    // transition: "background-color 0.3s ease",
    // "&:hover": {
    //   backgroundColor: "#e0e0e0",
    //   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    // },
  }),

  metaGrid: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  }),

  metaSkeleton: css({
    height: "4rem",
    // backgroundColor: "#f0f0f0",
    // borderRadius: "8px",
    // animation: "pulse 1.5s infinite",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    // transition: "background-color 0.3s ease",
    // "&:hover": {
    //   backgroundColor: "#e0e0e0",
    //   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    // },
  }),

  descriptionSkeleton: css({
    height: "8rem",
    marginTop: "2rem",
    borderRadius: "12px",
    // backgroundColor: "#f0f0f0",
    // animation: "pulse 1.5s infinite",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    // transition: "background-color 0.3s ease",
    // "&:hover": {
    //   backgroundColor: "#e0e0e0",
    //   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    // },
  }),

  backButtonSkeleton: css({
    width: "200px",
    height: "48px",
    marginBottom: "2rem",
    // backgroundColor: "#f0f0f0",
    // borderRadius: "8px",
    // animation: "pulse 1.5s infinite",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    // transition: "background-color 0.3s ease",
    // "&:hover": {
    //   backgroundColor: "#e0e0e0",
    //   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    // },
  }),
};

// Not found page styles (co-located but available for SSR)
export const notFoundStyles = {
  container: css({
    maxWidth: "800px",
    margin: "0 auto",
    padding: "4rem 2rem",
    textAlign: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),

  icon: css({
    fontSize: "8rem",
    marginBottom: "2rem",
    opacity: "0.6",
  }),

  title: css({
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "1rem",
    color: "#2c3e50",
    "@media (max-width: 768px)": {
      fontSize: "2rem",
    },
  }),

  message: css({
    fontSize: "1.25rem",
    color: "#7f8c8d",
    marginBottom: "3rem",
    lineHeight: "1.6",
    maxWidth: "500px",
  }),

  backButton: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    backgroundColor: "#3498db",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontSize: "1.125rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
    "&:hover": {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(52, 152, 219, 0.4)",
    },
  }),
};

export const bookDetailStyles = {
  container: css({
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  }),

  backButton: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3498db",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "2rem",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#2980b9",
      transform: "translateY(-1px)",
    },
  }),

  bookDetail: css({
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "3rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
  }),

  header: css({
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "3rem",
    marginBottom: "3rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "2rem",
    },
  }),

  cover: css({
    width: "100%",
    height: "400px",
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  }),

  title: css({
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "1rem",
    color: "#2c3e50",
    lineHeight: "1.2",
    "@media (max-width: 768px)": {
      fontSize: "2.5rem",
    },
  }),

  author: css({
    fontSize: "1.5rem",
    color: "#7f8c8d",
    marginBottom: "1.5rem",
    fontStyle: "italic",
  }),

  metaInfo: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  }),

  metaItem: css({
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  }),

  metaLabel: css({
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#95a5a6",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }),

  metaValue: css({
    fontSize: "1.125rem",
    fontWeight: "500",
    color: "#2c3e50",
  }),

  genreTag: css({
    display: "inline-block",
    padding: "0.5rem 1rem",
    backgroundColor: "#e8f4fd",
    color: "#3498db",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }),

  rating: css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1.25rem",
    color: "#f39c12",
    fontWeight: "600",
  }),

  price: css({
    fontSize: "2rem",
    fontWeight: "700",
    color: "#27ae60",
  }),

  stockBase: css({
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }),

  inStock: css({
    backgroundColor: "#d5f4e6",
    color: "#00b894",
  }),

  outOfStock: css({
    backgroundColor: "#ffeaa7",
    color: "#fdcb6e",
  }),

  description: css({
    fontSize: "1.125rem",
    lineHeight: "1.8",
    color: "#2c3e50",
    marginTop: "2rem",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
  }),

  descriptionTitle: css({
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#2c3e50",
  }),
};
