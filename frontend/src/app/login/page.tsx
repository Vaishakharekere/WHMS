"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Stethoscope, User, Shield, Heart, Pill, UserCheck, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Role {
  id: string
  name: string
  icon: React.ComponentType<any>
  color: string
  gradient: string
  endpoint: string
  description: string
}

const roles: Role[] = [
  {
    id: "doctor",
    name: "Doctor",
    icon: Stethoscope,
    color: "text-blue-600",
    gradient: "from-blue-500 to-cyan-500",
    endpoint: "doctor-login",
    description: "Medical professionals and specialists",
  },
  {
    id: "user",
    name: "Patient",
    icon: User,
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-500",
    endpoint: "user-login",
    description: "Patients and general users",
  },
  {
    id: "admin",
    name: "Admin",
    icon: Shield,
    color: "text-purple-600",
    gradient: "from-purple-500 to-violet-500",
    endpoint: "admin-login",
    description: "System administrators",
  },
  {
    id: "nurse",
    name: "Nurse",
    icon: Heart,
    color: "text-pink-600",
    gradient: "from-pink-500 to-rose-500",
    endpoint: "nurse-login",
    description: "Nursing staff and caregivers",
  },
  {
    id: "pharmacist",
    name: "Pharmacist",
    icon: Pill,
    color: "text-orange-600",
    gradient: "from-orange-500 to-amber-500",
    endpoint: "pharmacist-login",
    description: "Pharmacy and medication staff",
  },
  {
    id: "receptionist",
    name: "Receptionist",
    icon: UserCheck,
    color: "text-teal-600",
    gradient: "from-teal-500 to-cyan-500",
    endpoint: "receptionist-login",
    description: "Front desk and reception staff",
  },
]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
  }

  const handleBack = () => {
    setSelectedRole(null)
    setFormData({ email: "", password: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return

    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:8000/api/v1/signin/${selectedRole.endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token if provided
        localStorage.setItem("isLoggedIn", "true");

        if (data.token) {
          localStorage.setItem("authToken", data.token)
          localStorage.setItem("userRole", selectedRole.id)
        }

        // Redirect based on role
        switch (selectedRole.id) {
          case "doctor":
            router.push("/dashboard/doctor")
            break
          case "admin":
            router.push("/dashboard/admin")
            break
          case "nurse":
            router.push("/dashboard/nurse")
            break
          case "pharmacist":
            router.push("/dashboard/pharmacist")
            break
          case "receptionist":
            router.push("/dashboard/receptionist")
            break
          case "user":
            router.push("/dashboard/patient")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        alert(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to role selection
            </Button>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${selectedRole.gradient} mb-4 mx-auto shadow-lg`}
              >
                <selectedRole.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">{selectedRole.name} Login</CardTitle>
              <CardDescription className="text-gray-600">{selectedRole.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 bg-gradient-to-r ${selectedRole.gradient} hover:opacity-90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    `Sign in as ${selectedRole.name}`
                  )}
                </Button>
              </form>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => router.push("/signup")}
                  >
                    Sign up here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">WHMS</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your role to access the hospital management system
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="group cursor-pointer border-2 border-gray-200 hover:border-transparent bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              onClick={() => handleRoleSelect(role)}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${role.gradient} mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{role.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Need help accessing your account?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-gray-300 hover:border-blue-500 hover:text-blue-600">
              Contact Support
            </Button>
            <Button variant="outline" className="border-gray-300 hover:border-green-500 hover:text-green-600">
              Emergency Access
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
