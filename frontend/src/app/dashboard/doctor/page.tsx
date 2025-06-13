"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import {
  Users,
  UserCheck,
  Calendar,
  Stethoscope,
  Activity,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  Bell,
  BarChart3,
  PieChart,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DoctorDashboard() {
  const router = useRouter()
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Dashboard</h1>
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
            
           
{[
  { label: "Manage Pharmacy", icon: Plus, color: "text-blue-600", href: "/dashboard/admin/pharmacy" },
  { label: "Health monitoring", icon: AlertTriangle, color: "text-red-600", href: "/dashboard/admin/patient" },
  { label: "Generate Report", icon: BarChart3, color: "text-green-600", href: "/report" },
  { label: "View Analytics", icon: PieChart, color: "text-orange-600", href: "/analytics" },
].map((action, index) => (
  <Button
    key={index}
    variant="ghost"
    className="w-full justify-start hover:bg-purple-50"
    onClick={() => {
      if (action.href) {
        router.push(action.href)
      }
    }}
  >
    <action.icon className={`w-4 h-4 mr-3 ${action.color}`} />
    {action.label}
  </Button>
))}

            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  