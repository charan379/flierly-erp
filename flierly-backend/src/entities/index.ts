import { camelToKebabCase, pascalToKebabCase } from '@/utils/case-converters';
import { glob } from 'glob';
import { basename } from 'path';

/**
 * Represents the details of an entity.
 */
interface EntityDetails {
  entity: string;
  filePath: string;
  code: string;
  controller: string;
}

/**
 * Retrieves a list of entity details by scanning the directory for entity files.
 * 
 * @returns {Promise<EntityDetails[]>} A promise that resolves to an array of entity details.
 */
async function getEntityList (): Promise<EntityDetails[]> {
  // Get all entity files with .ts or .js extension
  const files = await glob(`${__dirname}/**/*.entity.{ts,js}`);

  // Map the files to entity details
  const entityList: EntityDetails[] = files.map((file) => {
    const entityFileNameWithoutExtension: string = basename(file).split('.')[0];
    return {
      entity: entityFileNameWithoutExtension,
      filePath: file.replace(/\.ts/, ".{ts,js}"),
      code: camelToKebabCase(entityFileNameWithoutExtension),
      controller: `${pascalToKebabCase(entityFileNameWithoutExtension)}-controller`,
    };
  });

  // List of entities to be ignored
  const ignoredEntity = ['user-password'];

  // Filter out ignored entities
  return entityList.filter((entity) => !ignoredEntity.includes(entity.code));
}

export default getEntityList;
