import { glob } from 'glob';
import { basename } from 'path';


async function getModelsList(): Promise<ModelDetails[]> {
    const files = await glob(`${__dirname}/**/*.model.{ts,js}`);

    const modelsList: ModelDetails[] = files.map(file => {
        const modelFileNameWithoutExtension: string = basename(file).split('.')[0];
        return {
            // model name
            entity: modelFileNameWithoutExtension.split('-').map((modelNamePart) => {
                return modelNamePart[0].toUpperCase() + modelNamePart.slice(1);
            }).join(''),
            // path
            filePath: file,
            // name
            name: modelFileNameWithoutExtension,
        };
    })

    const igonredModels = ['user-password'];

    return modelsList.filter(model => !igonredModels.includes(model.name));
};

export { getModelsList };