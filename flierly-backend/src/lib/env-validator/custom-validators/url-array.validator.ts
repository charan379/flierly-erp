import { makeValidator, EnvError } from 'envalid';

// Validator function to check if each entry in a comma-separated string is a valid URL
const urlArray = makeValidator<string[]>((input) => {
  if (!input) {
    throw new EnvError("ENV_URL_ARRAY_REQUIRED");
  }

  const urls = input.split(',');
  for (const urlString of urls) {
    try {
      new URL(urlString);
    } catch (_err) {
      throw new EnvError("ENV_URL_ARRAY_INVALID_URL");
    }
  }

  return urls;
});

export default urlArray;
