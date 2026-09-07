import { Hero } from '@/components/hero'
import { StartHere } from '@/components/start-here'
import { FeaturedProject } from '@/components/featured-project'
import { Learn } from '@/components/learn'
import { Building } from '@/components/building'
import { Proof } from '@/components/proof'
import { Tools } from '@/components/tools'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { projects } from '@/config/site'

export default function Home() {
  const featured = projects.filter((project) => project.featured)

  return (
    <>
      <main>
        <Hero />
        <StartHere />

        {featured.map((project, index) => (
          <FeaturedProject key={project.id} project={project} index={index} />
        ))}

        <Learn />
        <Building />
        <Proof />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
