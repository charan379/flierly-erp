import { globSync } from 'glob';
import { basename } from 'path';

const modelFiles = globSync(`${__dirname}/**/*.model.{ts,js}`);

const modelsList: string[] = modelFiles.map(file => {
    const modelFileNameWithoutExtension: string = basename(file).split('.')[0];
    return modelFileNameWithoutExtension.split('-').map((modelNamePart) => {
        return modelNamePart[0].toUpperCase() + modelNamePart.slice(1);
    }).join('');
});

export { modelsList };