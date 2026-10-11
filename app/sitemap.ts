import type { MetadataRoute } from 'next'
const url='https://mokayakoubi.vercel.app'
export default function sitemap():MetadataRoute.Sitemap{return [{url,lastModified:new Date(),changeFrequency:'weekly',priority:1},{url:url+'/confidentialite',changeFrequency:'monthly',priority:0.3}]}