import mongoose from 'mongoose';
import config from '../utils/config';
import Guild from './schemas/GuildSchema';

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

export default Guild;
