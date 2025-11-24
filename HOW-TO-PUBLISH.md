## Prepare Environment
Before you build, there are something you have to do.

1. Install **Node.js** from: https://nodejs.org/ if not yet
2. Node.js should cantains **npm**, if not, try re-install the newest Node.js
3. Install **pnpm**: `npm install -g pnpm`
4. Open cmd terminal, `cd` into project path (containning `package.json` file)
5. If you are in China:
   1. Install **nrm**(npm registry manager): `pnpm install -g nrm`
   2. Change source to speed up installation: `nrm use taobao`
6. Install dependencies: `npm install` (do not use pnpm or yarn)
7. Install **vsce** and **tsc**: `npm install -g typescript @vscode/vsce`

## PUBLISH to VSCode Marketplace
https://marketplace.visualstudio.com/

1. BUILD the package: `vsce package`
   - may have to install vsce first: npm i vsce -g
2. Create a personal access token (or reusable an unexpired one), go [here](https://aka.ms/SignupAzureDevOps) or [here](https://dev.azure.com/zengfanfan/_usersSettings/tokens) to create one, choosing "All accessible organizations" and "Full access" when creating.
3. if you don't have a publisher, create one: https://marketplace.visualstudio.com/manage
4. LOGIN: `vsce login <publisher-name>`, then paste the token when asked.
5. PUBLISH: `vsce publish`
   - publish minor version: vsce publish minor (autoincrease 1.0.2 -> 1.1.0)
   - publish patch version: vsce publish patch (autoincrease 1.0.2 -> 1.0.3)
   - version components: major.minor.patch

## PUBLISH to OpenVSX Marketplace
https://open-vsx.org/

see: https://github.com/eclipse/openvsx/wiki/Publishing-Extensions
