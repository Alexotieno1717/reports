import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Inter as FontSans } from "next/font/google"
import {cn} from "@/lib/utils";
import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';

const fontSans = FontSans({
    subsets: ["greek-ext"],
    variable: "--font-sans",
})

export default function App({ Component, pageProps }: AppProps) {

    return (
    <div className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
        )}
    >
    {/*  Page wrapper start  */}
        <div>
            {/* Header */}
            <Header/>

            {/*<header className="bg-white shadow">*/}
            {/*    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">*/}
            {/*        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bonga SMS Reports</h1>*/}
            {/*    </div>*/}
            {/*</header>*/}
            <div>
                <ToastContainer limit={1} position='top-right' autoClose={5000} />
                <Component {...pageProps} />
            </div>
        </div>
    </div>
    );
}