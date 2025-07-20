"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Wifi, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { networks } from "@/lib/data-loader"

export default function NetworksPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNetworks = networks.filter(
    (network: any) =>
      network.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      network.type?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const downloadJSON = () => {
    const dataStr = JSON.stringify(networks, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "za-networks.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">South African Networks</h1>
              </div>
            </div>
            <Button onClick={downloadJSON}>
              <Download className="h-4 w-4 mr-2" />
              Download JSON
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Networks Dataset</h2>
              <p className="text-gray-600">Mobile and internet service providers</p>
            </div>
            <Badge variant="outline">{networks.length} networks</Badge>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search networks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Networks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNetworks.map((network: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg leading-tight">{network.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(network).map(([key, value]) => {
                    if (key === "name") return null
                    return (
                      <div key={key} className="text-sm">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>{" "}
                        <span className="text-gray-600">{String(value)}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNetworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No networks found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
