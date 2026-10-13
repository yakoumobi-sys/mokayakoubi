'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [{href:'/#about',label:'Mon histoire'},{href:'/ressources',label:'Apprendre'},{href:'/projets',label:'Projets'},{href:'/club',label:'Le club'},{href:'/conferences',label:'Conférences'}]

export function Navigation() {
  const [open,setOpen]=useState(false)
  const path=usePathname()
  const button=useRef<HTMLButtonElement>(null)
  useEffect(()=>setOpen(false),[path])
  useEffect(()=>{
    if(!open)return
    const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);button.current?.focus()}}
    document.addEventListener('keydown',close)
    return ()=>document.removeEventListener('keydown',close)
  },[open])
  return <><button ref={button} className="mk-menu-toggle" aria-expanded={open} aria-controls="moka-navigation" onClick={()=>setOpen(!open)} aria-label={open?'Fermer le menu':'Ouvrir le menu'}><span/ ><span/ ></button><nav id="moka-navigation" className={'mk-nav'+(open?' is-open':'')} aria-label="Navigation principale">{links.map(link=><Link key={link.href} href={link.href} aria-current={path===link.href?'page':undefined} onClick={()=>setOpen(false)}>{link.label}</Link>)}</nav></>
}

export function Experience() {
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)')
    if(media.matches)return
    const observed=document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    }),{threshold:0.08})
    observed.forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('will-reveal');observer.observe(el)}})
    let raf=0
    const update=()=>{raf=0;document.documentElement.style.setProperty('--mk-progress',String(window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight)))}
    const scroll=()=>{if(!raf)raf=requestAnimationFrame(update)}
    update();window.addEventListener('scroll',scroll,{passive:true})
    return ()=>{observer.disconnect();cancelAnimationFrame(raf);window.removeEventListener('scroll',scroll);observed.forEach(el=>el.classList.remove('will-reveal'))}
  },[])
  return <div className="mk-reading-progress" aria-hidden="true"/>
}

// Deferred below the fold. The static illustration remains usable without WebGL.
export function FounderSculpture() {
  const host=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const el=host.current
    if(!el)return
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')
    if(reduced.matches||window.matchMedia('(max-width: 760px)').matches)return
    let cancelled=false, started=false, cleanup=()=>{}
    const observer=new IntersectionObserver(async entries=>{
      if(!entries[0]?.isIntersecting||started)return
      started=true
      try {
        const T=await import('three')
        if(cancelled)return
        const renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.setClearColor(0x000000,0)
        const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,0.1,30)
        camera.position.z=8
        const group=new T.Group()
        const geometry=new T.TorusGeometry(1.45,.22,16,96)
        const material=new T.MeshStandardMaterial({color:0xd6efa5,metalness:.75,roughness:.23})
        for(let i=0;i<3;i++) {const ring=new T.Mesh(geometry,material);ring.rotation.set(i*Math.PI/3,Math.PI/3,i*Math.PI/3);group.add(ring)}
        scene.add(group,new T.HemisphereLight(0xffffff,0x30412a,2))
        const light=new T.DirectionalLight(0xffffff,4);light.position.set(3,3,5);scene.add(light)
        const rim=new T.DirectionalLight(0xadc674,3);rim.position.set(-3,-1,2);scene.add(rim)
        const size=()=>{const {width,height}=el.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix()}
        size();el.appendChild(renderer.domElement);el.classList.add('has-webgl')
        const resize=new ResizeObserver(size);resize.observe(el)
        let raf=0,visible=true,last=0,angle=0,x=0,y=0
        const render=(time:number)=>{
          if(!visible||document.hidden)return
          const dt=last?Math.min((time-last)/1000,.05):0;last=time;angle+=dt*.13
          group.rotation.y=angle+x*.28;group.rotation.x=.3+y*.2;renderer.render(scene,camera)
          raf=requestAnimationFrame(render)
        }
        const resume=()=>{cancelAnimationFrame(raf);last=0;if(visible&&!document.hidden)raf=requestAnimationFrame(render)}
        const visibility=new IntersectionObserver(list=>{visible=list[0].isIntersecting;resume()});visibility.observe(el)
        const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();x=(e.clientX-r.left)/r.width-.5;y=(e.clientY-r.top)/r.height-.5}
        el.addEventListener('pointermove',move);document.addEventListener('visibilitychange',resume)
        const lose=(e:Event)=>{e.preventDefault();visible=false;cancelAnimationFrame(raf);el.classList.remove('has-webgl')}
        renderer.domElement.addEventListener('webglcontextlost',lose)
        cleanup=()=>{cancelAnimationFrame(raf);resize.disconnect();visibility.disconnect();el.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',resume);renderer.domElement.removeEventListener('webglcontextlost',lose);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();el.classList.remove('has-webgl')}
        if(cancelled)cleanup()
      }catch{ /* Keep the static visual when WebGL is unavailable. */ }
    },{rootMargin:'150px'})
    observer.observe(el)
    return ()=>{cancelled=true;observer.disconnect();cleanup()}
  },[])
  return <div ref={host} className="mk-sculpture" aria-hidden="true"><div className="mk-orbit-fallback"><i/><i/><i/></div><span className="mk-sculpture-caption">Les bonnes connexions.<br/>Les bonnes ambitions.</span></div>
}
