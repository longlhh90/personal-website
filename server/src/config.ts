import yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

const logger = new Logger('Config');

export class Config {
    debugLogging = 'debug';
    'server.port' = process.env.PORT; // for heroku deployment
    'jhipster.clientApp.name' = 'personal_website';
    'jhipster.registry.password' = process.env.REGISTRY_PASSWORD;
    'jhipster.security.authentication.jwt.base64-secret' = process.env.JWT_SECRET;
    'jhipster.security.authentication.jwt.token-validity-in-seconds' = 86400;
    'jhipster.security.authentication.jwt.token-validity-in-seconds-for-remember-me' = 2592000;
    'jhipster.mail.base-url' = 'http://127.0.0.1:${server.port}';
    'jhipster.mail.from' = '';
    'jhipster.swagger.default-include-pattern' = '/api/.*';
    'jhipster.swagger.title' = 'personal_website API';
    'jhipster.swagger.description' = 'personal_website API documentation';
    'jhipster.swagger.version' = '0.0.1';
    'jhipster.swagger.path' = '/api/v2/api-docs';
    'eureka.client.enabled' = true;
    'eureka.client.healthcheck.enabled' = true;
    'eureka.client.fetch-registry' = true;
    'eureka.client.register-with-eureka' = true;
    'eureka.client.instance-info-replication-interval-seconds' = 10;
    'eureka.client.registry-fetch-interval-seconds' = 10;
    'eureka.instance.appname' = 'personal_website';
    'eureka.instance.instanceId' = 'personal_website:${random.value}';
    'eureka.instance.lease-renewal-interval-in-seconds' = 5;
    'eureka.instance.lease-expiration-duration-in-seconds' = 10;
    'eureka.instance.status-page-url-path' = '${management.endpoints.web.base-path}/info';
    'eureka.instance.health-check-url-path' = '${management.endpoints.web.base-path}/health';
    'eureka.instance.metadata-map.zone' = 'primary';
    // 'eureka.instance.metadata-map.profile' = '${profiles.active}';
    'eureka.instance.metadata-map.git-version' = '${git.commit.id.describe:}';
    'eureka.instance.metadata-map.git-commit' = '${git.commit.id.abbrev:}';
    'eureka.instance.metadata-map.git-branch' = '${git.branch:}';
    'eureka.instance.prefer-ip-address' = true;
    'eureka.client.service-url.defaultZone' = 'http://admin:${jhipster.registry.password}@localhost:8761/eureka/';
    'cloud.config.uri' = 'http://admin:${jhipster.registry.password}@localhost:8761/config';
    'cloud.config.name' = 'personal_website';
    'cloud.config.profile' = 'prod';
    'loud.config.label' = 'master';
    'crypto.key' = process.env.CRYPTO_KEY;
    'crypto.iv' = process.env.CRYPTO_IV;

    constructor(properties) {
        this.addAll(properties);
    }

    public get(key: string): any {
        return this[key];
    }

    public getClientPath(): string {
        return path.join(__dirname, '../dist/static');
    }
    public addAll(properties): any {
        properties = objectToArray(properties);
        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                this[property] = properties[property];
            }
        }
        this.postProcess();
    }

    public postProcess(): any {
        const variables = { ...this, ...process.env };
        for (const property in this) {
            if (this.hasOwnProperty(property)) {
                const value = this[property];
                const processedValue = this.processTemplate(value, variables);
                this[property] = processedValue;
            }
        }
    }

    private processTemplate(template, variables): any {
        // console.log(template);
        if (typeof template === 'string') {
            return template.replace(
                new RegExp('\\${[^{]+}', 'g'),
                name => variables[name.substring(2, name.length - 1)],
            );
        }
        return template;
    }
}

const yamlConfigPath = path.join(__dirname, 'config', 'application.yml');
const envYamlConfigPath = path.join(__dirname, 'config', `application-${process.env.BACKEND_ENV}.yml`);

const yamlConfig = yaml.safeLoad(fs.readFileSync(yamlConfigPath, 'utf8'));
logger.log(`Actual process.env.BACKEND_ENV value: ${process.env.BACKEND_ENV}`);
logger.log('Standard allowed values are: dev, test or prod');
logger.log(
    'if you run with a non standard BACKEND_ENV value, remember to add your application-{process.env.BACKEND_ENV}.yml file',
);
if (!fs.existsSync(envYamlConfigPath)) {
    logger.error(
        'An application-{process.env.BACKEND_ENV}.yml file with your process.env.BACKEND_ENV value does not exist under config folder!',
    );
}
const envYamlConfig = yaml.safeLoad(fs.readFileSync(envYamlConfigPath, 'utf8'));

const config = new Config({ ...objectToArray(yamlConfig), ...objectToArray(envYamlConfig), ipAddress: ipAddress() });

export { config };

function objectToArray(source, currentKey?, target?): any {
    target = target || {};
    for (const property in source) {
        if (source.hasOwnProperty(property)) {
            const newKey = currentKey ? currentKey + '.' + property : property;
            const newVal = source[property];

            if (typeof newVal === 'object') {
                objectToArray(newVal, newKey, target);
            } else {
                target[newKey] = newVal;
            }
        }
    }
    return target;
}

function ipAddress(): any {
    const interfaces = require('os').networkInterfaces();
    for (const dev in interfaces) {
        if (interfaces.hasOwnProperty(dev)) {
            const iface = interfaces[dev];
            for (const alias of iface) {
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }

    return null;
}
