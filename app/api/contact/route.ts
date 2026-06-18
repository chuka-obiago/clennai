import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    if (!process.env.GOOGLE_SCRIPT_URL) {
      console.error("Missing GOOGLE_SCRIPT_URL environment variable.");
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // Forward the data to Google Apps Script
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      // Explicitly follow Google's internal macro routing redirects
      redirect: "follow", 
      body: JSON.stringify(formData),
    });

    const resultText = await response.text();
    let result;
    
    try {
      result = JSON.parse(resultText);
    } catch {
      result = { success: false };
    }

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { success: false, error: "Google Script rejected the entry" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 } 
    );
  }
}