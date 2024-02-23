import { useRouter } from 'next/router';

import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

export default function GenerateQR() {
    const router = useRouter();

    const { query } = router;
    const url = query.url;


    return (

        <div className='bg-base-100 min-h-screen px-8 py-4'>
            
        <div className='card md:w-2/4 m-auto  p-4'>

        <div className='flex justify-center'>
            <QRCodeSVG
            id="qrCode"
            value={url}
            size={300}
            level={"H"}
            />
        </div>

        </div>
        </div>
    )
}