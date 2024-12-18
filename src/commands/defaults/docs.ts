import { exec } from 'child_process';
import { promisify } from 'util';
import { Argv } from 'yargs';
import { Config } from '../../helpers/config-provider';

const docsDir = () => Config.get('cli.docs-dir');

export const docsCommand = (yargs: Argv<{}>) => {
  return yargs.command(
    'docs [filename]',
    'create and search documents',
    (yargs) => {
      yargs
        .positional('filename', {
          describe: 'name of the document to create',
          type: 'string',
        })
        .example(
          `ana docs 'how to bake a cake'`,
          'space seperated file name gets joined with underscore `how_to_bake_a_cake.md`'
        );
    },
    async (argv) => {
      if (!argv.filename) {
        await searchDocs();
      } else {
        await createDoc(argv.filename as string);
      }
    }
  );
};

const searchDocs = async () => {
  return promisify(exec)(
    `find ${docsDir()} -name "*.md" | fzf --preview 'cat {}'`
  );
};

const createDoc = async (name: string) => {
  const fileName = `${name.replace(/\s/gi, '_')}.md`;
  const filePath = `${docsDir()}/${fileName}`;
  const content = `# ${name}`;
  const createdFile = exec(
    `echo '${content}' > ${filePath} && $EDITOR ${filePath}`,
    { env: { EDITOR: 'subl' } }
  );
};
