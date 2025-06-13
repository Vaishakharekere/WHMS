'use client';

import { ClipboardList, ActivitySquare, Pill, MonitorDot, ShieldCheck } from 'lucide-react';

const services = [
{
title: 'Real-Time Patient & Token Management',
description:
'Generate and track department-wise tokens for patients. Enhances queue flow and minimizes overcrowding through real-time updates.',
icon: ClipboardList,
color: 'text-blue-600',
},
{
title: 'Operation Theatre Scheduling & Alerts',
description:
'Centralized OT scheduling system with emergency override alerts. Provides real-time OT status to minimize delays.',
icon: ActivitySquare,
color: 'text-rose-600',
},
{
title: 'Pharmacy & Drug Inventory Sync',
description:
'Real-time tracking of medicine stock and availability. Pharmacy staff and patients get instant updates on supply status.',
icon: Pill,
color: 'text-green-600',
},
{
title: 'Smart Display & Public Communication System',
description:
'Department-wise token displays and public announcement boards. Improves communication between hospital staff and patients.',
icon: MonitorDot,
color: 'text-yellow-600',
},
{
title: 'Privacy Controls & Access Management',
description:
'Enforces role-based access and audit trails for secure data management. Ensures privacy compliance for patient records.',
icon: ShieldCheck,
color: 'text-purple-600',
},
];

export default function ServicesPage() {
return (
<div className="min-h-screen bg-white px-6 py-12 text-gray-900">
<div className="max-w-6xl mx-auto text-center mb-12">
<h1 className="text-4xl font-bold text-pink-600 mb-4">Our Services</h1>
<p className="text-gray-600 text-lg">
WHMS offers digital solutions that improve hospital operations and patient experience.
</p>
</div>
<div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {services.map((service, index) => (
      <div
        key={index}
        className="p-6 border rounded-lg shadow-sm hover:shadow-md transition bg-pink-50/30"
      >
        <div className={`mb-4 flex items-center justify-center w-12 h-12 rounded-full ${service.color} bg-opacity-10`}>
          <service.icon className={`w-6 h-6 ${service.color}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-sm text-gray-600">{service.description}</p>
      </div>
    ))}
  </div>
</div>
);
}