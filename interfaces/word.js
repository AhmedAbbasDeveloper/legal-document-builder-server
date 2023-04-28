import Docxtemplater from 'docxtemplater';
import { readFileSync } from 'fs';
import PizZip from 'pizzip';

export default function generateWordDoc(data, template) {
  const content = readFileSync(template, 'binary');

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  return buf;
}
