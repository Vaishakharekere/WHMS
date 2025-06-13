"use client"
import { Button } from "@/components/ui/button"
import { Clock, Users, Award, Heart } from "lucide-react"
import Image from "next/image"



const logos = [
  { name: "kma", src: "/kma.jpg" },
  { name: "aiims", src: "/aiims.png" },
  { name: "ima", src: "/ima.png" },
  { name: "ims", src: "/ims.jpeg" },
  // { name: "pmjay", src: "pmjay.svg" },
];
export default function Page() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
      {/* Enhanced Partner Logos Section */}
      <section className="bg-white py-6 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-600 mb-4 font-medium">Trusted Partners & Certifications</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
          {logos.map(({ name, src }) => (
  <div key={name} className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <Image
        src={src}
        alt={name}
        width={60}
        height={60}
        className="grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  </div>
))}

          </div>
        </div>
      </section>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-pink-600/5"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 rounded-full text-pink-700 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Leading Healthcare Innovation
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Health
            </span>
            ,<br />
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Priority
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A step toward real-time, citizen-led hospital innovation with cutting-edge technology and compassionate care
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Book Appointment
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 hover:border-pink-500 hover:text-pink-600 px-8 py-3 text-lg transition-all duration-300"
            >
              Emergency Services
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Hospital Image Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
              <Image
                src="/wen.webp"
                alt="Wenlock District Hospital"
                width={1000}
                height={600}
                className="rounded-xl w-full object-cover shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Wenlock District Hospital</h3>
                <p className="text-gray-200">State-of-the-art medical facility serving the community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "50K+", label: "Patients Served" },
              { icon: Award, number: "25+", label: "Years Experience" },
              { icon: Heart, number: "100+", label: "Medical Experts" },
              { icon: Clock, number: "24/7", label: "Emergency Care" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}