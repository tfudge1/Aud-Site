export interface Article {
	id: string;
	title: string;
	content: string;
	excerpt: string;
	imageUrl: string;
	imageAlt: string;
	publishDate: string;
	category: string;
	author: string;
	readTime: string;
	url?: string;
}

export interface ArticleResponse {
	articles: Article[];
	total: number;
	page: number;
	limit: number;
}
