import { Rule, RuleObject } from 'antd/es/form'

/**
 * Validator for checking a privilege code pattern (e.g., 'abc-xyz' or 'abc.xyz')
 * @param params Optional parameters for customization
 * @returns A validation rule
 */
const privilegeCodeRegex = (_params: object = {}): Rule => ({
  validator(_: RuleObject, value: string | undefined) {
    return new Promise<void>((resolve, reject) => {
      // If the value is empty, it is considered valid
      if (!value) {
        resolve()
        return
      }

      // Regex pattern to validate the code format (letters and hyphens, dot separator)
      const regex = /^[a-z-]+\.[a-z-]+$/

      // Check if the value matches the regex pattern
      if (regex.test(value)) {
        resolve() // Validation passes
      } else {
        reject('code_is_not_valid') // Reject with an error message if validation fails
      }
    })
  },
})

export default privilegeCodeRegex
