import { Config2 } from "./config/config.interface";

const inputNames = [
  "SSH_PRIVATE_KEY",
  "REMOTE_HOST",
  "REMOTE_USER",
  "REMOTE_PORT",
  "SERVER_PROJECT",
  "CLIENT_DIST",
  "SERVER_DIR",
]

const githubWorkspace = process.env.GITHUB_WORKSPACE;

const defaultInputs = {
  SSH_PRIVATE_KEY: '',
  REMOTE_HOST: '',
  REMOTE_USER: '',
  REMOTE_PORT: '22',
  SERVER_PROJECT: '',
  CLIENT_DIST: `dist`,
  SERVER_DIR: '',
};

const aliasNams: Record<keyof typeof defaultInputs, keyof Config2> = {
  SSH_PRIVATE_KEY: 'privateKey',
  REMOTE_HOST: 'host',
  REMOTE_USER: 'username',
  REMOTE_PORT: 'port',
  SERVER_PROJECT: 'project',
  CLIENT_DIST: 'dist',
  SERVER_DIR: 'serverDir',
}

const inputs = {
};

inputNames.forEach((input) => {
  const inputVal = process.env[input]
  // @ts-ignore
  const validVal = inputVal === undefined ? defaultInputs[input] : inputVal
  let extendedVal = validVal;
  switch (input) {
    case 'CLIENT_DIST':
      // @ts-ignore
      extendedVal = validVal.split(' ').map((src) => `${process.env.GITHUB_WORKSPACE}/${src}`);
      break;
  }
  // @ts-ignore
  inputs[aliasNams[input]] = validVal;
})

export { inputs }