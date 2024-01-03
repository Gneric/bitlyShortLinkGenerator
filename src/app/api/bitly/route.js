import { NextResponse } from "next/server";

export async function POST(req) {
  const { inputValue } = await req.json()

  const res = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer 872e77796545c051a3b6540052d3eb54e7d3cfbb`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ long_url: inputValue }),
  }) 
  const data = await res.json()
 
  return Response.json(data)
}