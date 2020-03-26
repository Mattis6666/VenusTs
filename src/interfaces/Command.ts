import { PermissionString, Message } from 'discord.js';

export default interface Command {
    name: string;
    description: string;
    usage: string;
    developerOnly: boolean;
    guildOnly: boolean;
    dmOnly: boolean;
    requiresArgs: number;
    userPermissions: PermissionString | '';
    botPermissions: PermissionString | '';
    modOnly: boolean;
    adminOnly: boolean;
    callback(message: Message, args?: string[]): Promise<Message | undefined | void> | void;
}
