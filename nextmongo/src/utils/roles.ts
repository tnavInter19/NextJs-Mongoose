export const ROLES = {
 ADMIN: "admin",
 USER: "user",
};

export const ACCESS_RULES = {
 dashboard: [ROLES.ADMIN, ROLES.USER],
 adminPanel: [ROLES.ADMIN],
};