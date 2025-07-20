"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Download } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProvincesPage() {
  const [provinces, setProvinces] = useState<any[]>([])
  const [filteredProvinces, setFilteredProvinces] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { provinces: provincesData } = await import("@/lib/data-loader")
        const data = Array.isArray(provincesData) ? provincesData : []
        setProvinces(data)
        setFilteredProvinces(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading provinces:", error)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = provinces.filter((province) =>
        Object.values(province).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredProvinces(filtered)
    } else {
      setFilteredProvinces(provinces)
    }
  }, [searchTerm, provinces])

  const downloadJSON = () => {
    const dataStr = JSON.stringify(filteredProvinces, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "provinces.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading provinces...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">South African Provinces</h1>
          <p className="text-gray-600">
            Showing {filteredProvinces.length} of {provinces.length} provinces
          </p>
        </div>
        <Button onClick={downloadJSON} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download JSON
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search provinces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Provinces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProvinces.map((province, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {province.name || province.province_name || `Province ${index + 1}`}
                  </CardTitle>
                  {province.code && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {province.code}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(province).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key.replace(/_/g, " ")}:</span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProvinces.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No provinces found</h3>
          <p className="text-gray-600">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  )
}
