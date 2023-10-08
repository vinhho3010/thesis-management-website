export class FileUpload {
  key!: string;
  title!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
