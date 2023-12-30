import session from 'express-session';
import Keycloak, { KeycloakConfig } from 'keycloak-connect';

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const config = {
    session,
    keycloak
}

export default config;