import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import slugify from 'slugify';

import generateWordDocument from './interfaces/word.js';
import getDate from './utils/date.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/rin', (req, res) => {
  const {
    name, companyName, phoneNumber, date, address, city, postalCode,
  } = req.body;

  const data = {
    name,
    companyName,
    phoneNumber,
    ...getDate(date),
    address,
    city,
    postalCode,
  };

  const doc = generateWordDocument(data, 'rin-template.docx');

  const fileName = `${slugify(data.companyName)}-RIN-Letter.docx`;

  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(doc);
});

app.listen(process.env.PORT, () => {
  console.log('Server started successfully');
});
