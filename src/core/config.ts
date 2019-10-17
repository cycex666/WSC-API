export let appConfig: Config;

export interface Config {
	MongoDB: {
		host: string;
	};
	OAuth: {
		Secret: string;
		ExpirationTime: number;
	}
}
