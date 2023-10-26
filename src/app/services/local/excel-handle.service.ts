import { Injectable } from '@angular/core';
import readXlsxFile from 'read-excel-file';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelHandleService {

  constructor() { }

  async readExcelFile(file: File, schema: any): Promise<any> {
    const data = await readXlsxFile(file, { schema });
    return data.rows;
  }

  exportToExcel(data: any[], filename: string, schema: string[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Write custom header using schema arr
    for (let i = 0; i < schema.length; i++) {
      const cell = XLSX.utils.encode_cell({ c: i, r: 0 }); // Specify row 0 for header
      worksheet[cell].v = schema[i]; // Set cell value as the schema

      // Apply header styles
      worksheet[cell].s = {
        fill: {
          fgColor: { rgb: '00FF00' }, // Green background
        },
        font: {
          color: { rgb: 'FFFFFF' }, // White text
        },
      };

    }

    const workbook: XLSX.WorkBook = { Sheets: { 'DSSV': worksheet }, SheetNames: ['DSSV'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, filename);
  }

  private saveAsExcelFile(buffer: any, filename: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = filename.includes('.xlsx') ? filename : filename + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
