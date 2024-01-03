import { NextResponse } from "next/server";

export async function POST(req) {
  const { inputValue } = await req.json()

  const res = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${process.env.BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ long_url: inputValue }),
  }) 
  const data = await res.json()
 
  return Response.json(data)
}