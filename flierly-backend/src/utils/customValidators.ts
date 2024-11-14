import { makeValidator, EnvError } from 'envalid';

// Validator function to check if each entry in a comma-separated string is a valid URL
const urlArray = makeValidator<string[]>((input) => {
    if (!input) {
        throw new EnvError('Expected a non-empty string');
    }

    const urls = input.split(',');
    for (const urlString of urls) {
        try {
            new URL(urlString);
        } catch (err) {
            throw new EnvError(`Invalid URL: ${urlString}`);
        }
    }

    return urls;
});

export { urlArray };
