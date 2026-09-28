import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const submittedAt = new Date().toISOString();

    const res = await fetch(process.env.RESTDB_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": process.env.RESTDB_API_KEY!,
      },
      body: JSON.stringify({
        ...body,
        submittedAt,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "RestDB error", details: errorText },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
