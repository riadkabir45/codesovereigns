import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const root = resolve(dirname(fileURLToPath(import.meta?.url||'/root/dummy/modules')),'..');

export default root;
