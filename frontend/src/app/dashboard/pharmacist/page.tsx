"use client"
import { useState, useEffect } from "react"
import { Pill, ExternalLink, RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PharmacistDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000) // Update every minute

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    const iframe = document.querySelector("iframe")
    if (iframe) {
      iframe.src = iframe.src
    }
    setTimeout(() => setIsLoading(false), 1500)
  }

  const handleFullscreen = () => {
    window.open("https://r8pzcgbc-8501.inc1.devtunnels.ms/", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-orange-200 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-sm opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-full shadow-lg">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Pharmacy Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">Medication Management System</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"} animate-pulse`}></div>
                <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="border-orange-200 hover:border-orange-400 hover:bg-orange-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFullscreen}
                  className="border-orange-200 hover:border-orange-400 hover:bg-orange-50"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Prescriptions", value: "127", icon: CheckCircle, color: "text-green-600" },
            { label: "Pending Orders", value: "23", icon: Clock, color: "text-yellow-600" },
            { label: "Low Stock Items", value: "8", icon: AlertCircle, color: "text-red-600" },
            { label: "Today's Sales", value: "₹45,230", icon: Pill, color: "text-blue-600" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Main Application Frame */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5" />
                Pharmacy Management System
              </CardTitle>
              <div className="flex items-center gap-2 text-orange-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live System</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 relative">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4 shadow-lg">
                    <RefreshCw className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <p className="text-gray-600 font-medium">Loading Pharmacy System...</p>
                  <p className="text-sm text-gray-500 mt-1">Please wait while we connect to the server</p>
                </div>
              </div>
            )}

            {/* Iframe Container */}
            <div className="relative w-full h-[calc(100vh-280px)] min-h-[600px]">
              <iframe
                src="https://r8pzcgbc-8501.inc1.devtunnels.ms/"
                title="Pharmacy Management System"
                width="100%"
                height="100%"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
                className="w-full h-full border-0 rounded-b-lg"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setIsOnline(false)
                }}
              />

              {/* Connection Status Overlay */}
              {!isOnline && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h3>
                    <p className="text-gray-600 mb-4">Unable to connect to the pharmacy system</p>
                    <Button
                      onClick={() => {
                        setIsOnline(true)
                        handleRefresh()
                      }}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry Connection
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Pharmacy Management System • Last updated: {lastUpdated.toLocaleString()} •
            <span className="text-orange-600 font-medium"> WHMS Healthcare</span>
          </p>
        </div>
      </div>
    </div>
  )
}
