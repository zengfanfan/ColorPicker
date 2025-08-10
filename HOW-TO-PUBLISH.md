## Prepare Environment
Before you build, there are something you have to do.

1. Install **Node.js** from: https://nodejs.org/ if not yet
2. Node.js should cantains **npm**, if not, try re-install the newest Node.js
3. Install **yarn**: `npm install -g yarn`
4. Open cmd terminal, `cd` into project path (containning `package.json` file)
5. Install **nrm**(npm registry manager): `npm install -g nrm`
6. Change source to speed up installation: `nrm use taobao`
7. Install necessary packages: `yarn`
8. Install **vsce** and **tsc**: `npm install -g typescript @vscode/vsce`

## PUBLISH to VSCode Marketplace
https://marketplace.visualstudio.com/

1. BUILD the package: `vsce package`
   - may have to install vsce first: npm i vsce -g
2. Create a personal access token (or reusable an unexpired one), go https://aka.ms/SignupAzureDevOps go create one, choosing "All accessible organizations" and "Full access" when creating.
3. if you don't have a publisher, create one: https://marketplace.visualstudio.com/manage
4. LOGIN: `vsce login <publisher-name>`
5. PUBLISH: `vsce publish`
   - publish minor version: vsce publish minor (autoincrease 1.0.2 -> 1.1.0)
   - publish patch version: vsce publish patch (autoincrease 1.0.2 -> 1.0.3)
   - version components: major.minor.patch

## PUBLISH to OpenVSX Marketplace
https://open-vsx.org/

see: https://github.com/eclipse/openvsx/wiki/Publishing-Extensions
