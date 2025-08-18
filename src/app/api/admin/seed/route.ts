import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  await sql/* sql */`
    INSERT INTO products
      (slug,name,short,description,cover,category,price_cents,period_text,stock,sold,active)
    VALUES
      ('chatgpt-plus','ChatGPT Plus','دردشة AI بريميوم','مقعد شهر واحد',
        'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg','ai',550,'/month',25,26869,true),
      ('disney-plus','Disney+','Disney/Marvel/Pixar','3 أشهر',
        'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg','media',398,'/3 months',12,10068,true),
      ('netflix-uhd','Netflix UHD','4K HDR','شهر واحد',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg','media',1129,'/month',18,15512,true),
      ('spotify-premium','Spotify Premium','موسيقى بلا إعلانات','6 أشهر',
        'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg','media',1499,'/6 months',30,8513,true)
    ON CONFLICT (slug) DO NOTHING;
  `;
  return NextResponse.json({ ok: true, step: "seed done" });
}
