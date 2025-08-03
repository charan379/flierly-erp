import messages from "@/config/messages/app-messages.json";

/**
 * Replaces placeholders in the message with the provided parameters.
 *
 * @param message - The message string with placeholders.
 * @param params - An object containing key-value pairs for placeholders.
 * @returns The message with placeholders replaced by actual values.
 */
function formatMessage(message: string, params: { [key: string]: string | number }): string {
    return message.replace(/\${(\w+)}/g, (match, key) => params[key] !== undefined ? String(params[key]) : match.replace(/\$\{/g, "")).replace(/\}/g, "");
};

/**
 * Gets a message by key and replaces placeholders with provided parameters.
 *
 * @param key - The key of the message to retrieve.
 * @param params - An object containing key-value pairs for placeholders.
 * @returns The formatted message corresponding to the key.
 */
export function getMessage(messageKey: string, params?: { [key: string]: string | number }): string {

    const message = messages[messageKey as keyof typeof messages];

    if (!message) {
        return messageKey;
    };

    if (params) {
        return formatMessage(message, params);
    }

    return message;
};
