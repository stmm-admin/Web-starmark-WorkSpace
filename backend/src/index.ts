// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi } /* : { strapi: Core.Strapi } */) {
    const projectsPageUID = 'api::projects-page.projects-page';
    const projectUID = 'api::project.project';

    const projectsPageType = strapi.contentType(projectsPageUID);
    const projectType = strapi.contentType(projectUID);

    if (!projectsPageType || !projectType) {
      return;
    }

    const isProjectsPageLocalized = Boolean(projectsPageType.pluginOptions?.i18n?.localized);
    const isProjectLocalized = Boolean(projectType.pluginOptions?.i18n?.localized);

    const pageSeeds = {
      th: {
        meta_text: 'PROJECT SHOWCASE',
        title_text: 'โครงการตัวอย่าง',
        description_text: 'ตัวอย่างผลงานออกแบบและติดตั้งเฟอร์นิเจอร์สำนักงานสำหรับองค์กรชั้นนำ',
      },
      en: {
        meta_text: 'PROJECT SHOWCASE',
        title_text: 'Featured Projects',
        description_text: 'A curated selection of completed office workspace projects for leading organizations.',
      },
    };

    const projectSeeds = {
      th: [
        {
          sort_order: 1,
          year: '2025',
          type: 'EXECUTIVE SUITE',
          name: 'SCB Head Office',
          description: 'ออกแบบและติดตั้งห้องทำงานผู้บริหารระดับสูงด้วยชุด KERUI Executive Desk พร้อมเก้าอี้ TERENCE',
          tags: [{ label: 'KERUI Executive Desk' }, { label: 'TERENCE Chair' }],
        },
        {
          sort_order: 2,
          year: '2025',
          type: 'OPEN OFFICE',
          name: 'True Corporation',
          description: 'จัดพื้นที่ทำงาน Open Plan ขนาดใหญ่ด้วยชุด YOUMO Workstation สำหรับทีมงาน 200 คน',
          tags: [{ label: 'YOUMO Workstation' }, { label: 'F2311 Chair' }],
        },
        {
          sort_order: 3,
          year: '2024',
          type: 'BOARDROOM',
          name: 'Kasikorn Bank',
          description: 'ออกแบบห้องประชุมหรูครบชุดระดับ Ultra Luxury ด้วยโต๊ะประชุม KERUI ขนาด 4000mm',
          tags: [{ label: 'KERUI Meeting Table' }, { label: 'F2311 Chair' }],
        },
        {
          sort_order: 4,
          year: '2024',
          type: 'EXECUTIVE FLOOR',
          name: 'PTT Group',
          description: 'ตกแต่งชั้นผู้บริหารทั้งชั้นด้วยชุด AITE Executive Desk และเก้าอี้ BERGEN',
          tags: [{ label: 'AITE Executive Desk' }, { label: 'BERGEN Chair' }],
        },
        {
          sort_order: 5,
          year: '2024',
          type: 'CONFERENCE CENTER',
          name: 'Siam Piwat',
          description: 'ออกแบบศูนย์การประชุมขนาดใหญ่ด้วยโต๊ะประชุม AITE และ KERUI หลายห้อง',
          tags: [{ label: 'AITE Meeting Table' }, { label: 'KERUI Meeting Table' }],
        },
        {
          sort_order: 6,
          year: '2023',
          type: 'CORPORATE HQ',
          name: 'CP Group',
          description: 'ออกแบบสำนักงานใหญ่ครบวงจร ตั้งแต่พื้นที่ผู้บริหารจนถึงพื้นที่ทำงานทั่วไป',
          tags: [{ label: 'KERUI' }, { label: 'AITE' }, { label: 'YOUMO' }, { label: 'MATT' }],
        },
      ],
      en: [
        {
          sort_order: 1,
          year: '2025',
          type: 'EXECUTIVE SUITE',
          name: 'SCB Head Office',
          description: 'Premium executive office design with KERUI Executive Desk and TERENCE Chair.',
          tags: [{ label: 'KERUI Executive Desk' }, { label: 'TERENCE Chair' }],
        },
        {
          sort_order: 2,
          year: '2025',
          type: 'OPEN OFFICE',
          name: 'True Corporation',
          description: 'Large open-plan workspace with YOUMO Workstation setup for 200 staff members.',
          tags: [{ label: 'YOUMO Workstation' }, { label: 'F2311 Chair' }],
        },
        {
          sort_order: 3,
          year: '2024',
          type: 'BOARDROOM',
          name: 'Kasikorn Bank',
          description: 'Ultra luxury boardroom with a full KERUI meeting table setup (4000mm).',
          tags: [{ label: 'KERUI Meeting Table' }, { label: 'F2311 Chair' }],
        },
        {
          sort_order: 4,
          year: '2024',
          type: 'EXECUTIVE FLOOR',
          name: 'PTT Group',
          description: 'Executive floor fit-out with AITE Executive Desk and BERGEN chair series.',
          tags: [{ label: 'AITE Executive Desk' }, { label: 'BERGEN Chair' }],
        },
        {
          sort_order: 5,
          year: '2024',
          type: 'CONFERENCE CENTER',
          name: 'Siam Piwat',
          description: 'Conference center design featuring multiple AITE and KERUI meeting rooms.',
          tags: [{ label: 'AITE Meeting Table' }, { label: 'KERUI Meeting Table' }],
        },
        {
          sort_order: 6,
          year: '2023',
          type: 'CORPORATE HQ',
          name: 'CP Group',
          description: 'Corporate HQ workspace design from executive offices to open collaboration zones.',
          tags: [{ label: 'KERUI' }, { label: 'AITE' }, { label: 'YOUMO' }, { label: 'MATT' }],
        },
      ],
    };

    const locales = ['th', 'en'] as const;

    for (const locale of locales) {
      const pageLocale = isProjectsPageLocalized ? locale : undefined;
      const existingPage = await strapi.documents(projectsPageUID).findFirst({
        ...(pageLocale ? { locale: pageLocale } : {}),
      });

      if (!existingPage) {
        await strapi.documents(projectsPageUID).create({
          data: pageSeeds[locale],
          ...(pageLocale ? { locale: pageLocale } : {}),
          status: 'published',
        });
      }

      const projectLocale = isProjectLocalized ? locale : undefined;
      const existingProject = await strapi.documents(projectUID).findFirst({
        ...(projectLocale ? { locale: projectLocale } : {}),
      });

      if (!existingProject) {
        for (const item of projectSeeds[locale]) {
          await strapi.documents(projectUID).create({
            data: item,
            ...(projectLocale ? { locale: projectLocale } : {}),
            status: 'published',
          });
        }
      }
    }
  },
};
