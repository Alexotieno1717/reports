import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Welcome } from '@/types';

const getRequestTypeName = (requestType: string | null): string => {
    switch (requestType) {
        case '1':
            return 'SMS';
        case '2':
            return 'Top Up';
        case '3':
            return 'Services';
        default:
            return 'Unknown';
    }
};

export default function Home() {
    const [home, setHome] = useState<Welcome | null >(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Welcome>('http://161.35.6.91/bongaSMSReports/requests.php');
                setHome(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    console.log(home);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bonga SMS Reports</h1>
                </div>
            </header>

            <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <table className="w-full min-w-max table-auto text-left shadow-lg rounded-md">
                    <thead className="text-lg bg-gray-100 uppercase">
                    <tr>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client
                            ID
                        </th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request
                            Type
                        </th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response
                            Email
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {!home ? (
                        <>
                            <tr>
                                <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                                    Bonga SMS Report not found
                                </td>
                            </tr>
                        </>

                    ) : (
                        home && home.data.map((item, index) => (
                            <tr className="even:bg-blue-gray-50/50" key={index}>
                                <td className="px-1 py-4 whitespace-nowrap pl-2">{index + 1}</td>
                                <td className="px-1 py-4 whitespace-nowrap pl-2">{item.ClientID}</td>
                                <td className="px-1 py-4 whitespace-nowrap pl-2">{getRequestTypeName(item.RequestType)}</td>
                                <td className="px-1 py-4 whitespace-nowrap pl-2">{item.Status}</td>
                                <td className="px-1 py-4 whitespace-nowrap pl-2">{item.ResponseEmail}</td>
                            </tr>
                        ))
                    )}
                    </tbody>

                </table>
            </main>
        </>
    );
}