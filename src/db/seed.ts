import { sql } from "@vercel/postgres";
async function run() {
  await sql`insert into products (slug,name,short,description,cover,category,price_cents,period_text,stock,sold,active)
  values
  ('chatgpt-plus','ChatGPT Plus','دردشة AI بريميوم','مقعد شهر واحد','https://cdn-icons-png.flaticon.com/512/4712/4712109.png','ai',550,'/month',25,26869,true),
  ('disney-plus','Disney+','Disney/Marvel/Pixar','3 أشهر','https://cdn-icons-png.flaticon.com/512/3670/3670403.png','media',398,'/3 months',12,10068,true),
  ('netflix-uhd','Netflix UHD','4K HDR','شهر واحد','https://cdn-icons-png.flaticon.com/512/732/732228.png','media',1129,'/month',18,15512,true),
  ('spotify-premium','Spotify Premium','موسيقى بلا إعلانات','6 أشهر','https://cdn-icons-png.flaticon.com/512/3670/3670225.png','media',1499,'/6 months',30,8513,true)
  on conflict (slug) do nothing;`;
  console.log("Seed done");
}
run();
