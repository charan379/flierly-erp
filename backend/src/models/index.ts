import { globSync } from 'glob';
import { basename } from 'path';

const modelFiles = globSync(`${__dirname}/**/*.model.{ts,js}`);

const modelsList: { name: string, path: string }[] = modelFiles.map(file => {
    const modelFileNameWithoutExtension: string = basename(file).split('.')[0];
    return {
        name: modelFileNameWithoutExtension.split('-').map((modelNamePart) => {
            return modelNamePart[0].toUpperCase() + modelNamePart.slice(1);
        }).join(''),
        path: file
    };
});

export { modelsList, modelFiles };