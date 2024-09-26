import crudService from "@/service/crud.service";
import debouncePromise from "../deboucePromise";

/**
 * Validates the existence of an entity in the database with debounce.
 *
 * @param {Object} params - The parameters for the validation.
 * @param {string} params.entity - The name of the entity (e.g., 'privilege', 'user').
 * @param {Object} [params.filters={}] - The filters used to query the entity (e.g., { name: { $ilike: "value" }}).
 * @param {string} [params.rejectionMessage="Entity already exists."] - Custom message if the entity already exists.
 * @returns {Promise} - Resolves if the entity does not exist, rejects if the entity exists or if there is an error.
 */
const entityExistenceValidator = debouncePromise(
  async ({
    entity,
    filters = {},
    rejectionMessage = "entity_already_exists",
  }) => {
    try {
      // Call the exists method from crudService with the provided entity and filters
      const { result } = await crudService.exists({ entity, filters });

      // If the result indicates the entity exists, reject the promise with the custom message
      if (result?.exists === true) {
        return Promise.reject(rejectionMessage);
      }

      // Resolve if the entity does not exist
      return Promise.resolve();
    } catch (error) {
      // Reject in case of a server error or request failure
      return Promise.reject("Validation failed due to a server error.");
    }
  },
  1200 // Default debounce delay of 1200ms
);

export default entityExistenceValidator;

// Example Usage:
// entityExistenceValidator({
//   entity: "privilege",
//   filters: { name: { $ilike: "someValue" } },
//   rejectionMessage: "This privilege name already exists."
// });
