# projeto


## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.17.4-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**
  - **npm install @types/webpack-env --save-dev**


> Include any additional steps as needed.

## Anotações 

Habilitar execução de scripts no windows (Executar no PowerShell):
Set-ExecutionPolicy AllSigned 
Instalar Gulp e Yeoman: 
npm install gulp-cli yo @microsoft/generator-sharepoint --global
Instalar certificado de desenvolvimento do gulp: 
gulp trust-dev-cert

Iniciar Projeto (Necessário instalar tudo anteriormente):
yo @microsoft/sharepoint
Iniciar servidor gulp:
gulp serve 

Instalar React e ReactDom:
npm i react@17.0.1 react-dom@17.0.1 @types/react@17.0.45 @types/react-dom@17.0.17 --save-exact
Instalar componentes de temas:
npm install @fluentui/react-components
Instalar o DatePicker
npm install @fluentui/react-datepicker-compat
Instalar o pnp
npm install @pnp/pnpjs@2.11.0
Criar temas personalizados:
https://react.fluentui.dev/?path=/docs/themedesigner--page
Documentação com componentes, temas e ícones:
https://react.fluentui.dev/?

Bug 22/08/2023
Colocar a Exclamação em todos os lugares onde estiver chamando algum tipo nulo com "?"
Verificar o 
    React.useEffect(() =>{
        getReceitas().then(result =>{
            setReceitas(result)
        })
    }, [])
 em Receitas.tsx

Bug Colossal do dia 05/09/2023
* Remover Pasta Node-modules
npm install
npm install @types/webpack-env --save-dev
correr pro abraço.


Tarefas de acompanhamento



## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
