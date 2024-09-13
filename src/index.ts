
import 'dotenv/config';
import { schedule } from 'node-cron';
import axios from '../node_modules/axios/index';

const API_URL = process.env.API_URL;
schedule(`*/1 * * * *`, async () => {
  try {
   const result =  await axios.post(`${API_URL}`,
      {
        "operationName": null,
        "variables": {},
        "query": "mutation {\n  syncEmailSent {\n    message\n  }\n}\n"
      });
    console.log(result.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return 
    }
    console.error(error);
  }

  console.log('Cron job ran');

});

schedule(`*/1 * * * *`, async () => { 
  try {
    const result = await axios.post(`${API_URL}`, {
      "operationName": null,
      "variables": {},
      "query": "mutation {\n  syncInvoices {\n    message\n  }\n}\n"
    })
    console.log(result.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return 
    }
    console.error(error);
  }
  console.log('Cron invoices job ran');
});