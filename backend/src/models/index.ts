import { globSync } from 'glob';
import { basename } from 'path';

const modelFiles = globSync(`${__dirname}/**/*.model.{ts,js}`);

const modelsList: ModelDetails[] = modelFiles.map(file => {
    const modelFileNameWithoutExtension: string = basename(file).split('.')[0];
    return {
        // model name
        model: modelFileNameWithoutExtension.split('-').map((modelNamePart) => {
            return modelNamePart[0].toUpperCase() + modelNamePart.slice(1);
        }).join(''),
        // 
        filePath: file,
        name: modelFileNameWithoutExtension,
    };
});

export { modelsList };