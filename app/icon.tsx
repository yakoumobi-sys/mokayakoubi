import { ImageResponse } from 'next/og'
export const size={width:64,height:64}
export const contentType='image/png'
export default function Icon(){return new ImageResponse(<div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',background:'#0b0e0c',color:'#c9f17f',fontSize:45,fontWeight:900,letterSpacing:'-.08em',fontFamily:'sans-serif'}}>M</div>,size)}
