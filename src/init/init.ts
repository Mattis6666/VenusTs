import fs from 'fs';
import path from 'path';
import Command from '../interfaces/Command';
import { VenClient } from '../index';

export const init = () => {
    setCommands();
    setLanguages();
};

export const setCommands = () => {
    const commandPath = path.join(__dirname, '../commands');
    fs.readdirSync(commandPath).forEach(folder => {
        const commandFiles = fs.readdirSync(`${commandPath}/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command: Command = require(`${commandPath}/${folder}/${file}`).command;
            VenClient.commands.set(command.name, command);
        }
    });
};

export const setLanguages = () => {
    const languagePath = path.join(__dirname, '../i18n');
    fs.readdirSync(languagePath).forEach(folder => {
        const languageFiles: { command: string; strings: object }[] = [];
        fs.readdirSync(`${languagePath}/${folder}`).forEach(subfolder => {
            fs.readdirSync(`${languagePath}/${folder}/${subfolder}`)
                .filter(file => file.endsWith('.js'))
                .forEach(file => {
                    const str = require(`${languagePath}/${folder}/${subfolder}/${file}`).strings;
                    languageFiles.push({ command: file.replace('.js', ''), strings: str });
                });
        });
        VenClient.languages.set(folder, languageFiles);
    });
};
