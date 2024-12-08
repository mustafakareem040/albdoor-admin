import type { Schema, Struct } from '@strapi/strapi';

export interface AdditionalAdditionalInformation
  extends Struct.ComponentSchema {
  collectionName: 'components_additional_additional_informations';
  info: {
    description: '';
    displayName: 'Additional Information';
    icon: 'filter';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#ffffff'>;
    fontFamily: Schema.Attribute.Enumeration<
      ['Poppins', 'IBM Plex Sans', 'Quicksand']
    > &
      Schema.Attribute.DefaultTo<'Poppins'>;
    fontWeight: Schema.Attribute.Enumeration<
      ['light', 'normal', 'medium', 'semibold', 'bold', 'black']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
  };
}

export interface ContentContent extends Struct.ComponentSchema {
  collectionName: 'components_content_contents';
  info: {
    description: '';
    displayName: 'Content';
    icon: 'underline';
  };
  attributes: {
    editor: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    order: Schema.Attribute.Component<'order.order', false> &
      Schema.Attribute.Required;
  };
}

export interface NavbarItems extends Struct.ComponentSchema {
  collectionName: 'components_navbar_items';
  info: {
    description: '';
    displayName: 'items';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    props: Schema.Attribute.Component<
      'additional.additional-information',
      false
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface OrderOrder extends Struct.ComponentSchema {
  collectionName: 'components_order_orders';
  info: {
    displayName: 'order';
    icon: 'hashtag';
  };
  attributes: {
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ServicesServices extends Struct.ComponentSchema {
  collectionName: 'components_services_services';
  info: {
    displayName: 'services';
    icon: 'cog';
  };
  attributes: {
    additional: Schema.Attribute.Component<
      'additional.additional-information',
      false
    >;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SocialSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_social_social_medias';
  info: {
    displayName: 'social-media';
    icon: 'apps';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'additional.additional-information': AdditionalAdditionalInformation;
      'content.content': ContentContent;
      'navbar.items': NavbarItems;
      'order.order': OrderOrder;
      'services.services': ServicesServices;
      'social.social-media': SocialSocialMedia;
    }
  }
}
