"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Database, FileJson } from "lucide-react";
import { useState, useEffect } from "react";

interface Dataset {
  name: string;
  key: string;
  description: string;
  count: number;
  size: string;
}

export default function DownloadPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataModule = await import("@/lib/data-loader");

        const datasetList: Dataset[] = [
          {
            name: "Provinces",
            key: "provinces",
            description: "All South African provinces",
            count: Array.isArray(dataModule.provinces)
              ? dataModule.provinces.length
              : 0,
            size: `${Math.round(
              JSON.stringify(dataModule.provinces).length / 1024
            )}KB`,
          },
          {
            name: "Municipalities",
            key: "municipalities",
            description: "Metropolitan and local municipalities",
            count: Array.isArray(dataModule.municipalities)
              ? dataModule.municipalities.length
              : 0,
            size: `${Math.round(
              JSON.stringify(dataModule.municipalities).length / 1024
            )}KB`,
          },
          {
            name: "Banks",
            key: "banks",
            description: "Financial institutions",
            count: Array.isArray(dataModule.banks)
              ? dataModule.banks.length
              : 0,
            size: `${Math.round(
              JSON.stringify(dataModule.banks).length / 1024
            )}KB`,
          },
          {
            name: "Universities",
            key: "universities",
            description: "Higher education institutions",
            count: Array.isArray(dataModule.universities)
              ? dataModule.universities.length
              : 0,
            size: `${Math.round(
              JSON.stringify(dataModule.universities).length / 1024
            )}KB`,
          },
          {
            name: "Schools",
            key: "schools",
            description: "Primary and secondary schools",
            count: Array.isArray(dataModule.schools)
              ? dataModule.schools.length
              : 0,
            size: `${Math.round(
              JSON.stringify(dataModule.schools).length / 1024
            )}KB`,
          },
          {
            name: "Networks",
            key: "networks",
            description: "Mobile and internet providers",
            count: Array.isArray(dataModule.networks)
              ? dataModule.networks.length
              : 0,
            size: `${Math.round(
              JSON.stringify(dataModule.networks).length / 1024
            )}KB`,
          },
        ];

        setDatasets(datasetList);
        setAllData(dataModule);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDatasetToggle = (datasetKey: string) => {
    setSelectedDatasets((prev) =>
      prev.includes(datasetKey)
        ? prev.filter((key) => key !== datasetKey)
        : [...prev, datasetKey]
    );
  };

  const downloadSelected = () => {
    const selectedData: any = {};
    selectedDatasets.forEach((key) => {
      selectedData[key] = allData[key] || [];
    });

    const dataStr = JSON.stringify(selectedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "za-public-data-selected.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "za-public-data-complete.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadIndividual = (datasetKey: string) => {
    const data = allData[datasetKey] || [];
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${datasetKey}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Download className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading download options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Download South African Public Data
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Download individual datasets or create a custom package with only the
          data you need. All data is provided in JSON format.
        </p>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Bulk Download</h2>
          <div className="flex gap-3">
            <Button onClick={downloadAll} variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Download All Data
            </Button>
            <Button
              onClick={downloadSelected}
              disabled={selectedDatasets.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Selected ({selectedDatasets.length})
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Select specific datasets below or download the complete collection.
        </p>
      </div>

      {/* Individual Datasets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <Card key={dataset.key} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedDatasets.includes(dataset.key)}
                    onCheckedChange={() => handleDatasetToggle(dataset.key)}
                  />
                  <FileJson className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{dataset.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {dataset.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <Badge variant="secondary">{dataset.count} records</Badge>
                  <Badge variant="outline">{dataset.size}</Badge>
                </div>
              </div>
              <Button
                onClick={() => downloadIndividual(dataset.key)}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Usage Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">File Format</h4>
            <p className="text-gray-600">
              All data is provided in JSON format with proper structure and
              validation.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">License</h4>
            <p className="text-gray-600">
              This data is provided under an open license for public use.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Updates</h4>
            <p className="text-gray-600">
              Data is regularly updated to ensure accuracy and completeness.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Support</h4>
            <p className="text-gray-600">
              For questions or issues, please refer to our documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
