import { NextResponse } from "next/server"
import { banks } from "@/lib/data-loader"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const search = searchParams.get("search")

  try {
    let result = [...banks]

    if (code) {
      result = result.filter((bank: any) => bank.code === code)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (bank: any) =>
          bank.name?.toLowerCase().includes(searchLower) ||
          bank.code?.toLowerCase().includes(searchLower) ||
          bank.swift?.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      data: result,
      count: result.length,
      total: banks.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch banks data",
      },
      { status: 500 },
    )
  }
}
