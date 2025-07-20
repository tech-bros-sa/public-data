import { NextResponse } from "next/server"
import { municipalities } from "@/lib/data-loader"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const province = searchParams.get("province")
  const type = searchParams.get("type")
  const search = searchParams.get("search")

  try {
    let result = [...municipalities]

    if (province) {
      result = result.filter((municipality: any) => municipality.province === province)
    }

    if (type) {
      result = result.filter((municipality: any) => municipality.type === type)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (municipality: any) =>
          municipality.name?.toLowerCase().includes(searchLower) ||
          municipality.code?.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      data: result,
      count: result.length,
      total: municipalities.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch municipalities data",
      },
      { status: 500 },
    )
  }
}
