import * as path from "node:path";
import * as fs from "node:fs";

export default async function deleteFileIfExists(filePath: string): Promise<void> {
  console.log(filePath);

  const fullPath = path.resolve(filePath);

  fs.access(fullPath, (error) => {
    if(!error) {
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.log('File unlink error: '+err);
          
        } else {
          console.log('Fayl o\'chirildi:', fullPath);
        }
      });
    } else if (error.code === 'ENOENT') {
      console.log('Fayl mavjud emas:', filePath);
    } else {
      console.log('file access error: '+error);
      
    }
  });


}