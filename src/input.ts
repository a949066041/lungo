import { Config, Config2 } from "./config/config.interface";

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

const inputs: Config | Config2 = {
  privateKey: '',
  host: '',
  username: '',
  port: '22',
  project: '',
  dist: '',
  serverDir: '',
};

inputNames.forEach((input) => {
  const inputVal = process.env[input] || process.env[`INPUT_${input}`]
  const validVal: string = inputVal === undefined ? defaultInputs[input as keyof typeof defaultInputs] : inputVal
  // @ts-ignore
  inputs[aliasNams[input as keyof typeof defaultInputs]] = validVal;
})

export { inputs }