import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { execSync } from "child_process";

const { name } = yargs(hideBin(process.argv)).options({
    name: { type: 'string', demandOption: true, describe: 'Name of the migration' },
}).parseSync();

console.log(`Generating migration with name: ${name}`);

try {
    execSync(`npm run typeorm migration:generate migrations/${name}`, { stdio: 'inherit' });
    console.log('Migration generated successfully.');
} catch (error) {
    console.error('Error generating migration:', error);
}