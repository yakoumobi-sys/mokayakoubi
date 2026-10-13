import { ImageResponse } from 'next/og'
export const alt='Moka Yakoubi — Les idées prennent vie.'
export const size={width:1200,height:630}
export const contentType='image/png'
export default function OpenGraphImage(){return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',width:'100%',background:'#f4f5ef',color:'#20251e',padding:'60px',fontFamily:'sans-serif'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:38,fontWeight:700}}><span style={{letterSpacing:'-0.06em'}}>moka<span style={{color:'#66803e'}}>.</span></span><span style={{fontSize:18,color:'#62685e'}}>Mohamed Yakoubi · Entrepreneur</span></div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',flexDirection:'column',fontSize:100,fontWeight:700,lineHeight:1,letterSpacing:'-0.065em'}}><span>Les idées</span><span>prennent vie.</span></div><div style={{display:'flex',height:200,width:200,alignItems:'center',justifyContent:'center',borderRadius:100,background:'#d3ef91',fontSize:90}}>↗</div></div>
<div style={{display:'flex',justifyContent:'space-between',fontSize:18,color:'#62685e'}}><span>Construire. Partager. Recommencer.</span><span>mokayakoubi.vercel.app</span></div>
</div>,size)}
