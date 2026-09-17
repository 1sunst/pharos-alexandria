// Offline asset optimization. Originals are preserved and existing WebP files
// are never overwritten, so editorial replacements remain untouched.
import {readdir,stat,access} from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const root=path.resolve(import.meta.dirname,'..');
const packages=await readdir(path.join(root,'node_modules/.pnpm'));
const sharpPackage=packages.find(name=>name.startsWith('sharp@0.35.4'))??packages.find(name=>name.startsWith('sharp@'));
if(!sharpPackage)throw new Error('Sharp must be installed before optimizing images.');
const sharp=require(path.join(root,'node_modules/.pnpm',sharpPackage,'node_modules/sharp'));
const directory=path.join(root,'public/images');
let originals=0,optimized=0,count=0;
for(const name of await readdir(directory)){
 if(!name.endsWith('.png'))continue;
 const source=path.join(directory,name);
 const target=source.replace(/\.png$/,'.webp');
 try{await access(target);continue;}catch{}
 await sharp(source).webp({quality:88,effort:5}).toFile(target);
 originals+=(await stat(source)).size;optimized+=(await stat(target)).size;count++;
}
console.log(JSON.stringify({images:count,originalBytes:originals,optimizedBytes:optimized,reductionPercent:originals?Math.round((1-optimized/originals)*100):0}));
