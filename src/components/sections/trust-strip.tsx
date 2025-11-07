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
    <section className="py-16 bg-background border-y">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-3">
            Trusted by Leading Companies & Research Institutions
          </h3>
          <p className="text-muted-foreground">
            Partnering with innovators across robotics, automotive, and technology sectors
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-24 h-12 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Join 50+ companies leveraging our expertise for their robotics initiatives
          </p>
        </div>
      </div>
    </section>
  )
}