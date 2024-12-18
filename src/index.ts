#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { dedupCommand } from './commands/defaults/dedup';
import { docsCommand } from './commands/defaults/docs';
import { logCommand } from './commands/defaults/log';

// Define the command to copy files
const ana = yargs(hideBin(process.argv)).scriptName('ana').strict();

docsCommand(ana);
logCommand(ana);
dedupCommand(ana);

ana.help().parse();
