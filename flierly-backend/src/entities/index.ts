import { toKebabCase } from '@/utils/caseConverters';
import { glob } from 'glob';
import { basename } from 'path';

async function getEntityList(): Promise<EntityDetails[]> {

    const files = await glob(`${__dirname}/**/*.entity.{ts,js}`);

    const entityList: EntityDetails[] = files.map(file => {
        const entityFileNameWithoutExtension: string = basename(file).split('.')[0];
        return {
            // entity name
            entity: entityFileNameWithoutExtension,
            // path
            filePath: file,
            // code
            code: toKebabCase(entityFileNameWithoutExtension),
        };
    });

    const igonredEntity = ['user-password'];

    return entityList.filter(entity => !igonredEntity.includes(entity.code));
};

export default getEntityList;