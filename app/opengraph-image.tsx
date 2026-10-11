import { ImageResponse } from 'next/og'
export const alt = '1% CLUB — Build Different. By Moka.'
export const size = {width:1200,height:630}
export const contentType='image/png'
export default function OpenGraphImage(){ return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',width:'100%',background:'#0b0c0c',color:'#f3f1e9',padding:'65px',fontFamily:'sans-serif'}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:22,letterSpacing:'0.22em'}}><span>1% CLUB.</span><span style={{color:'#a8a9a3',fontSize:18}}>FOUNDERS CIRCLE / ALGIERS</span></div>
  <div style={{display:'flex',flexDirection:'column',fontSize:116,fontWeight:800,lineHeight:0.95,letterSpacing:'-0.07em'}}><span>BUILT FOR</span><span>THE 1%.</span></div>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:20,letterSpacing:'0.12em',color:'#b5b5af'}}><span>BUILD DIFFERENT.</span><span>BY MOKA YAKOUBI ↗</span></div>
</div>,size) }