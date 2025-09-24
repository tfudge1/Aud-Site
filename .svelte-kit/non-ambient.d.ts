
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/articles" | "/api/articles/[id]" | "/articles" | "/articles/[id]" | "/clips" | "/components" | "/contact" | "/email_sent" | "/resume";
		RouteParams(): {
			"/api/articles/[id]": { id: string };
			"/articles/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/api": { id?: string };
			"/api/articles": { id?: string };
			"/api/articles/[id]": { id: string };
			"/articles": { id?: string };
			"/articles/[id]": { id: string };
			"/clips": Record<string, never>;
			"/components": Record<string, never>;
			"/contact": Record<string, never>;
			"/email_sent": Record<string, never>;
			"/resume": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/articles" | "/api/articles/" | `/api/articles/${string}` & {} | `/api/articles/${string}/` & {} | "/articles" | "/articles/" | `/articles/${string}` & {} | `/articles/${string}/` & {} | "/clips" | "/clips/" | "/components" | "/components/" | "/contact" | "/contact/" | "/email_sent" | "/email_sent/" | "/resume" | "/resume/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/robots.txt" | string & {};
	}
}