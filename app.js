import cors from 'cors';
import express from 'express';

import generateWordDoc from './interfaces/word.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/rin', (req, res) => {
  const data = {
    name: req.body.name,
    companyName: req.body.companyName,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    postalCode: req.body.postalCode,
    phoneNumber: req.body.phoneNumber,
  };

  const doc = generateWordDoc(data, 'rin-template.docx');

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename=output.docx');
  res.send(doc);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
