"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Search, Download, Filter } from "lucide-react"
import { useState, useEffect } from "react"

export default function MunicipalitiesPage() {
  const [municipalities, setMunicipalities] = useState<any[]>([])
  const [provinces, setProvinces] = useState<any[]>([])
  const [filteredMunicipalities, setFilteredMunicipalities] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { municipalities: municipalitiesData, provinces: provincesData } = await import("@/lib/data-loader")
        const munData = Array.isArray(municipalitiesData) ? municipalitiesData : []
        const provData = Array.isArray(provincesData) ? provincesData : []
        setMunicipalities(munData)
        setProvinces(provData)
        setFilteredMunicipalities(munData)
        setLoading(false)
      } catch (error) {
        console.error("Error loading municipalities:", error)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    let filtered = municipalities

    if (searchTerm) {
      filtered = filtered.filter((municipality) =>
        Object.values(municipality).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedProvince !== "all") {
      filtered = filtered.filter(
        (municipality) => municipality.province === selectedProvince || municipality.province_code === selectedProvince,
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(
        (municipality) => municipality.type === selectedType || municipality.municipality_type === selectedType,
      )
    }

    setFilteredMunicipalities(filtered)
  }, [searchTerm, selectedProvince, selectedType, municipalities])

  const downloadJSON = () => {
    const dataStr = JSON.stringify(filteredMunicipalities, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "municipalities.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-green-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading municipalities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">South African Municipalities</h1>
          <p className="text-gray-600">
            Showing {filteredMunicipalities.length} of {municipalities.length} municipalities
          </p>
        </div>
        <Button onClick={downloadJSON} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download JSON
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search municipalities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger>
            <SelectValue placeholder="All Provinces" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Provinces</SelectItem>
            {provinces.map((province) => (
              <SelectItem key={province.code || province.id} value={province.code || province.id}>
                {province.name || province.province_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="metro">Metro</SelectItem>
            <SelectItem value="local">Local</SelectItem>
            <SelectItem value="district">District</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("")
            setSelectedProvince("all")
            setSelectedType("all")
          }}
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      {/* Municipalities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMunicipalities.map((municipality, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {municipality.name || municipality.municipality_name || `Municipality ${index + 1}`}
                  </CardTitle>
                  <div className="flex gap-2 mt-1">
                    {municipality.code && (
                      <Badge variant="secondary" className="text-xs">
                        {municipality.code}
                      </Badge>
                    )}
                    {(municipality.type || municipality.municipality_type) && (
                      <Badge variant="outline" className="text-xs">
                        {municipality.type || municipality.municipality_type}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(municipality).map(([key, value]) => (
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

      {filteredMunicipalities.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No municipalities found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  )
}
