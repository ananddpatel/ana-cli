import { Argv } from 'yargs';

export const dedupCommand = (yargs: Argv<{}>) => {
  return yargs.command(
    'dedup [text]',
    'dedups a multi line input',
    (yargs) => {
      yargs
        .positional('text', {
          describe: 'content to dedup',
          type: 'string',
        })
        .option('sort', {
          alias: 's',
          type: 'boolean',
          default: false,
          describe: 'Sort the deduplicated lines alphabetically',
        });
    },
    async (argv) => {
      handleDedupCommand(
        argv as unknown as { text?: string; sort: boolean }
      ).catch((err) => {
        console.error('An error occurred:', err.message);
        process.exit(1);
      });
    }
  );
};

const deduplicateLines = (input: string, sort: boolean): string => {
  const seen = new Set<string>();
  let lines = input.split('\n').filter((line) => {
    if (seen.has(line)) {
      return false;
    }
    seen.add(line);
    return true;
  });

  if (sort) {
    lines = lines.sort();
  }

  return lines.join('\n');
};

// Command handler for `dedup`
const handleDedupCommand = async (argv: { text?: string; sort: boolean }) => {
  if (argv.text) {
    // Deduplicate lines from the passed text argument
    const deduplicated = deduplicateLines(argv.text, argv.sort || false);
    console.log(deduplicated);
  } else {
    // Check for stdin input
    const stdinInput = await new Promise<string>((resolve) => {
      let data = '';
      process.stdin.on('data', (chunk) => (data += chunk));
      process.stdin.on('end', () => resolve(data));
      process.stdin.resume();
    });

    if (stdinInput.trim()) {
      // Deduplicate lines from stdin
      const deduplicated = deduplicateLines(stdinInput, argv.sort || false);
      console.log(deduplicated);
    } else {
      console.error(
        'No input provided. Pass text as an argument or pipe input via stdin.'
      );
      process.exit(1);
    }
  }
};
