import {Injectable} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.nextPageLabel = "Trang sau";
    this.previousPageLabel = "Trang trước";
    this.itemsPerPageLabel = "Số phần tử";
    this.lastPageLabel = "Trang cuối";
    this.firstPageLabel = "Trang đầu";
    this.changes.next();

  }

 override getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 trên ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} trên ${length}`;
  }
}
