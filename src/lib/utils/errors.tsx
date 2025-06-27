export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (Array.isArray(error.message)) {
      return formatErrorMessage(error.message[0]);
    }
    return formatErrorMessage(error.message);
  }
  return "An unknown error occurred";
};

/**
 * Formats the error message by capitalizing the first letter and converting the rest to lowercase.
 */
const formatErrorMessage = (message: string): string => {
  return message.charAt(0).toUpperCase() + message.slice(1).toLowerCase();
};
