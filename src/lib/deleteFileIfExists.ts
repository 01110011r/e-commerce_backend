import path from "path";
import * as fs from "fs";
import { HttpException, HttpStatus } from "@nestjs/common";

export default async function deleteFileIfExists(filePath: string): Promise<void> {

      const fullPath = path.resolve(filePath);
  
      await fs.access(fullPath, (error)=>{
        if (error.code === 'ENOENT') {
            console.log('Fayl mavjud emas:', filePath);
          } else {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
          }
      });
  
      await fs.unlink(fullPath, (err) => {
        if (err) {
            throw new HttpException('File could not be deleted', HttpStatus.BAD_REQUEST)
        }
     });
      console.log('Fayl o\'chirildi:', fullPath);

  }