import errorHandler from "./errorHandler";
import successHandler from "./successHandler";

// Function to handle API responses
const handleResponse = async ({
  promise,
  notifyOnSuccess = false,
  notifyOnFailed = true,
  notifyType = "message",
}) => {
  try {
    const { data, status } = await promise;
    successHandler(
      { data, status },
      {
        notifyOnSuccess,
        notifyOnFailed,
        notifyType,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default handleResponse;
