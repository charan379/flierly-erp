const codeMessage = {
  200: "Success: The request was successful.",
  201: "Created: The resource was successfully created.",
  202: "Accepted: The request has been accepted for processing, but the processing is not complete.",
  204: "No Content: The resource was successfully deleted.",
  400: "Bad Request: The request could not be understood or was missing required parameters.",
  401: "Unauthorized: Authentication failed or user does not have permissions for the requested operation.",
  403: "Forbidden: Authentication succeeded but authenticated user does not have access to the requested resource.",
  404: "Not Found: The requested resource could not be found.",
  406: "Not Acceptable: The requested format is not available.",
  410: "Gone: The resource requested is no longer available and will not be available again.",
  422: "Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors.",
  500: "Internal Server Error: An error occurred on the server.",
  502: "Bad Gateway: The server received an invalid response from the upstream server.",
  503: "Service Unavailable: The server is currently unavailable (overloaded or down).",
  504: "Gateway Timeout: The server did not receive a timely response from the upstream server.",
};

export default codeMessage;
