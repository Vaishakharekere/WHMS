'use client';

export default function HealthProgramsPage() {
return (
<div className="min-h-screen bg-white px-6 py-12 text-gray-900">
<div className="max-w-4xl mx-auto text-center">
<h1 className="text-4xl font-bold text-pink-600 mb-6">Health Programs</h1>
<p className="text-gray-600 mb-12 text-lg">
Explore digital services integrated into our hospital for citizen welfare.
</p>
</div>

  <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3 text-center">
  <div role="button" tabIndex={0} onClick={() => window.open('https://sast.karnataka.gov.in/', '_blank')} onKeyDown={(e) => { if (e.key === 'Enter') window.open('https://sast.karnataka.gov.in/', '_blank'); }} className="cursor-pointer border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500" > <img src="image.png" alt="Ayushman Bharat" className="w-64 h-32 object-contain mx-auto mb-4" /> <div className="text-xl font-semibold text-pink-700 text-center"> Ayushman Bharat </div> </div>

   <div role="button" tabIndex={0} onClick={() => window.open('https://hfwcom.karnataka.gov.in/english', '_blank')} onKeyDown={(e) => { if (e.key === 'Enter') window.open('https://hfwcom.karnataka.gov.in/english', '_blank'); }} className="cursor-pointer border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500" > <img src="ka.png" alt="Ayushman Bharat" className="w-64 h-32 object-contain mx-auto mb-4" /> <div className="text-xl font-semibold text-pink-700 text-center">Health and Family Welfare </div> </div>


    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
    <div role="button" tabIndex={0} onClick={() => window.open('https://pcpndt.karnataka.gov.in/login.aspx', '_blank')} onKeyDown={(e) => { if (e.key === 'Enter') window.open('https://pcpndt.karnataka.gov.in/login.aspx', '_blank'); }} className="cursor-pointer border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500" > <img src="pn.webp" alt="Ayushman Bharat" className="w-64 h-32 object-contain mx-auto mb-4" /> <div className="text-xl font-semibold text-pink-700 text-center">Balika F Form Submission</div> </div>

    </div>
  </div>
</div>
);
}