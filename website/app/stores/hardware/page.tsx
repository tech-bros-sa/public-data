"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Wrench, MapPin, Phone, Globe } from "lucide-react"
import { hardwareStores } from "@/lib/data-loader"

export default function HardwareStoresPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStores = useMemo(() => {
    if (!searchTerm) return hardwareStores
    return hardwareStores.filter((store: any) =>
      Object.values(store).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [searchTerm])

  const downloadJSON = () => {
    const dataStr = JSON.stringify(filteredStores, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `hardware-stores-${new Date().toISOString().split("T")[0]}.json`
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Wrench className="h-8 w-8 text-orange-600" />
          <h1 className="text-4xl font-bold">Hardware Stores</h1>
        </div>
        <p className="text-xl text-muted-foreground mb-6">Directory of hardware stores across South Africa.</p>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search hardware stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={downloadJSON} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredStores.length} of {hardwareStores.length} hardware stores
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store: any, index: number) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 line-clamp-2">{store.name || "Unknown Hardware Store"}</CardTitle>
                  <Badge className="bg-orange-100 text-orange-800">
                    <Wrench className="h-3 w-3 mr-1" />
                    Hardware
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Location */}
                {(store.location || store.address || store.city) && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {store.location || store.address || store.city}
                    </span>
                  </div>
                )}

                {/* Phone */}
                {(store.phone || store.tel || store.telephone) && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-muted-foreground">{store.phone || store.tel || store.telephone}</span>
                  </div>
                )}

                {/* Website */}
                {(store.website || store.url) && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <a
                      href={store.website || store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {store.website || store.url}
                    </a>
                  </div>
                )}

                {/* Other properties */}
                {Object.entries(store).map(([key, value]) => {
                  if (
                    ["name", "location", "address", "city", "phone", "tel", "telephone", "website", "url"].includes(
                      key,
                    ) ||
                    !value
                  )
                    return null
                  return (
                    <div key={key} className="text-sm">
                      <span className="font-medium capitalize">{key.replace(/_/g, " ")}:</span>{" "}
                      <span className="text-muted-foreground">
                        {typeof value === "object" ? JSON.stringify(value) : value.toString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No hardware stores found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  )
}
