import { Document } from 'mongoose';

export default interface MongooseModel extends Document {
    getGuild: CallableFunction;
    setPrefix: CallableFunction;
}
