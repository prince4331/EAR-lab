export function TrustStrip() {
  const partners = [
    { name: 'TechCorp', logo: '/partners/techcorp.svg' },
    { name: 'InnoLabs', logo: '/partners/innolabs.svg' },
    { name: 'RoboticsX', logo: '/partners/roboticsx.svg' },
    { name: 'AutoTech', logo: '/partners/autotech.svg' },
    { name: 'FutureAI', logo: '/partners/futureai.svg' },
    { name: 'SmartSys', logo: '/partners/smartsys.svg' },
    { name: 'DataFlow', logo: '/partners/dataflow.svg' },
    { name: 'CloudBot', logo: '/partners/cloudbot.svg' }
  ]

  return (
    <section className="relative overflow-hidden py-20 border-y border-white/10 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#02050c] via-[#05132c] to-[#02040a]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"220\" height=\"220\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 220 220\"%3E%3Cg fill=\"none\" stroke=\"%230F62FE\" stroke-width=\"0.35\" opacity=\"0.35\"%3E%3Cpath d=\"M0 55h220M0 110h220M0 165h220M55 0v220M110 0v220M165 0v220\"/%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="container relative z-10 px-4">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60 mb-4">Partners</p>
          <h3 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Trusted by leading labs and advanced manufacturing teams
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 py-4 px-3 text-center text-white/80 text-sm font-semibold tracking-wide backdrop-blur-xl transition-all duration-200 hover:border-cyber-teal/70 hover:text-white hover:shadow-[0_0_25px_rgba(0,194,168,0.3)]"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
