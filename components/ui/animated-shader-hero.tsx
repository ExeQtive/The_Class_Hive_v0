"use client"

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'

interface HeroProps {
    trustBadge?: {
        text: string
        icons?: string[]
    }
    headline: {
        line1: string
        line2: string
    }
    subtitle: string
    buttons?: {
        primary?: {
            text: string
            href?: string
        }
        secondary?: {
            text: string
            href?: string
        }
    }
    className?: string
}

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(3,1,2))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.05,bg*.18,bg*.25),d);
  }
  O=vec4(col,1);
}`

export default function Hero({
    trustBadge,
    headline,
    subtitle,
    buttons,
    className = "",
}: HeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number>()
    const startTimeRef = useRef<number>(Date.now())

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext('webgl2')
        if (!gl) return

        const dpr = Math.max(1, 0.5 * window.devicePixelRatio)

        const resize = () => {
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            gl.viewport(0, 0, canvas.width, canvas.height)
        }

        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            return shader
        }

        const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

        const vs = compileShader(gl.VERTEX_SHADER, vertexSrc)
        const fs = compileShader(gl.FRAGMENT_SHADER, defaultShaderSource)
        const program = gl.createProgram()!
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

        const position = gl.getAttribLocation(program, 'position')
        gl.enableVertexAttribArray(position)
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

        const resolutionLoc = gl.getUniformLocation(program, 'resolution')
        const timeLoc = gl.getUniformLocation(program, 'time')

        resize()
        window.addEventListener('resize', resize)

        const loop = () => {
            const now = (Date.now() - startTimeRef.current) * 0.001
            gl.clearColor(0, 0, 0, 1)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.useProgram(program)
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
            gl.uniform1f(timeLoc, now)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            animationFrameRef.current = requestAnimationFrame(loop)
        }

        loop()

        return () => {
            window.removeEventListener('resize', resize)
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
            gl.deleteProgram(program)
        }
    }, [])

    return (
        <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
            <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
        .fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none"
                style={{ background: 'black' }}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4">
                {trustBadge && (
                    <div className="mb-8 fade-in-down">
                        <div className="flex items-center gap-2 px-6 py-3 bg-teal-500/10 backdrop-blur-md border border-teal-300/30 rounded-full text-sm">
                            {trustBadge.icons?.map((icon, i) => (
                                <span key={i}>{icon}</span>
                            ))}
                            <span className="text-teal-100">{trustBadge.text}</span>
                        </div>
                    </div>
                )}

                <div className="text-center space-y-6 max-w-5xl mx-auto">
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200 bg-clip-text text-transparent fade-in-up delay-200">
                            {headline.line1}
                        </h1>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-cyan-200 bg-clip-text text-transparent fade-in-up delay-400">
                            {headline.line2}
                        </h1>
                    </div>

                    <div className="max-w-3xl mx-auto fade-in-up delay-600">
                        <p className="text-lg md:text-xl lg:text-2xl text-teal-100/90 font-light leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    {buttons && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 fade-in-up delay-800">
                            {buttons.primary?.href && (
                                <Link
                                    href={buttons.primary.href}
                                    className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/25"
                                >
                                    {buttons.primary.text}
                                </Link>
                            )}
                            {buttons.secondary?.href && (
                                <Link
                                    href={buttons.secondary.href}
                                    className="px-8 py-4 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-300/30 hover:border-teal-300/50 text-teal-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                >
                                    {buttons.secondary.text}
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}