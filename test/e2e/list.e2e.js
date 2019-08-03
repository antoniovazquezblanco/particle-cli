const capitalize = require('lodash/capitalize');
const { expect } = require('../test-setup');
const cli = require('../__lib__/cli');
const {
	DEVICE_ID,
	DEVICE_NAME,
	DEVICE_PLATFORM_NAME
} = require('../__lib__/env');


describe('List Commands', () => {
	const help = [
		'Display a list of your devices, as well as their variables and functions',
		'Usage: particle list [options] [filter]',
		'',
		'Global Options:',
		'  -v, --verbose  Increases how much logging to display  [count]',
		'  -q, --quiet    Decreases how much logging to display  [count]',
		'',
		'Param filter can be: online, offline, a platform name (photon, electron, etc), a device ID or name'
	];

	before(async () => {
		await cli.setTestProfileAndLogin();
	});

	after(async () => {
		await cli.logout();
		await cli.setDefaultProfile();
	});

	it('Shows `help` content', async () => {
		const { stdout, stderr, exitCode } = await cli.run(['help', 'list']);

		expect(stdout).to.equal('');
		expect(stderr.split('\n')).to.include.members(help);
		expect(exitCode).to.equal(0);
	});

	it('Shows `help` content when run with `--help` flag', async () => {
		const { stdout, stderr, exitCode } = await cli.run(['list', '--help']);

		expect(stdout).to.equal('');
		expect(stderr.split('\n')).to.include.members(help);
		expect(exitCode).to.equal(0);
	});

	it('Lists devices', async () => {
		const platform = capitalize(DEVICE_PLATFORM_NAME);
		const { stdout, stderr, exitCode } = await cli.run('list');

		expect(stdout).to.include(`${DEVICE_NAME} [${DEVICE_ID}] (${platform})`);
		expect(stderr).to.equal('');
		expect(exitCode).to.equal(0);
	});
});

