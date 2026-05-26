import Image from 'next/image';
import { getProjects, getProjectsPageData, getStrapiMedia } from '@/lib/api';

const FALLBACK_IMAGES: Record<string, string> = {
  'SCB Head Office': 'http://119.59.102.245/uploads/15_acc17a4dcd.JPG',
  'True Corporation': 'http://119.59.102.245/uploads/Workstation_and_Chair_c824bce892.JPG',
  'Kasikorn Bank': 'http://119.59.102.245/uploads/meeting_table_5aa5a510_4566299833.webp',
  'PTT Group': 'http://119.59.102.245/uploads/4_513c874dc5.jfif',
  'Siam Piwat': 'http://119.59.102.245/uploads/223_0bd04644e4.JPG',
  'CP Group': 'http://119.59.102.245/uploads/22_8c4615b898.JPG',
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [pageData, projects] = await Promise.all([
    getProjectsPageData(locale),
    getProjects(locale),
  ]);

  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => Number(b) - Number(a));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mb-20">
          <span className="text-meta font-thai mb-6 block">{pageData?.meta_text || 'PROJECT SHOWCASE'}</span>
          <h1 className="font-thai text-3xl md:text-5xl mb-6">{pageData?.title_text || (locale === 'th' ? 'โครงการตัวอย่าง' : 'Featured Projects')}</h1>
          <p className="text-secondary font-thai text-lg font-light leading-relaxed max-w-2xl">
            {pageData?.description_text || (locale === 'th'
              ? 'ตัวอย่างผลงานออกแบบและติดตั้งเฟอร์นิเจอร์สำนักงานสำหรับองค์กรชั้นนำ'
              : 'A curated selection of completed office workspace projects for leading organizations.')}
          </p>
        </div>

        {/* Projects by year */}
        {years.map((year) => (
          <div key={year} className="mb-24">
            <div className="flex items-center gap-8 mb-12">
              <span className="text-5xl font-serif italic text-primary/20">{year}</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {projects
                .filter((p) => p.year === year)
                .map((project) => {
                  const imgUrl = getStrapiMedia(project.cover_image?.url) || FALLBACK_IMAGES[project.name];
                  return (
                    <div key={project.id} className="group">
                      <div className="relative aspect-[4/3] bg-neutral-50 mb-6 overflow-hidden">
                        {imgUrl ? (
                          <Image
                            src={imgUrl}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-neutral-100" />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>

                      <span className="text-meta text-[9px] mb-2 block">{project.type}</span>
                      <h3 className="text-xl font-serif text-primary mb-3">{project.name}</h3>
                      {project.description && (
                        <p className="text-secondary text-sm font-light leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-widest border border-neutral-200 px-3 py-1 text-secondary">
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-24 bg-neutral-50">
            <p className="text-secondary font-light italic">
              {locale === 'th' ? 'ยังไม่มีโครงการ' : 'No projects available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
