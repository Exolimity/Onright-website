import { CtaBand } from '../components/sections/CtaBand'
import { ProjectList } from '../components/sections/ProjectList'
import { PageHeader } from '../components/ui/PageHeader'
import { Seo } from '../components/ui/Seo'
import { useMessages } from '../i18n'

export function WorkPage() {
  const t = useMessages()

  return (
    <>
      <Seo title={t.work.title} description={t.work.description} />

      <PageHeader label={t.work.header.label} title={t.work.header.title}>
        <p>{t.work.header.body}</p>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <ProjectList projects={t.work.projects} showInvite />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
