// 'use client';
// import { ShieldCheck, Stethoscope, ClipboardList, MonitorDot, ActivitySquare } from 'lucide-react';

// const features = [
// {
// title: 'Real-Time Patient & Token Management',
// icon: ClipboardList,
// description:
// 'Live token generation and tracking per department ensures smoother patient flow, multilingual screens, and less crowding at counters.',
// },
// {
// title: 'Operation Theatre Scheduling & Alerts',
// icon: ActivitySquare,
// description:
// 'Centralized OT dashboard allows real-time scheduling, emergency overrides, and usage history — reducing confusion and improving response time.',
// },
// {
// title: 'Pharmacy & Drug Inventory Sync',
// icon: Stethoscope,
// description:
// 'Track medicine availability in real-time. Staff receive restock alerts and patients can view available drugs on smart lobby displays.',
// },
// {
// title: 'Smart Display & Public Communication System',
// icon: MonitorDot,
// description:
// 'Department-wise displays show live queue status, emergency announcements, and health information — improving transparency and guidance.',
// },
// {
// title: 'Privacy Controls & Access Management',
// icon: ShieldCheck,
// description:
// 'Role-based dashboards ensure secure access. Audit trails track actions. Patient privacy is preserved on public displays.',
// },
// ];

// export default function AboutPage() {
// return (
// <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
// <div className="max-w-6xl mx-auto text-center">
// <h1 className="text-4xl font-bold mb-4 text-pink-600">About WHMS</h1>
// <p className="text-gray-600 text-lg mb-10">
// WHMS is a centralized platform that modernizes hospital operations, empowering public healthcare through innovation and real-time systems.
// </p>
// </div>
// <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//     {features.map((feature, index) => (
//       <div
//         key={index}
//         className="p-6 bg-pink-50 border border-pink-100 rounded-xl shadow hover:shadow-md transition-all"
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <feature.icon className="w-6 h-6 text-pink-600" />
//           <h3 className="text-lg font-semibold text-pink-700">{feature.title}</h3>
//         </div>
//         <p className="text-sm text-gray-700">{feature.description}</p>
//       </div>
//     ))}
//   </div>
// </div>
// );
// }

'use client';
import {
ClipboardList,
ActivitySquare,
Stethoscope,
MonitorDot,
ShieldCheck,
} from 'lucide-react';

const aboutSteps = [
{
title: 'Transforming Patient Flow',
icon: ClipboardList,
text: 'WHMS introduces live token generation per department, replacing manual queues. Patients can view their token status on multilingual smart screens, leading to a smoother OPD experience.',
},
{
title: 'Streamlining Surgeries',
icon: ActivitySquare,
text: 'We centralize Operation Theatre (OT) schedules with real-time dashboards, emergency overrides, and role-based alerts to avoid double bookings or confusion during critical hours.',
},
{
title: 'Smarter Pharmacy Sync',
icon: Stethoscope,
text: 'No more hunting for medicines! WHMS syncs drug inventory with availability screens and ensures alerts to pharmacy staff when stocks are low.',
},
{
title: 'Connected Communication',
icon: MonitorDot,
text: 'From token updates to department-specific notices, WHMS powers dynamic digital displays that connect caregivers, patients, and staff in real-time.',
},
{
title: 'Data Privacy First',
icon: ShieldCheck,
text: 'WHMS ensures strict access control through role-based dashboards. Every sensitive operation is audit-logged to maintain transparency and protect patient data.',
},
];

export default function AboutPage() {
return (
<div className="min-h-screen bg-white py-12 px-4 text-gray-900">
<div className="max-w-4xl mx-auto text-center mb-16">
<h1 className="text-4xl font-bold text-pink-600 mb-4">About WHMS</h1>
<p className="text-lg text-gray-600">
Wenlock Hospital Management System (WHMS) is a people-first innovation tailored to bring real-time intelligence into public healthcare operations.
</p>
</div>
<div className="space-y-16 max-w-5xl mx-auto">
    {aboutSteps.map((step, index) => (
      <div
        key={index}
        className={`flex flex-col md:flex-row items-center gap-8 ${
          index % 2 === 1 ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
          <step.icon className="text-white w-7 h-7" />
        </div>
        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold text-pink-700 mb-2">{step.title}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{step.text}</p>
        </div>
      </div>
    ))}
  </div>
</div>
);
}