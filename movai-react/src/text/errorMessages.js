const errorMessages = {
    "404": {
      title: "Page Not Found",
      bodyText: "The page you are looking for does not exist. Please check the URL and try again.",
      reportIssue: false
    },
    "500": {
      title: "Internal Server Error",
      bodyText: "An unexpected error occurred on our server. We are working to resolve the issue.",
      reportIssue: true
    },
    "401": {
      title: "Unauthorized Access",
      bodyText: "You do not have permission to view this resource. Please login and try again.",
      reportIssue: false
    },
    "M01": {
      title: "Kunne ikka laste inn kart",
      bodyText: "Det oppstod et problem når kartet ble forsøkt lastet inn. Vennligst oppdater siden og prøv igjen.",
      reportIssue: false
    }
  };
  
  export default errorMessages;
  