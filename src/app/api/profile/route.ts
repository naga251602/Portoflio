import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const HOSTS: Record<string, (pathname: string, search: URLSearchParams) => boolean> = {
  "codeforces.com": (p, q) => /^\/api\/user\.(info|rating|status)$/.test(p) && Object.keys(Object.fromEntries(q)).every(k => ["handles", "handle"].includes(k)) && /^[a-zA-Z0-9_-]{1,40}$/.test(q.get("handles") || q.get("handle") || ""),
  "atcoder.jp": p => /^\/users\/[a-zA-Z0-9_-]{1,40}\/history\/json$/.test(p),
  "kenkoooo.com": (p,q) => p === "/atcoder/atcoder-api/v3/user/ac_rank" && /^[a-zA-Z0-9_-]{1,40}$/.test(q.get("user") || ""),
  "alfa-leetcode-api.onrender.com": p => /^\/[a-zA-Z0-9_-]{1,40}\/(solved|contest)$/.test(p),
  "github-contributions-api.jogruber.de": (p,q) => /^\/v4\/[a-zA-Z0-9_-]{1,40}$/.test(p) && q.get("y") === "last",
};
const MAX_BYTES = 1_500_000;
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  if (!raw || raw.length > 400) return NextResponse.json({ error:"Invalid URL" }, {status:400});
  let url: URL;
  try { url = new URL(raw); } catch { return NextResponse.json({error:"Invalid URL"}, {status:400}); }
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash || !Object.hasOwn(HOSTS,url.hostname) || !HOSTS[url.hostname](url.pathname,url.searchParams)) {
    return NextResponse.json({error:"Endpoint not permitted"}, {status:403});
  }
  if (url.searchParams.size > 2) return NextResponse.json({error:"Invalid query"}, {status:400});
  try {
    const response = await fetch(url.toString(), { method:"GET", redirect:"error", signal:AbortSignal.timeout(8000), headers:{ Accept:"application/json", "User-Agent":"PortfolioPublicStats/1.0" }, next:{ revalidate:900 } });
    if (!response.ok) return NextResponse.json({error:"Upstream unavailable"},{status:502});
    const size = Number(response.headers.get("content-length") || "0");
    if (size > MAX_BYTES) return NextResponse.json({error:"Response too large"},{status:502});
    const reader = response.body?.getReader();
    if (!reader) return NextResponse.json({error:"Empty response"},{status:502});
    const chunks:Uint8Array[]=[];let total=0;
    while(true){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>MAX_BYTES){await reader.cancel();return NextResponse.json({error:"Response too large"},{status:502});}chunks.push(value);}
    const bytes=new Uint8Array(total);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}
    const obj=JSON.parse(new TextDecoder().decode(bytes));
    return NextResponse.json(obj,{headers:{"Cache-Control":"public, max-age=60, s-maxage=900, stale-while-revalidate=3600"}});
  } catch { return NextResponse.json({error:"Public profile temporarily unavailable"},{status:502}); }
}
