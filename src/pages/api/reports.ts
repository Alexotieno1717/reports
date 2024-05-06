import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {

  console.log(req.body)

  let data = new FormData();
  data.append('clientID', req.body.clientID);
  data.append('requestType', req.body.requestType);
  data.append('startDate', req.body.startDate);
  data.append('endDate', req.body.endDate);
  data.append('responseEmail', req.body.responseEmail);
  data.append('isRepeated', req.body.isRepeated);
  data.append('repeatInterval', req.body.repeatInterval);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://161.35.6.91/bongaSMSReports/add.php',
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.status(response.status).json(response.data)
  })
  .catch((error) => {
    console.log(error);
    res.status(error.status).json({status: error.status, message: error.message})
  });

}

