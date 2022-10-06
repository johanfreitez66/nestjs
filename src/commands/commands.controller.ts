import { Controller, Get, Header, HttpCode, Post, Res, StreamableFile } from '@nestjs/common';
import { CommandsService } from './commands.service';
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';
import { join } from 'path';

@Controller('commands')
export class CommandsController {
  constructor(private service: CommandsService) {}

  @Post(':id')
  getCommands() {
    return this.service.getCommands();
  }
  
  @Get('pdf')
 // @HttpCode(201)
  @Header('Content-Type', 'file/pdf')
  @Header('Content-Disposition', 'attachment; filename=test.pdf')
  public pdf() {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      watermark: { text: '07:00am', color: 'blue', opacity: 0.3, bold: true, italics: false },
      content: [
        { text: 'Commands', fontSize: 25},
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
      
            body: [
              [ 'First', 'Second', 'Third', 'The last one' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ 'Val 1','Val 2', 'Val 3', 'Val 4' ]
            ],
          },
        },
        {text: 'google', link: 'http://google.com', pageBreak: 'before',},
        { qr: 'table', foreground: 'green', background: 'white' },
      ],
      defaultStyle: {
        font: 'Helvetica'
      }
    };
 
    const options = {
    }
    let file_name = 'test.pdf';
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();

   let file = fs.createReadStream(join(process.cwd(), './test.pdf'));
   fs.unlink('./test.pdf', function (err) {
      console.log('file deleted');
   });
  
   return new StreamableFile(file);
  }
  
}

