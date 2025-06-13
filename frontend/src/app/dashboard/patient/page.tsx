"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Stethoscope, Pill, ClipboardList } from "lucide-react"

export default function KnowYourTreatment() {
  const treatmentData = {
    doctor: {
      name: "Dr. Ananya Rao",
      specialty: "Internal Medicine",
      contact: "+91 98765 43210"
    },
    nurse: {
      name: "Nurse Priya Shetty",
      shift: "Day Shift (8 AM - 4 PM)"
    },
    caseDetails: {
      diagnosis: "Type 2 Diabetes Mellitus",
      admittedOn: "2025-06-01",
      status: "Under Monitoring"
    },
    prescriptions: [
      { name: "Metformin 500mg", dosage: "1 tablet twice daily after meals" },
      { name: "Atorvastatin 10mg", dosage: "1 tablet at bedtime" },
    ]
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Know Your Treatment</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Doctor Details */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="w-6 h-6 text-rose-500" />
              <h2 className="text-xl font-semibold text-gray-700">Doctor Assigned</h2>
            </div>
            <p><strong>Name:</strong> {treatmentData.doctor.name}</p>
            <p><strong>Specialty:</strong> {treatmentData.doctor.specialty}</p>
            <p><strong>Contact:</strong> {treatmentData.doctor.contact}</p>
          </CardContent>
        </Card>

        {/* Nurse Details */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-pink-500" />
              <h2 className="text-xl font-semibold text-gray-700">Nurse Assigned</h2>
            </div>
            <p><strong>Name:</strong> {treatmentData.nurse.name}</p>
            <p><strong>Shift:</strong> {treatmentData.nurse.shift}</p>
          </CardContent>
        </Card>

        {/* Case Details */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <ClipboardList className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-700">Case Details</h2>
            </div>
            <p><strong>Diagnosis:</strong> {treatmentData.caseDetails.diagnosis}</p>
            <p><strong>Admitted On:</strong> {treatmentData.caseDetails.admittedOn}</p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-300">
                {treatmentData.caseDetails.status}
              </Badge>
            </p>
          </CardContent>
        </Card>

        {/* Prescription */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Pill className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-700">Prescribed Medicines</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {treatmentData.prescriptions.map((med, idx) => (
                <li key={idx}>
                  <strong>{med.name}</strong>: {med.dosage}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
