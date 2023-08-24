export interface GroupData<V> {
  name: string;
  slug: string;
  link: string;
  items: Array<V>;
}

export interface ImageData {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  blurDataURL?: string;
  blurWidth?: number | string;
  blurHeight?: number | string;
}

export interface TocData {
  name: string;
  slug: string;
  link: string;
  level: number;
  children: Array<TocData>;
}

export interface SeoData {
  language: string;
  link: string;
  logo: ImageData;
  title: string;
  subtitle: string;
  description: string;
  birthday: Date;
  keywords?: string[];
}

export interface HeaderData {
  main: Array<{
    title: string;
    link: string;
    icon: string;
    view: "always" | "elastic" | "always-icon" | "elastic-icon";
  }>;
}

export interface FooterData {
  main: Array<{
    title: string;
    link: string;
  }>;
}

export interface AuthorData {
  fullname: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar: ImageData;
  description: string;
}

export interface LicenseData {
  name: string;
  link: string;
}

export interface LinkData {
  links: Array<{
    name: string;
    link: string;
    avatar: ImageData;
    author?: string;
    description?: string;
  }>;
  lost_links: Array<{
    name: string;
    link: string;
  }>;
}

export interface ArticleList {
  title: string;
  slug: string;
  link: string;
  layout: string;
  status: "draft" | "publish" | "archive";
  published: Date;
  modified: Date;
  excerpt: string;
  thumbnail?: ImageData;
  archives: {
    name: string;
    slug: string;
    link: string;
  };
  categories?: Array<{
    name: string;
    slug: string;
    link: string;
  }>;
  tags?: Array<{
    name: string;
    slug: string;
    link: string;
  }>;
}

export interface ArticleData extends ArticleList {
  headings: Array<TocData>;
  body: {
    raw: string;
    code: string;
    text: string;
  };
}
