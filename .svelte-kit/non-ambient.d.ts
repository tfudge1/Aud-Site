
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
		RouteId(): "/" | "/clips" | "/contact" | "/email_sent" | "/resume";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/clips": Record<string, never>;
			"/contact": Record<string, never>;
			"/email_sent": Record<string, never>;
			"/resume": Record<string, never>
		};
		Pathname(): "/" | "/clips" | "/clips/" | "/contact" | "/contact/" | "/email_sent" | "/email_sent/" | "/resume" | "/resume/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/robots.txt" | string & {};
	}
}