import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    // Create the URL with query parameters
    const apiUrl = `http://161.35.6.91/bongaSMSReports/requests.php`;

    // Make a GET request to the API endpoint
    const response = await axios.get(apiUrl);

    // Send response with the data received from the API
    const dataobj = res.status(response.status).json(response.data);
    
    // console.log(response.data)
  } catch (error: any) {
    // Handle errors
    console.error(error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
