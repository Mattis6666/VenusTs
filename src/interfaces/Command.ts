export default interface Command {
    name?: string;
    description?: string;
    usage?: string;
    developerOnly?: boolean;
    requiresArgs?: boolean;
    guildOnly?: boolean;
    dmOnly?: boolean;
    userPermissions?: string[];
    botPermissions?: string[];
    allowedRoles?: string[];
    callback?: CallableFunction;
}
