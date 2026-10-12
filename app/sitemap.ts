import type { MetadataRoute } from 'next'
const base='https://mokayakoubi.vercel.app'
const pages=['','ressources','club','projets','conferences','partenariats','journal','confidentialite']
export default function sitemap():MetadataRoute.Sitemap{return pages.map((p,i)=>({url:base+(p?'/'+p:''),lastModified:new Date(),changeFrequency:i===0?'weekly':'monthly',priority:i===0?1:i===7?.2:.8}))}
