import crudService from '@/features/CrudModule/service/crud-module.service'
import debouncePromise from './debounce-promise'
import { translate } from '@/features/Locale/service/locale-state.service'

// Define the type for the parameters passed to the validator function
interface EntityExistenceParams {
  entity: string // The name of the entity (e.g., 'privilege', 'user')
  filters?: Record<string, any> // The filters used to query the entity (e.g., { name: { $ilike: "value" }})
  rejectionMessage?: string // Custom rejection message if the entity already exists
}

// Define the type for the expected result
interface ExistsResult {
  exists: boolean
}

// Type guard to check if the result has an `exists` property
function isExistsResult(result: any): result is ExistsResult {
  return result && typeof result.exists === 'boolean'
}

/**
 * Validates the existence of an entity in the database with debounce.
 *
 * @param {Object} params - The parameters for the validation.
 * @param {string} params.entity - The name of the entity (e.g., 'privilege', 'user').
 * @param {Object} [params.filters={}] - The filters used to query the entity (e.g., { name: { $ilike: "value" }}).
 * @param {string} [params.rejectionMessage="entity_already_exists"] - Custom message if the entity already exists.
 * @returns {Promise} - Resolves if the entity does not exist, rejects if the entity exists or if there is an error.
 */
const entityExistenceValidator = debouncePromise(
  async ({ entity, filters = {}, rejectionMessage = 'entity_already_exists' }: EntityExistenceParams): Promise<void> => {
    try {
      // Call the exists method from crudService with the provided entity and filters
      const { result } = await crudService.isExists({ entity, filters })

      // Use the type guard to check if the result is valid
      if (!isExistsResult(result)) {
        return Promise.reject('Invalid response format.')
      }

      // If the result indicates the entity exists, reject the promise with the custom message
      if (result.exists) {
        return Promise.reject(translate(rejectionMessage))
      }

      // Resolve if the entity does not exist
      return Promise.resolve()
    } catch (_error) {
      // Reject in case of a server error or request failure
      return Promise.reject('Validation failed due to a server error.')
    }
  },
  1200, // Default debounce delay of 1200ms
)

export default entityExistenceValidator

// Example Usage with Key:
// The "uniqueKey" here ensures that debouncing is handled based on this identifier.
// This prevents the validation from running too frequently when the same key is used.
// entityExistenceValidator("uniqueKey", {
//   entity: "privilege",
//   filters: { name: { $ilike: "someValue" } },
//   rejectionMessage: "This privilege name already exists."
// }).then(() => {
//   console.log("Entity does not exist");
// }).catch((error) => {
//   console.log("Validation error:", error);
// });
