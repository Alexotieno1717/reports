"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { ErrorAlert, SuccessAlert } from '@/utils/alerts';
import { useRouter } from 'next/navigation'

interface FormData {
    clientID: number;
    requestType: string;
    startDate: string;
    endDate: string;
    responseEmail: string;
    isRepeated: number;
    repeatInterval: number;
}

const AddReports = () => {
    const router = useRouter();

    const [isRepeated, setIsRepeated] = useState(0);
    const [clientID, setClientID] = useState<number>(0);
    const [responseEmail, setResponseEmail] = useState<string>('');
    const [requestType, setRequestType] = useState<string>('');
    const [repeatInterval, setRepeatInterval] = useState<number>(0);
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });

    const [errors, setErrors] = useState({
        clientID: '',
        responseEmail: '',
        requestType: '',
        repeatInterval: ''
    });

    const handleValueChange = (newValue: DateValueType) => {
        setValue(newValue);
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = { ...errors };

        if (clientID === 0) {
            newErrors.clientID = 'Please enter a valid Client ID.';
            isValid = false;
        } else {
            newErrors.clientID = '';
        }

        if (responseEmail.trim() === '') {
            newErrors.responseEmail = 'Please enter a valid email address.';
            isValid = false;
        } else {
            newErrors.responseEmail = '';
        }

        if (requestType === '') {
            newErrors.requestType = 'Please select a request type.';
            isValid = false;
        } else {
            newErrors.requestType = '';
        }

        if (isRepeated === 1 && repeatInterval === 0) {
            newErrors.repeatInterval = 'Please enter a valid repeat interval.';
            isValid = false;
        } else {
            newErrors.repeatInterval = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const addPost = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            const formData: FormData = {
                clientID: clientID,
                responseEmail: responseEmail,
                requestType: requestType,
                isRepeated: isRepeated,
                repeatInterval: repeatInterval,
                startDate: value?.startDate ? value.startDate.toString() : '',
                endDate: value?.endDate ? value.endDate.toString() : '',
            };

            try {
                const add = await fetch('/api/reports', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await add.json();
                SuccessAlert(`${data.message}`);
                router.push('/');
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            ErrorAlert('Cannnot submit empty form please fill in the data');
        }
    };

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create Request</h1>
                </div>
            </header>

            <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <form className='py-4 mx-auto max-w-3xl bg-white shadow-md p-8' >
                    <div className='space-y-8'>
                        <div>
                            <input type="number" 
                                placeholder="Client ID" 
                                name="clientID" 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientID(Number(e.target.value))} 
                                required 
                            />
                        </div>
                        <div>
                            <input 
                                type="email" 
                                placeholder="johndoe@example.com" 
                                name="responseEmail" 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResponseEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <select 
                            value={requestType} 
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRequestType(e.target.value)}
                            className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-md ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Select Request Type</option>
                            <option value="1">SMS</option>
                            <option value="2">Top Up</option>
                            <option value="3">Services</option>
                        </select>

                        <Datepicker
                            value={value}
                            onChange={handleValueChange}
                            showShortcuts={true}
                            inputClassName="!dark: w-full rounded-md focus:ring-0 focus:border-[#0A5F59] font-normal border border-gray-400 dark:bg-white dark:placeholder:text-gray-400 px-2 py-2"
                            primaryColor={'green'}
                        />

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="showFormCheckbox"
                                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                checked={isRepeated === 1}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsRepeated(e.target.checked ? 1 : 0)}
                            />
                            <label htmlFor="showFormCheckbox" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Is Repeated</label>
                        </div>

                        {isRepeated === 1 && <Input type="number" placeholder="Repeat Interval" name="repeatInterval" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatInterval(Number(e.target.value))} />}
                    </div>
                    <Button className='mt-4' type="submit" onClick={addPost}>Submit Request</Button>
                </form>
            </main>
        </>
    );
};

export default AddReports;
