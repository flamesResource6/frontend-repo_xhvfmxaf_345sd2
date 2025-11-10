import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import {
  ArrowRight,
  PlayCircle,
  BadgeCheck,
  Users,
  IdCard,
  Calendar,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Lock,
  RefreshCw,
  Bell,
  Eye,
  Check,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Star
} from 'lucide-react'

// Color palette
const BRAND = {
  primary: '#0386D9',
  secondary: '#34D399',
  accent: '#60A5FA',
  warning: '#F59E0B'
}

function useNeonCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return pos
}

function useCountUp(target, start = 0, duration = 1.2) {
  const [value, setValue] = useState(start)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    let raf
    const loop = (t) => {
      const p = Math.min(1, (t - startTime) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(Math.floor(start + (target - start) * eased))
      if (p < 1) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, start, duration])

  return { ref, value, controls }
}

const GlassCard = ({ icon: Icon, title, items }) => (
  <motion.div
    whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(3,134,217,0.25)' }}
    className="relative rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 hover:border-[#0386D9]/40 transition-all duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    <div className="relative z-10">
      <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#0386D9]/10 border border-[#0386D9]/30 text-[#0386D9]">{Icon && <Icon />}</div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-white/80">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#34D399]" /> {it}</li>
        ))}
      </ul>
    </div>
    <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#0386D9]/20 blur-3xl" />
  </motion.div>
)

const ParticleField = React.memo(function ParticleField() {
  const count = 40
  const particles = useMemo(() =>
    new Array(count).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    })), []
  )
  return (
    <svg className="absolute inset-0 w-full h-full">
      {particles.map(p => (
        <circle key={p.id}
          cx={`${p.x}%`} cy={`${p.y}%`} r={p.size}
          className="fill-[#60A5FA]/40">
          <animate attributeName="cy" dur={`${6 + p.delay}s`} values={`${p.y}%;${(p.y+5)%100}%;${p.y}%`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
})

function AnimatedBars() {
  const bars = [60, 30, 80, 45, 70, 55]
  return (
    <div className="flex items-end gap-2 h-24">
      {bars.map((b, i) => (
        <motion.div key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${b}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
          className="w-6 rounded-t bg-gradient-to-t from-[#0386D9] to-[#60A5FA] shadow-[0_10px_30px_rgba(3,134,217,0.35)]"
        />
      ))}
    </div>
  )
}

function MovingPinsMap() {
  const pins = new Array(6).fill(0).map((_, i) => ({ x: 10 + i * 14, y: 30 + (i % 3) * 12 }))
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#0386D9_0%,transparent_40%),radial-gradient(circle_at_80%_60%,#34D399_0%,transparent_40%)]" />
      {pins.map((p, i) => (
        <motion.div key={i}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34D399] shadow-[0_0_15px_#34D399]"
          initial={{ x: `${p.x}%`, y: `${p.y}%` }}
          animate={{
            x: [`${p.x}%`, `${p.x + 6}%`, `${p.x}%`],
            y: [`${p.y}%`, `${p.y - 4}%`, `${p.y}%`]
          }}
          transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const cursorPos = useNeonCursor()

  const stats = [
    { label: 'Visitantes Activos', value: 1247 },
    { label: 'Empresas Confían', value: 15, suffix: '+' },
    { label: 'Uptime', value: 99.9, suffix: '%'}
  ]

  const s1 = useCountUp(stats[0].value)
  const s2 = useCountUp(stats[1].value)
  const s3 = useCountUp(100)

  const [billing, setBilling] = useState('Mensual')

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Custom neon cursor */}
      <div
        style={{ left: cursorPos.x, top: cursorPos.y }}
        className="pointer-events-none fixed z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0386D9]/70 shadow-[0_0_40px_#0386D9]"/>

      {/* Hero */}
      <section className="relative h-[100svh] w-full flex items-center">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 pointer-events-none" />
        <ParticleField />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-8">
          <div className="py-14 md:py-24">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            >
              Control Total de tu Seguridad Corporativa
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-white/80 text-lg md:text-xl"
            >
              Gestiona visitantes, empleados, acceso y seguridad desde una plataforma unificada e inteligente
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0386D9] text-white px-6 py-3 font-semibold shadow-[0_10px_30px_rgba(3,134,217,0.6)] hover:brightness-110 transition">
                Comenzar Ahora <ArrowRight className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 text-white px-6 py-3 font-semibold hover:bg-white/10 transition">
                <PlayCircle className="h-5 w-5" /> Ver Demo en Vivo
              </button>
            </motion.div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
              <div ref={s1.ref} className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-bold">{s1.value.toLocaleString()}</div>
                <div className="text-xs text-white/70">Visitantes Activos</div>
              </div>
              <div ref={s2.ref} className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-bold">{s2.value}+ </div>
                <div className="text-xs text-white/70">Empresas Confían</div>
              </div>
              <div ref={s3.ref} className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-xs text-white/70">Uptime</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-end justify-end pb-12">
            <div className="w-full max-w-md rounded-3xl p-5 backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white/80"><ShieldCheck className="h-5 w-5 text-[#34D399]"/> Sistema</div>
                <div className="text-xs text-white/60">Tiempo real</div>
              </div>
              <AnimatedBars />
              <div className="mt-5"><MovingPinsMap /></div>
              <div className="mt-4 flex items-center gap-2 text-white/80 text-sm"><Bell className="h-4 w-4 text-[#F59E0B]"/> 3 nuevas alertas de acceso</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(3,134,217,0.25),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(52,211,153,0.2),transparent_35%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold"
          >
            Características Principales
          </motion.h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <GlassCard icon={BadgeCheck} title="Gestión de Visitantes" items={["Check-in/out automatizado con QR","Notificaciones en tiempo real"]} />
            <GlassCard icon={Users} title="Control de Empleados" items={["Base de datos centralizada","Roles y permisos granulares"]} />
            <GlassCard icon={IdCard} title="Sistema de Tarjetas" items={["Asignación automática e inteligente","Tracking en tiempo real"]} />
            <GlassCard icon={Calendar} title="Gestión de Citas" items={["Agendamiento inteligente","Mapas de ubicación en vivo"]} />
            <GlassCard icon={MessageSquare} title="Chat en Tiempo Real" items={["Comunicación instantánea","Salas por empresa"]} />
            <GlassCard icon={BarChart3} title="Analytics & Reportes" items={["Dashboard interactivo","Métricas en tiempo real"]} />
          </div>
        </div>
      </section>

      {/* Dashboard preview - bento */}
      <section className="relative py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold"
          >
            Vista Previa Interactiva
          </motion.h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div
              className="md:col-span-7 rounded-3xl p-6 bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white/80">Estadísticas</div>
                <div className="flex items-center gap-1 text-[#34D399]"><Star className="h-4 w-4"/>Tiempo real</div>
              </div>
              <div className="mt-6"><AnimatedBars /></div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {["Tasa de acceso","Verificaciones","Incidentes"].map((t,i) => (
                  <div key={i} className="rounded-xl p-4 bg-black/30 border border-white/10">
                    <div className="text-xs text-white/60">{t}</div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i*0.1 }} className="text-2xl font-bold">{Math.round(70+Math.random()*25)}%</motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-5 rounded-3xl p-6 bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white/80">Mapa en Vivo</div>
                <div className="text-xs text-white/60">Sedes</div>
              </div>
              <div className="mt-4"><MovingPinsMap /></div>
              <div className="mt-4 text-sm text-white/80">Visitantes moviéndose entre zonas seguras</div>
            </motion.div>

            <motion.div
              className="md:col-span-4 rounded-3xl p-6 bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 text-white/80"><Bell className="h-4 w-4 text-[#F59E0B]"/> Notificaciones</div>
              <ul className="mt-4 space-y-2 text-sm">
                {['Acceso denegado en Puerta 3','Nuevo visitante registrado','Tarjeta reemitida: Área B'].map((n,i)=>(
                  <motion.li key={i} initial={{ x: -10, opacity: 0 }} whileInView={{ x:0, opacity:1 }} viewport={{ once: true }} transition={{ delay:i*0.1 }} className="p-3 rounded-lg bg-black/30 border border-white/10">{n}</motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="md:col-span-8 rounded-3xl p-6 bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white/80">Actividad Reciente</div>
                <div className="text-xs text-white/60">Últimos 60 min</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {new Array(6).fill(0).map((_,i)=> (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.05 }} className="p-3 rounded-lg bg-black/30 border border-white/10 text-sm text-white/80">Chequeo completado #{1000+i}</motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="relative py-20 bg-[radial-gradient(circle_at_50%_0%,rgba(3,134,217,0.15),transparent_40%)]">
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="text-3xl md:text-5xl font-bold">Seguridad de Nivel Empresarial</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 text-white/80"><Lock className="h-5 w-5"/> Autenticación 2FA con SMS</div>
              <div className="mt-3 flex items-center gap-2 text-white/80"><ShieldCheck className="h-5 w-5"/> Encriptación end-to-end</div>
              <div className="mt-3 flex items-center gap-2 text-white/80"><Bell className="h-5 w-5"/> Notificaciones push en tiempo real</div>
              <div className="mt-3 flex items-center gap-2 text-white/80"><RefreshCw className="h-5 w-5"/> Backups automáticos</div>
              <div className="mt-3 flex items-center gap-2 text-white/80"><Eye className="h-5 w-5"/> Logs de auditoría completos</div>
              <div className="mt-6 flex gap-2 text-xs">
                {['ISO 27001','SOC 2','GDPR Ready'].map((b,i)=>(
                  <span key={i} className="px-3 py-1 rounded-full border border-white/15 bg-white/5">{b}</span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md md:col-span-2">
              <div className="text-white/80">Casos de éxito</div>
              <div className="mt-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                {[{
                  company: 'TechCorp Solutions', quote: 'Reducimos tiempo de check-in en 80%'
                },{
                  company: 'SecureNet Systems', quote: 'Control total de accesos en múltiples sedes'
                },{
                  company: 'BlueShield Corp', quote: 'Visibilidad en tiempo real de toda la operación'
                }].map((c,i)=>(
                  <div key={i} className="min-w-[280px] snap-center rounded-2xl p-5 bg-black/30 border border-white/10">
                    <div className="text-sm text-white/60">{c.company}</div>
                    <div className="mt-2 text-lg">“{c.quote}”</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-white/80">Integraciones</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {['Slack','Google Calendar','Microsoft Teams','Zoom'].map((x,i)=>(
                  <div key={i} className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 hover:border-[#0386D9]/40 transition">{x}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-3xl md:text-5xl font-bold">Precios flexibles</h2>
            <div className="flex items-center gap-2 text-sm">
              <button onClick={()=>setBilling('Mensual')} className={`px-3 py-1.5 rounded-full border ${billing==='Mensual'?'bg-[#0386D9] border-[#0386D9]':'border-white/20'}`}>Mensual</button>
              <button onClick={()=>setBilling('Anual')} className={`px-3 py-1.5 rounded-full border ${billing==='Anual'?'bg-[#0386D9] border-[#0386D9]':'border-white/20'}`}>Anual</button>
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { name:'Starter', price: billing==='Mensual'? '$49' : '$39', desc:'Para equipos pequeños'},
              { name:'Professional', price: billing==='Mensual'? '$99' : '$79', desc:'Para crecimiento'},
              { name:'Enterprise', price: 'A medida', desc:'Soporte 24/7 y SSO'}
            ].map((t,i)=>(
              <motion.div key={i} whileHover={{ y:-8 }} className="rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-sm text-white/60">{t.name}</div>
                <div className="mt-2 text-4xl font-bold">{t.price}<span className="text-base font-normal text-white/60">{t.price.startsWith('$')? (billing==='Mensual'? '/mes' : '/mes (anual)') : ''}</span></div>
                <div className="mt-2 text-white/80">{t.desc}</div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {['Accesos ilimitados','Reportes avanzados','Soporte prioritario'].map((f,fi)=>(
                    <li key={fi} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#34D399]"/> {f}</li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-xl bg-[#0386D9] px-4 py-2 font-semibold shadow-[0_10px_30px_rgba(3,134,217,0.5)]">Elegir plan</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-gradient-to-b from-black via-black to-[#001320]">
        <div className="absolute inset-0 opacity-50">
          <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold">¿Listo para Transformar tu Seguridad?</h2>
          <p className="mt-3 text-white/80">Sin tarjeta de crédito • Setup en 5 minutos • Soporte 24/7</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex-1 min-w-[240px]">
              <div className="w-full rounded-xl border border-white/20 bg-white/5 p-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-white/60"/>
                <input type="email" required placeholder="Tu email corporativo" className="bg-transparent w-full outline-none placeholder:text-white/50" />
              </div>
            </div>
            <button type="submit" className="rounded-xl bg-[#0386D9] px-6 py-3 font-semibold shadow-[0_10px_30px_rgba(3,134,217,0.6)]">Solicitar Demo</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div>
              <div className="text-2xl font-extrabold">Novack <span className="text-[#0386D9]">Security</span></div>
              <p className="mt-2 text-white/70 max-w-sm">Plataforma unificada para administrar visitantes, empleados y accesos con confianza.</p>
              <div className="mt-4 flex items-center gap-3">
                <a href="#" className="p-2 rounded-lg border border-white/10 hover:border-[#0386D9]/50 transition"><Linkedin className="h-5 w-5"/></a>
                <a href="#" className="p-2 rounded-lg border border-white/10 hover:border-[#0386D9]/50 transition"><Twitter className="h-5 w-5"/></a>
                <a href="#" className="p-2 rounded-lg border border-white/10 hover:border-[#0386D9]/50 transition"><Youtube className="h-5 w-5"/></a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <div className="font-semibold text-white mb-3">Producto</div>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Precios</a></li>
                  <li><a href="#">Demo</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-white mb-3">Empresa</div>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#">Sobre Nosotros</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Blog</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-white mb-3">Recursos</div>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#">Documentación</a></li>
                  <li><a href="#">API</a></li>
                  <li><a href="#">Soporte</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-white mb-3">Legal</div>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#">Privacidad</a></li>
                  <li><a href="#">Términos</a></li>
                  <li><a href="#">Seguridad</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <form className="w-full md:w-auto flex gap-2">
              <input className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 placeholder:text-white/50" placeholder="Tu email" />
              <button className="px-4 py-2 rounded-xl bg-[#0386D9]">Suscribirme</button>
            </form>
            <div className="text-white/60 text-sm">© 2024 Novack Security Platform. Made with ❤️ in Costa Rica 🇨🇷</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
