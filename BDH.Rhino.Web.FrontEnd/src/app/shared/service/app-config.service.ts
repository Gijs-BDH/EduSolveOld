import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { AuthClientConfig, AuthConfig, AuthConfigService } from '@auth0/auth0-angular';

import { environment } from '@env';

@Injectable()
export class AppConfigService {

    authClientConfig: AuthClientConfig;

    constructor(authClientConfig: AuthClientConfig) {
        this.authClientConfig = authClientConfig;
    }

    load() {
        return new Promise<void>((resolve) => {

            this.authClientConfig.set({
                // The domain and clientId were configured in the previous chapter
                domain: environment.auth0.domain,
                clientId: environment.auth0.clientId,

                authorizationParams: {
                    // Request this audience at user authentication time
                    audience: 'api-generative-design',

                    // Request this scope at user authentication time
                    scope: 'email',

                    redirect_uri: window.location.origin
                },

                // Specify configuration for the interceptor              
                httpInterceptor: {
                    allowedList: [
                        {
                            // Match any request that starts 'https://dev-clubbeterbouwen.eu.auth0.com/api/v2/' (note the asterisk)
                            uri: environment.apiUrl + '/*',
                            tokenOptions: {
                                authorizationParams: {
                                    // The attached token should target this audience
                                    audience: 'api-generative-design',

                                    // The attached token should have these scopes
                                    scope: 'read:current_user'
                                },
                            }
                        }

                    ]
                }
            });

            resolve();
        });
    };
}