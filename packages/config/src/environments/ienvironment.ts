export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * environment variables that goes into process.env
 */
export interface Env {
	LOG_LEVEL?: LogLevel;
	[key: string]: string;
}

// export interface FileSystem {
// 	name: FileStorageProviderEnum;
// }

export interface InestyFeatures {
	[key: string]: boolean;
}

export interface IDemoCredential {
	readonly superAdminEmail?: string;
	readonly superAdminPassword?: string;
	readonly adminEmail?: string;
	readonly adminPassword?: string;
	readonly employeeEmail?: string;
	readonly employeePassword?: string;
}

/**
 * Server Environment
 */
export interface IEnvironment {
	port: number | string;
	host: string;
	baseUrl: string;
	clientBaseUrl: string;

	production: boolean;
	envName: string;

	env?: Env;

	EXPRESS_SESSION_SECRET: string;
	USER_PASSWORD_BCRYPT_SALT_ROUNDS?: number;

	JWT_SECRET?: string;

	/**
	 * JWT refresh token Options
	 */
	JWT_REFRESH_TOKEN_SECRET?: string;
	JWT_REFRESH_TOKEN_EXPIRATION_TIME?: number;
	/**
	 * Password Less Authentication Configuration
	 */
	AUTHENTICATION_CODE_EXPIRATION_TIME?: number;

	/**
	 * Throttler (Rate Limiting) Options
	 */
	THROTTLE_TTL?: number;
	THROTTLE_LIMIT?: number;


	sentry?: {
		dns: string;
	};


	/**
	 * Endpoint for nesty AI API (optional), e.g.: http://localhost:3005/graphql
	 */
	nestyAIGraphQLEndpoint?: string;
	nestyCloudEndpoint?: string;

}
