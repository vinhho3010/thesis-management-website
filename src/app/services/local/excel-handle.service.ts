import { Injectable } from '@angular/core';
import readXlsxFile from 'read-excel-file';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExcelHandleService {

  constructor() { }

  async readExcelFile(file: File, schema: any): Promise<any> {
    const data = await readXlsxFile(file, { schema });
    return data.rows;
  }

  exportToExcel(data: any[], filename: string, schema: string[], columnWidth: any[]): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ThongTin');

    // Create header row with styling
    const headerRow = worksheet.addRow(schema);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF16A34A' }, // Green background
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' }, // White text
        size: 14,
        bold: true
      };
    });

    // Set column widths with pass array
    columnWidth.forEach((item, index) => {
      worksheet.getColumn(index + 1).width = item;
    })

    // Add data rows
    data.forEach(item => {
      const value = Object.values(item);
      worksheet.addRow(value);

    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      this.saveAsExcelFile(buffer, filename);
    });
  }

// saveAsExcelFile(buffer: any, fileName: string): void {
//   const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
//   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
// }

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
