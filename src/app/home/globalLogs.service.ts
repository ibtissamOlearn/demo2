import {Injectable} from '@angular/core';
import  * as FileSaver from  'file-saver';

@Injectable(
)

export  class  GlobalLogsService {

  private globalLogs: any[] = [];
  private headers: any[] = ['date', 'level', 'message'];

  constructor() {}

  addLog(date: string, level: string, message: string) {
    this.globalLogs.push({
      date,
      level,
      message
    });
    console.log(message);
  }

  downloadLogs() {
    const csvContent: string =
      this.headers.join(',') +
      '\n' +
      this.globalLogs
        .map((rowLog: any) =>
          this.headers
            .map((headKey) =>
              rowLog[headKey.toLowerCase().replace(/\s/g, '_')]
                ? rowLog[headKey.toLowerCase().replace(/\s/g, '_')]
                : ''
            )
            .join(',')
        )
        .join('\n');

    this.exportFile(csvContent, 'text/csv');
  }

  private exportFile(log: string, fileType: string) {
    const blob = new Blob([log], { type: fileType });
    FileSaver.saveAs(blob,'/DownloadLogs.csv');
  }

  /*constructor() {
  }
  csvDownald(headers: any, glabalLogs: any){
    console.log('inside csvDownald function');
    if (!glabalLogs || glabalLogs.length === 0){
      console.log('glabalLogs error');
      return;
    }

    const separator = ',';
    const csvContent: any =
      headers.join(separator) +
      '\n' +
      glabalLogs.
        map((rowLog: any) => {
          return headers
          .map((headKey) => {
            return rowLog[headKey.toLowerCase().replaceAll('','_')]
            ===
              null || rowLog[headKey.toLowerCase().replaceAll('','_')]
            ===
              undefined
            ? ''
              : rowLog[headKey.toLowerCase().replaceAll('','_')];
          })
          .join(separator);
      })
        .join('\n');
    this.exportFile(csvContent, 'text/csv');
  }

  exportFile(log: any, fileType: string) {
    console.log('inside exportFile function');
    const blob = new Blob([log], {type: fileType});
    FileSaver.saveAs(blob,'Download CSV');
  }*/

}
