import { ImageResponse } from "next/og";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){return new ImageResponse(<div style={{background:"#121214",color:"#f2f2f3",width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:90}}><div style={{color:"#e8a87c",fontSize:28,marginBottom:35}}>SOFTWARE ENGINEER · USC</div><div style={{fontSize:90,fontWeight:700,letterSpacing:-3}}>Gaurav N.V.</div><div style={{fontSize:34,color:"#8fb0c8",marginTop:24}}>Full Stack · Backend · Data Engineering</div></div>,size);}
