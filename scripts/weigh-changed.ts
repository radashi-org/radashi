import { execa } from 'execa';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as readline from 'readline';

async function getTargetBranch(): Promise<string> {
  if (process.env.TARGET_BRANCH) {
    return process.env.TARGET_BRANCH;
  }

  try {
    const { stdout } = await execa('gh', ['pr', 'view', '--json', 'baseRefName', '--jq', '.baseRefName']);
    return stdout.trim() || 'main';
  } catch {
    return 'main';
  }
}

async function getChangedFiles(targetBranch: string): Promise<{ statuses: string[], names: string[] }> {
  const { stdout } = await execa('git', ['diff', '--name-status', `origin/${targetBranch}`, 'HEAD', '--', 'src/*/*.ts']);
  const changes = stdout.trim().split('\n');
  
  const statuses: string[] = [];
  const names: string[] = [];

  changes.forEach((change, index) => {
    if (index % 2 === 0) {
      statuses.push(change);
    } else {
      names.push(change);
    }
  });

  return { statuses, names };
}

async function installEsbuild(): Promise<void> {
  if (!process.env.CI) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise<string>(resolve => {
      rl.question('Install esbuild to pnpm global store? (Y/n) ', resolve);
    });

    rl.close();

    if (answer.toLowerCase() === 'n') {
      process.exit(1);
    }
  }

  await execa('pnpm', ['install', '-g', 'esbuild']);
}

async function checkEsbuild(): Promise<void> {
  try {
    await execa('which', ['esbuild']);
  } catch {
    await installEsbuild();
  }
}

async function getPreviousSizes(fileNames: string[], fileStatuses: string[], targetBranch: string): Promise<number[]> {
  const prevSizes: number[] = [];

  if (process.env.CI || (await execa('git', ['status', '-s'])).stdout.trim() === '') {
    await execa('git', ['checkout', targetBranch]);

    for (let i = 0; i < fileNames.length; i++) {
      const file = fileNames[i];
      const status = fileStatuses[i];

      if (!await fs.access(file).then(() => true).catch(() => false)) {
        prevSizes.push(0);
      } else {
        const { stdout } = await execa('esbuild', ['--bundle', '--minify', file]);
        prevSizes.push(stdout.length);
      }
    }

    await execa('git', ['checkout', '-']);
  }

  return prevSizes;
}

async function getFileSize(file: string, status: string): Promise<number> {
  if (status === 'D') {
    return 0;
  }
  const { stdout } = await execa('esbuild', ['--bundle', '--minify', file]);
  return stdout.length;
}

async function main() {
  const targetBranch = await getTargetBranch();
  const { statuses, names } = await getChangedFiles(targetBranch);

  await checkEsbuild();

  const prevSizes = await getPreviousSizes(names, statuses, targetBranch);

  const columnCount = prevSizes.some(size => size !== 0) ? 3 : 2;

  if (process.env.CI) {
    console.log('\n\n');
    if (columnCount > 2) {
      console.log('| Status | File | Size | Difference (%) |');
      console.log('|---|---|---|---|');
    } else {
      console.log('| Status | File | Size |');
      console.log('|---|---|---|');
    }
  }

  for (let i = 0; i < names.length; i++) {
    const file = names[i];
    const status = statuses[i];
    const prevBytes = prevSizes[i];

    const bytes = await getFileSize(file, status);

    const diff = bytes - prevBytes;
    const diffStr = (diff >= 0 ? '+' : '') + diff;

    let ratioStr = '';
    if (columnCount > 2 && prevBytes !== 0) {
      const ratio = Math.round((bytes / prevBytes - 1) * 100);
      ratioStr = ` (${ratio >= 0 ? '+' : ''}${ratio}%)`;
    }

    if (process.env.CI) {
      const sizeStr = i === 0 ? `${bytes} [^1337]` : `${bytes}`;
      if (columnCount > 2) {
        console.log(`| ${status} | \`${file}\` | ${sizeStr} | ${diffStr}${ratioStr} |`);
      } else {
        console.log(`| ${status} | \`${file}\` | ${sizeStr} |`);
      }
    } else {
      if (columnCount > 2 && prevBytes !== 0) {
        console.log(`${file}: ${bytes} bytes (${diffStr} bytes)${ratioStr}`);
      } else {
        console.log(`${file}: ${bytes} bytes`);
      }
    }
  }

  if (process.env.CI) {
    console.log('');
    console.log('[^1337]: Function size includes the `import` dependencies of the function.');
    console.log('');
  }
}

main().catch(console.error);
