import { ImageResponse } from 'next/og'
export const size = {width:64,height:64}
export const contentType = 'image/png'
export default function Icon(){return new ImageResponse(<div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',background:'#0b0b0b',color:'#e9e7df',fontSize:31,fontWeight:800,letterSpacing:'-0.09em',fontFamily:'sans-serif'}}>1%</div>,size)}