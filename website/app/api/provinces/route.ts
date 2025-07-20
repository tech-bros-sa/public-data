import { NextResponse } from "next/server"
import { provinces } from "@/lib/data-loader"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const search = searchParams.get("search")

  try {
    let result = [...provinces]

    if (code) {
      result = result.filter((province: any) => province.code === code)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (province: any) =>
          province.name?.toLowerCase().includes(searchLower) || province.code?.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      data: result,
      count: result.length,
      total: provinces.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch provinces data",
      },
      { status: 500 },
    )
  }
}
