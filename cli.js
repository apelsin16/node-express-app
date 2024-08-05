const { Command } = require('commander');
const bcrypt = require('bcrypt');

const program = new Command();

program
  .name('lectrum')
  .description('CLI to for Lectrum course project')
  .version('1.0.0');

program.command('hash')
  .description('Generate hash of the provided password')
  .argument('<password>', 'password to hash')
  .option('-d, --debug', 'display some debug information', false)
  .action(async (password, options, command) => {
    if (options.debug) {
      console.log('Called %s for %s with options %o', command.name(), password, options);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
  });

program.parseAsync();