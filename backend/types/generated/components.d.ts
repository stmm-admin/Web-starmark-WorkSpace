import type { Schema, Struct } from '@strapi/strapi';

export interface HeroVideoHero extends Struct.ComponentSchema {
  collectionName: 'components_hero_video_heroes';
  info: {
    description: 'The main hero section with a looping background video';
    displayName: 'Hero Video (\u0E41\u0E1A\u0E19\u0E40\u0E19\u0E2D\u0E23\u0E4C\u0E27\u0E34\u0E14\u0E35\u0E42\u0E2D\u0E2B\u0E25\u0E31\u0E01)';
  };
  attributes: {
    hero_video: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    poster_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'Call to Action (\u0E1B\u0E38\u0E48\u0E21\u0E01\u0E14\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07\u0E2A\u0E38\u0E14)';
  };
  attributes: {
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsFeatured extends Struct.ComponentSchema {
  collectionName: 'components_sections_featureds';
  info: {
    displayName: 'Featured (\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E40\u0E14\u0E48\u0E19)';
  };
  attributes: {
    meta: Schema.Attribute.String;
    title: Schema.Attribute.String;
    view_all_link: Schema.Attribute.String;
    view_all_text: Schema.Attribute.String;
  };
}

export interface SectionsPhilosophy extends Struct.ComponentSchema {
  collectionName: 'components_sections_philosophies';
  info: {
    description: 'Philosophy section with a CTA';
    displayName: 'Philosophy (\u0E2B\u0E25\u0E31\u0E01\u0E1B\u0E23\u0E31\u0E0A\u0E0D\u0E32)';
  };
  attributes: {
    cta_link: Schema.Attribute.String;
    cta_text: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPhilosophyCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_philosophy_cards';
  info: {
    description: 'Individual philosophy item';
    displayName: 'philosophy_card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProjectTag extends Struct.ComponentSchema {
  collectionName: 'components_sections_project_tags';
  info: {
    description: 'Tag for project card';
    displayName: 'project_tag';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStory extends Struct.ComponentSchema {
  collectionName: 'components_sections_stories';
  info: {
    description: 'Brand story configuration';
    displayName: 'Story (\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E23\u0E32\u0E27\u0E41\u0E1A\u0E23\u0E19\u0E14\u0E4C)';
  };
  attributes: {
    description_1: Schema.Attribute.Text;
    description_2: Schema.Attribute.Text;
    meta: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_timeline_items';
  info: {
    description: 'Company history timeline item';
    displayName: 'timeline_item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface SectionsVision extends Struct.ComponentSchema {
  collectionName: 'components_sections_visions';
  info: {
    description: 'Vision and statement';
    displayName: 'vision';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    meta: Schema.Attribute.String;
    statement: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero-video.hero': HeroVideoHero;
      'sections.cta': SectionsCta;
      'sections.featured': SectionsFeatured;
      'sections.philosophy': SectionsPhilosophy;
      'sections.philosophy-card': SectionsPhilosophyCard;
      'sections.project-tag': SectionsProjectTag;
      'sections.story': SectionsStory;
      'sections.timeline-item': SectionsTimelineItem;
      'sections.vision': SectionsVision;
    }
  }
}
