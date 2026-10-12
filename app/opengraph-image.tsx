import { ImageResponse } from 'next/og'
export const alt='Moka Yakoubi — Entrepreneur, Creator, Builder.'
export const size={width:1200,height:630}
export const contentType='image/png'
export default function OpenGraphImage(){return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',width:'100%',background:'#0b0e0c',color:'#f4f6ef',padding:'62px',fontFamily:'sans-serif'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:23,fontWeight:800}}><span style={{letterSpacing:'-0.07em'}}>MOKA<span style={{color:'#c9f17f'}}>.</span></span><span style={{fontSize:15,letterSpacing:'.16em',color:'#9fa79f'}}>FOUNDER / CREATOR / BUILDER</span></div>
<div style={{display:'flex',flexDirection:'column',fontSize:102,fontWeight:850,lineHeight:.95,letterSpacing:'-.075em'}}><span>I DON&apos;T JUST</span><span>TALK BUSINESS.</span><span style={{color:'#c9f17f'}}>I BUILD IT.</span></div>
<div style={{display:'flex',justifyContent:'space-between',fontSize:17,letterSpacing:'.12em',color:'#b5bfb3'}}><span>BUILT IN ALGERIA 🇩🇿</span><span>MOKAYAKOUBI.VERCEL.APP ↗</span></div>
</div>,size)}
