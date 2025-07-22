"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Database,
  MapPin,
  Building2,
  Landmark,
  GraduationCap,
  Store,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataCategory {
  title: string;
  description: string;
  icon: any;
  count: number;
  href: string;
  color: string;
}

export default function HomePage() {
  const [dataCategories, setDataCategories] = useState<DataCategory[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data on client side to avoid SSR issues
    const loadData = async () => {
      try {
        const {
          provinces,
          municipalities,
          banks,
          universities,
          schools,
          networks,
          hardwareStores,
          clothingStores,
          supermarkets,
          insuranceStores,
          pepPaxiCodes,
        } = await import("@/lib/data-loader");

        const categories: DataCategory[] = [
          {
            title: "Provinces",
            description:
              "All South African provinces with detailed information",
            icon: MapPin,
            count: Array.isArray(provinces) ? provinces.length : 0,
            href: "/provinces",
            color: "bg-blue-500",
          },
          {
            title: "Municipalities",
            description: "Metropolitan, district, and local municipalities",
            icon: Building2,
            count: Array.isArray(municipalities) ? municipalities.length : 0,
            href: "/municipalities",
            color: "bg-green-500",
          },
          {
            title: "Banks",
            description: "Financial institutions with codes and details",
            icon: Landmark,
            count: Array.isArray(banks) ? banks.length : 0,
            href: "/banks",
            color: "bg-purple-500",
          },
          {
            title: "Universities",
            description: "Higher education institutions",
            icon: GraduationCap,
            count: Array.isArray(universities) ? universities.length : 0,
            href: "/universities",
            color: "bg-orange-500",
          },
          {
            title: "Schools",
            description: "Primary and secondary schools",
            icon: GraduationCap,
            count: Array.isArray(schools) ? schools.length : 0,
            href: "/schools",
            color: "bg-yellow-500",
          },
          {
            title: "Networks",
            description: "Mobile and internet service providers",
            icon: Wifi,
            count: Array.isArray(networks) ? networks.length : 0,
            href: "/networks",
            color: "bg-cyan-500",
          },
          {
            title: "Hardware Stores",
            description: "Hardware and building supply retailers",
            icon: Store,
            count: Array.isArray(hardwareStores) ? hardwareStores.length : 0,
            href: "/stores/hardware",
            color: "bg-red-500",
          },
          {
            title: "Clothing Stores",
            description: "Fashion and apparel retail chains",
            icon: Store,
            count: Array.isArray(clothingStores) ? clothingStores.length : 0,
            href: "/stores/clothing",
            color: "bg-pink-500",
          },
          {
            title: "Supermarkets",
            description: "Grocery and retail chains",
            icon: Store,
            count: Array.isArray(supermarkets) ? supermarkets.length : 0,
            href: "/stores/supermarkets",
            color: "bg-emerald-500",
          },
          {
            title: "Insurance Stores",
            description: "Insurance providers and brokers",
            icon: Store,
            count: Array.isArray(insuranceStores) ? insuranceStores.length : 0,
            href: "/stores/insurance",
            color: "bg-indigo-500",
          },
          {
            title: "Pep Paxi Codes",
            description: "Pep Store codes for parcel collection",
            icon: Store,
            count: Array.isArray(pepPaxiCodes) ? pepPaxiCodes.length : 0,
            href: "/pep-paxi",
            color: "bg-indigo-500",
          },
        ];

        setDataCategories(categories);
        setTotalRecords(
          categories.reduce((sum, category) => sum + category.count, 0)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="lg:flex space-y-4 lg:space-y-0 items-center justify-between ">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ZA Public Data
                </h1>
                <p className="text-sm text-gray-600">
                  South African Public Dataset Explorer
                </p>
              </div>
            </div>
            <div className="flex lg:bg-inherit justify-between lg:justify-normal items-center gap-4">
              <Badge variant="outline" className="text-sm">
                {totalRecords.toLocaleString()} records
              </Badge>
              <Link href="/download">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive South African Public Data
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Access structured, up-to-date information about provinces,
            municipalities, banks, educational institutions, and more. Perfect
            for developers, researchers, and data analysts.
          </p>
        </div>

        {/* Data Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dataCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.title} href={category.href}>
                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count.toLocaleString()}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white rounded-xl border p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Dataset Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {dataCategories.find((c) => c.title === "Provinces")?.count ||
                  0}
              </div>
              <div className="text-sm text-gray-600">Provinces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {dataCategories.find((c) => c.title === "Municipalities")
                  ?.count || 0}
              </div>
              <div className="text-sm text-gray-600">Municipalities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {dataCategories.find((c) => c.title === "Banks")?.count || 0}
              </div>
              <div className="text-sm text-gray-600">Banks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {dataCategories.find((c) => c.title === "Universities")
                  ?.count || 0}
              </div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">
                {dataCategories.find((c) => c.title === "Networks")?.count || 0}
              </div>
              <div className="text-sm text-gray-600">Networks</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
