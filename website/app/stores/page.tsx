"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Store, ShoppingBag, Wrench, Shield } from "lucide-react"
import Link from "next/link"
import { hardwareStores, clothingStores, supermarkets, insuranceStores } from "@/lib/data-loader"

export default function StoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Combine all stores with category labels
  const allStores = useMemo(() => {
    const stores = [
      ...hardwareStores.map((store: any) => ({ ...store, category: "hardware" })),
      ...clothingStores.map((store: any) => ({ ...store, category: "clothing" })),
      ...supermarkets.map((store: any) => ({ ...store, category: "supermarket" })),
      ...insuranceStores.map((store: any) => ({ ...store, category: "insurance" })),
    ]
    return stores
  }, [])

  const filteredStores = useMemo(() => {
    return allStores.filter((store) => {
      const matchesSearch =
        searchTerm === "" ||
        Object.values(store).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || store.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [allStores, searchTerm, selectedCategory])

  const downloadJSON = () => {
    const dataStr = JSON.stringify(filteredStores, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `stores-${selectedCategory}-${new Date().toISOString().split("T")[0]}.json`
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hardware":
        return <Wrench className="h-4 w-4" />
      case "clothing":
        return <ShoppingBag className="h-4 w-4" />
      case "supermarket":
        return <Store className="h-4 w-4" />
      case "insurance":
        return <Shield className="h-4 w-4" />
      default:
        return <Store className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hardware":
        return "bg-orange-100 text-orange-800"
      case "clothing":
        return "bg-purple-100 text-purple-800"
      case "supermarket":
        return "bg-green-100 text-green-800"
      case "insurance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">South African Stores</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Browse stores across different categories including hardware, clothing, supermarkets, and insurance.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link href="/stores/hardware">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Wrench className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{hardwareStores.length}</div>
                <div className="text-sm text-muted-foreground">Hardware Stores</div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/stores/clothing">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{clothingStores.length}</div>
                <div className="text-sm text-muted-foreground">Clothing Stores</div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/stores/supermarkets">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Store className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{supermarkets.length}</div>
                <div className="text-sm text-muted-foreground">Supermarkets</div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/stores/insurance">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{insuranceStores.length}</div>
                <div className="text-sm text-muted-foreground">Insurance Stores</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hardware">Hardware Stores</SelectItem>
              <SelectItem value="clothing">Clothing Stores</SelectItem>
              <SelectItem value="supermarket">Supermarkets</SelectItem>
              <SelectItem value="insurance">Insurance Stores</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={downloadJSON} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredStores.length} of {allStores.length} stores
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 line-clamp-2">{store.name || "Unknown Store"}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(store.category)}>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(store.category)}
                        {store.category}
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {/* Display all available properties */}
                {Object.entries(store).map(([key, value]) => {
                  if (key === "category" || key === "name" || !value) return null
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
          <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No stores found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  )
}
