import { exec, spawn } from 'child_process';
import { log } from 'console';
import { DateTime } from 'luxon';
import { Argv } from 'yargs';
import { Config } from '../../helpers/config-provider';

const logsFile = () => Config.get('cli.logs-file');

export const logCommand = (yargs: Argv<{}>) => {
  return yargs.command(
    'log [content..]',
    'writes content to a log file',
    (yargs) => {
      yargs.positional('content', {
        describe: 'content to write to the file',
        type: 'string',
      });
    },
    async (argv) => {
      const content = argv.content as string[];
      log(content, content.length === 0, logsFile());
      if (content.length === 0) {
        const less = spawn('less', [logsFile()], { stdio: 'inherit' });
      } else {
        const formattedDateTime = DateTime.now().toFormat('yyyy-MM-dd hh:ss a');
        const formattedContent = content.join(' ');
        const line = `[${formattedDateTime}]: ${formattedContent}`;

        exec(`echo ${line} >> ${logsFile()}`);
      }
    }
  );
};
