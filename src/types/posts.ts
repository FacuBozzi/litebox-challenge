export type CoverImageAttributes = {
  data?: {
    id: number;
    attributes?: {
      url: string;
      name?: string;
    };
  } | null;
};

export type PostAttributes = {
  title?: string;
  subtitle?: string;
  slug?: string;
  topic?: string;
  author?: string;
  readTime?: number;
  body?: string;
  coverImg?: CoverImageAttributes;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

export type PostEntity = {
  id: number;
  attributes: PostAttributes;
};

export type PostsResponse = {
  data: PostEntity[];
};
