import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.mongoString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to mongoDB Atlas!');
});

const guildSchema = new mongoose.Schema({
    userID: String
});

const users = mongoose.model('guild', guildSchema);

export default users;
