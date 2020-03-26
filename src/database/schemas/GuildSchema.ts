import mongoose, { Schema, Document } from 'mongoose';

export interface Guild extends Document {
    guildId: String;
    settings: {
        prefix: String;
        welcomeChannel: String;
        blockedChannels: [String];
    };
    roles: {
        admin: String;
        mod: String;
    };
    warns: {
        userId: String;
        warns: [
            {
                reason: String;
                moderator: {
                    id: String;
                    username: String;
                };
                date: Date;
            }
        ];
    };
}

const GuildSchema: Schema = new Schema({
    guildId: String,
    settings: {
        prefix: String,
        welcomeChannel: String,
        blockedChannels: [String]
    },
    roles: {
        admin: String,
        mod: String
    },
    warns: {
        userId: String,
        warns: [
            {
                reason: String,
                moderator: {
                    id: String,
                    username: String
                },
                date: Date
            }
        ]
    }
});

GuildSchema.methods.getSettings = async (gId: string) => {
    return (await guild.findOne({ guildId: gId })) || guild.create({ guildId: gId });
};
const guild = mongoose.model<Guild>('guilds', GuildSchema);
export default guild;
