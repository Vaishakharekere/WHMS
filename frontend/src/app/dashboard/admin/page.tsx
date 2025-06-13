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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const router = useRouter()
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: "Total Inpatients",
      value: "247",
      change: "+12",
      changeType: "increase",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Outpatients",
      value: "1,834",
      change: "+89",
      changeType: "increase",
      icon: UserCheck,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Today's Patients",
      value: "156",
      change: "+23",
      changeType: "increase",
      icon: Calendar,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Active Doctors",
      value: "48",
      change: "+2",
      changeType: "increase",
      icon: Stethoscope,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  const recentActivities = [
    { time: "10:30 AM", action: "New patient admitted", patient: "John Doe", department: "Cardiology" },
    { time: "10:15 AM", action: "Surgery completed", patient: "Jane Smith", department: "Orthopedics" },
    { time: "09:45 AM", action: "Emergency case", patient: "Mike Johnson", department: "Emergency" },
    { time: "09:30 AM", action: "Patient discharged", patient: "Sarah Wilson", department: "General" },
    { time: "09:15 AM", action: "Lab results ready", patient: "David Brown", department: "Pathology" },
  ]

  const departmentStats = [
    { name: "Emergency", patients: 23, capacity: 30, utilization: 77 },
    { name: "ICU", patients: 18, capacity: 20, utilization: 90 },
    { name: "General Ward", patients: 145, capacity: 180, utilization: 81 },
    { name: "Pediatrics", patients: 32, capacity: 40, utilization: 80 },
    { name: "Maternity", patients: 29, capacity: 35, utilization: 83 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-200 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full blur-sm opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-violet-500 p-3 rounded-full shadow-lg">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">Hospital Management System</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleString()}</span>
              </div>

              <Button variant="outline" size="sm" className="border-purple-200 hover:border-purple-400">
                <Bell className="w-4 h-4" />
              </Button>

              <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
                <Plus className="w-4 h-4 mr-2" />
                Quick Actions
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <Badge variant={stat.changeType === "increase" ? "default" : "destructive"} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Department Utilization */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Department Utilization
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                      <span className="text-sm text-gray-500">
                        {dept.patients}/{dept.capacity}
                      </span>
                    </div>
                    <Progress value={dept.utilization} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{dept.utilization}% utilized</span>
                      <span className={dept.utilization > 85 ? "text-red-500" : "text-green-500"}>
                        {dept.utilization > 85 ? "High" : "Normal"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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

        {/* Recent Activities */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Recent Activities
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">Patient: {activity.patient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{activity.department}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
