export interface GroupData<V> {
  name: string;
  slug: string;
  link: string;
  items: ReadonlyArray<V>;
}

export interface PageData<V> {
  page: (index: number) => ReadonlyArray<V>;
  pages: number;
  total: number;
  items: ReadonlyArray<ReadonlyArray<V>>;
}

export interface GroupPageData<V> extends PageData<V> {
  name: string;
  slug: string;
  link: string;
}

export interface TocData {
  name: string;
  slug: string;
  link: string;
  step: number;
  level: number;
  children: ReadonlyArray<TocData>;
}

export interface DocumentData {
  document: Array<any>;
  headings: Array<TocData>;
  contents: string;
  excerpts: string;
}

export interface SeoData {
  language: string;
  link: string;
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  birthday: Date;
  keywords?: ReadonlyArray<string>;
}

export interface HeaderData {
  main: ReadonlyArray<{
    title: string;
    link: string;
    icon: string;
    view: "always" | "elastic" | "always-icon" | "elastic-icon";
  }>;
}

export interface FooterData {
  main: ReadonlyArray<{
    title: string;
    link: string;
  }>;
}

export interface AuthorData {
  fullname: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar: string;
  description: string;
}

export interface LicenseData {
  name: string;
  link: string;
}

export interface HomeData {
  display: "list" | "document";
  content?: DocumentData;
}

export interface FriendsData {
  display: "hidden" | "none" | "top" | "bottom";
  content?: DocumentData;
  links?: ReadonlyArray<{
    name: string;
    link: string;
    avatar: string;
    author?: string;
    description?: string;
  }>;
  lost_links?: ReadonlyArray<{
    name: string;
    link: string;
  }>;
}

export interface ProjectsData {
  display: "hidden" | "none" | "top" | "bottom";
  content?: DocumentData;
  categories?: ReadonlyArray<{
    name: string;
    projects: ReadonlyArray<{
      name: string;
      link: string;
      description: string;
      components: ReadonlyArray<string>;
    }>;
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
  thumbnail?: string;
  body: Pick<DocumentData, "excerpts">;
  archives: {
    name: string;
    slug: string;
    link: string;
  };
  categories?: ReadonlyArray<{
    name: string;
    slug: string;
    link: string;
  }>;
  tags?: ReadonlyArray<{
    name: string;
    slug: string;
    link: string;
  }>;
}

export interface ArticleData extends ArticleList {
  body: DocumentData;
}

export type SingletonResult<T> = Promise<T>;

export type CollectionResult<T, P> = Promise<{ items: Array<T>; pages: P }>;
