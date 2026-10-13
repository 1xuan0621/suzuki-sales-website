export type ServiceReview = {
  id: string;
  author: string;
  excerpt: string;
  sourceUrl: string;
  screenshot: {
    src: string;
    width: number;
    height: number;
    capturedAt: string;
  };
};

// Individual public reviews of the Beitou location, mentioning the advisor.
// These are excerpts, not an aggregate rating for the advisor or the website.
export const serviceReviews: ServiceReview[] = [
  {
    id: "pj",
    author: "PJ",
    excerpt: "實在的報價，從開始到結束都親切有趣、沒有被推銷的壓力",
    sourceUrl: "https://maps.app.goo.gl/iaPbC7JiYzwg8Kvu7",
    screenshot: {
      src: "/images/reviews/pj-google-review.webp",
      width: 371,
      height: 142,
      capturedAt: "2026-10-13",
    },
  },
  {
    id: "yuting",
    author: "鈺婷",
    excerpt: "服務好又有耐心，提供非常專業的服務體驗",
    sourceUrl: "https://maps.app.goo.gl/eS3AvLA8U1wUsQNz7",
    screenshot: {
      src: "/images/reviews/yuting-google-review.webp",
      width: 371,
      height: 163,
      capturedAt: "2026-10-13",
    },
  },
  {
    id: "wu",
    author: "吳清輝",
    excerpt: "從一開始的規格介紹、購車方案，到後續的保險建議和交車流程，她都很積極誠懇",
    sourceUrl: "https://maps.app.goo.gl/nUUVkVfiCuihFUMJA",
    screenshot: {
      src: "/images/reviews/wu-google-review.webp",
      width: 371,
      height: 121,
      capturedAt: "2026-10-13",
    },
  },
];
