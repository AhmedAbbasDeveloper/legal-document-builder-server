import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import generateWordDoc from './interfaces/word.js';
import getDate from './utils/date.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/rin', (req, res) => {
  const data = {
    name: req.body.name,
    companyName: req.body.companyName,
    phoneNumber: req.body.phoneNumber,
    ...getDate(req.body.date),
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };

  const doc = generateWordDoc(data, 'rin-template.docx');

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename=Ontario_RIN.docx');
  res.send(doc);
});

app.listen(process.env.PORT, () => {
  console.log('Server started successfully');
});
