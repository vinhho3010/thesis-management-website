import { Injectable } from '@angular/core';
import readXlsxFile from 'read-excel-file'

@Injectable({
  providedIn: 'root'
})
export class ExcelHandleService {

  constructor() { }

  async readExcelFile(file: File, schema: any): Promise<any> {
    const data = await readXlsxFile(file, { schema });
    return data.rows;
  }
}
