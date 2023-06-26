# Client Customer Portal for Vtiger CRM

Client side for [GO](https://github.com/semelyanov86/vtiger-portal) vtiger customer portal. Written on React.js and typescript. Uses API of golang customer portal, not Vtiger one.
This open source project intends to create an online platform where managers sell their products and services, and customers can view related data in Vtiger CRM in one stop. This platform is similar to default customer portal in Vtiger CRM, but has additional features and better design.

## Features
- Light/dark mode toggle
- Live previews
- CRUD operations for HelpDesk module
- View information about Projects.
- View related project tasks. Change status of project task.
- View statistics information in dashboard.
- FAQs with displaying all entities in accordion mode.
- Displaying entities of custom modules with CRUD operations
- Two-factor authorization.
- Adding and reading comments and related documents, attached to all modules.
- Registration, forgot password pages, authorization.
- View and print invoices, sales orders.
- Profile page, view and edit.
- Make a payment for invoice and sales order.

## Installation

Install my-project with npm

```bash
  git clone https://github.com/semelyanov86/client-vtiger-portal
  cd client-vtiger-portal
  cp .env.example .env
  npm run dev
```
Now you are ready for development, you can change source files and see your changes in live mode
In order to set your own server URL, edit content of .env file.

## Tech Stack

**Client:** React, Zustand, Bootstrap, Vite, Vitest.

**Server:** Golang, PHP


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BASENAME` - name of application, which we will display as system information

`NODE_ENV` - type of environment - development or production

`GENERATE_SOURCEMAP` - Should we generate source map or not.

`VITE_APP_API_URL` - URL for connecting to GO backend server. For example: http://127.0.0.1:4050

## Application Configuration

All configuration variables stored in `config` folder. There you can find two files:
* `index.ts` - for storing main settings
* `constants.ts` - for additional configuration settings.

Below we describe a list of important variables, which you can use for business logic customization.
1. `REACT_HELMET_PROPS` - what postfix we will display in every page header.
2. `SUPPORTED_MODULES` - list or modules, supported bu default, which will be displayed in menus.
3. `USE_MULTI_LANGUAGE` - boolean value, which enables or disables multilanguage configuration.
4. `DEFAULT_PAGE_COUNT` - number of entities, which will be displayed in list view.
5. `DEFAULT_PRODUCT_MODULES` - list of modules for catalog list. What your company sell - product or services or both of them.
6. `CURRENCY_POSITION_END` - should currency be displayed at the end of amount (true) or at the beginning (false)
7. `IS_PAYMENT_SUPPORTED` - display or not payment form in invoices and sales order.
8. `HELP_URL` - page for feedback, where customers can get help on your website.
9. `GENERAL_FIELDS` - list of general field names, which exists in all modules.
10. `CUSTOM_MODULES` - array of object, which will display additional modules in main menu. Modules, which not supported by default. Every object accepts following params: 
* `default_sort` - field name, string, which we will use for sorting by default.
* `list_fields` - array of field names, which used for displaying in main table.
* `icon` - name of Bootstrap Icon to display in main menu.
* `edit_fields` - array of field names, which we will use to display in edit and create form.
* `related` - list of related module names. Currently supported: Documents, ModComments.

You should always configure and use the following tools:

#### ESLint

ESLint is a linting tool for JavaScript. By providing specific configuration defined in the`.eslintrc.js` file it prevents developers from making silly mistakes in their code and enforces consistency in the codebase.

[ESLint Configuration Example Code](../.eslintrc.js)

#### Prettier

This is a great tool for formatting code. It enforces a consistent code style across your entire codebase. By utilizing the "format on save" feature in your IDE you can automatically format the code based on the configuration provided in the `.prettierrc` file. It will also give you good feedback when something is wrong with the code. If the auto-format doesn't work, something is wrong with the code.

[Prettier Configuration Example Code](../.prettierrc)

#### TypeScript

ESLint is great for catching some of the bugs related to the language, but since JavaScript is a dynamic language ESLint cannot check data that run through the applications, which can lead to bugs, especially on larger projects. That is why TypeScript should be used. It is very useful during large refactors because it reports any issues you might miss otherwise. When refactoring, change the type declaration first, then fix all the TypeScript errors throughout the project and you are done. One thing you should keep in mind is that TypeScript does not protect your application from failing during runtime, it only does type checking during build time, but it increases development confidence drastically anyways. Here is a [great resource on using TypeScript with React](https://react-typescript-cheatsheet.netlify.app/).

## Deployment

To deploy this project run

```bash
  npm run build
```
After running last command, you can see all compiled files in `dist` folder. Now you need just to run `index.html` file.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

This way you can run all unit tests. Note, that currently we do not have 100% test coverage. Writing tests for this project is currently in progress.

## Available scripts
- `npm run dev` - running frontend in webpack dev server.
- `npm run build` - building project for production server.
- `npm run lint` - checking ts files via eslint.
- `npm run preview` - running vite preview command
- `npm run prettier` - checking code formatting.
- `npm run format` - fixing code formatting.
- `npm run check-types` - checking typescript types.
- `npm run check-format` - checking correctness of code formatting.
- `npm run validate-and-build` - validate code and running building process.
- `npm run validate` - validating code.
- `npm run test` - running unit tests.
- `npm run coverage` - test coverage report.

## Project Architecture
Project has feature structure. Every module has it's own feature.
At first, we will prepare application basely (bootstrap, routing, styles)
Then we will consider - how the concepts of the methodology help flexibly and effectively design business logic without unnecessary costs
Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration, env variables etc. get exported from here and used in the app
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries preconfigured for the application
|
+-- providers         # all of the application providers
|
+-- routes            # routes configuration
|
+-- stores            # global state stores
|
+-- test              # test utilities and mock server
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the `features` folder, which should contain different feature-based things. Every `feature` folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files.

A feature could have the following structure:

```sh
src/features/help-desk
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- routes      # route components for a specific feature pages
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types for TS specific feature domain
|
+-- utils       # utility functions for a specific feature
|
+-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
```

Everything from a feature should be exported from the `index.ts` file which behaves as the public API of the feature.

## Authentication

Authentication is a process of identifying who the user is. The most common way of authenticating users in single page applications is via Bearer Token. During logging in / registration you receive a token that you store in your application, and then on each authenticated request you send the token in the header or via cookie along with the request.

The safest option is to store the token in the app state, but if the user refreshes the app, its token will be lost.

That is why tokens are stored in `localStorage/sessionStorage` or in a cookie.

### `localStorage` vs cookie for storing tokens

Storing it in `localStorage` could bring a security issue, if your application is vulnerable to [XSS](https://owasp.org/www-community/attacks/xss/) someone could steal your token.

Storing tokens in a cookie might be safer if the cookie is set to be `HttpOnly` which would mean it wouldn't be accessible from the client side JavaScript. The `localStorage` way is being used here for simplicity reasons, if you want to be more secure, you should consider using cookies but that is a decision that should be made together with the backend team.

To keep the application safe, instead of focusing only on where to store the token safely, it would be recommended to make the entire application as resistant as possible to XSS attacks E.g - every input from the user should be sanitized before it's injected into the DOM.

## Working with translations

In this project we use react-intl
All files with translation stored in folder `providers/messages`. Currently we support Russian, English and German languages.

React-intl documentation - [https://formatjs.io/docs/react-intl/](https://formatjs.io/docs/react-intl/)

## Adding new fields to default modules

In this project we support default fields and types for core modules: HelpDesk, Projects, ProjectTasks, Invoices, SalesOrder. If you want to add new field, first include it in you domain object, which stored in `types` folder.
Then you need to add this field in table and detail view. Add this templates stored in `routes` folder.
Let us check an example. For example, you want to add a field to HelpDesk module with name `cf_2234`.
1. Edit file `src/features/help-desk/types/index.ts`. Add a new field with it's type in struct.
2. Need to add field in table? Just add new column in file `src/features/help-desk/table/getColumns.tsx`
3. To display a field in detail view - edit file `src/features/help-desk/routes/Ticket.tsx`.
4. Need to add this fields in create and edit forms, edit following files: `src/features/help-desk/components/AddTicketModal.tsx` and `src/features/help-desk/components/EditTicketModal.tsx`

## Screenshots

<img alt="Login Page" src="https://itvolga.com/assets/images/portal-demo/portal-1.png" width="400"/>

<img alt="Dashboard" src="https://itvolga.com/assets/images/portal-demo/portal-2.png" width="400"/>

<img alt="Security Settings" src="https://itvolga.com/assets/images/portal-demo/portal-3.png" width="400"/>

<img alt="Tickets List" src="https://itvolga.com/assets/images/portal-demo/portal-4.png" width="400"/>

<img alt="Ticket Detail Page" src="https://itvolga.com/assets/images/portal-demo/portal-5.png" width="400"/>

<img alt="FAQ list" src="https://itvolga.com/assets/images/portal-demo/portal-6.png" width="400"/>

<img alt="Invoice Detail View" src="https://itvolga.com/assets/images/portal-demo/portal-7.png" width="400"/>

<img alt="Project Detail View" src="https://itvolga.com/assets/images/portal-demo/portal-8.png" width="400"/>

<img alt="Invoices List" src="https://itvolga.com/assets/images/portal-demo/portal-9.png" width="400"/>

<img alt="User Settings Page" src="https://itvolga.com/assets/images/portal-demo/portal-10.png" width="400"/>

## Color Reference

| Color            | Hex                                                                |
|------------------| ------------------------------------------------------------------ |
| Primary theme    | ![#2499e3](https://via.placeholder.com/10/2499e3?text=+) #2499e3 |
| Secondary theme  | ![#50c6db](https://via.placeholder.com/10/50c6db?text=+) #50c6db |
| Tertiary         | ![#1859bb](https://via.placeholder.com/10/1859bb?text=+) #1859bb |
| Quaternary       | ![#2a2c7c](https://via.placeholder.com/10/2a2c7c?text=+) #2a2c7c |
| Background color | ![#f9f9f9](https://via.placeholder.com/10/f9f9f9?text=+) #f9f9f9 |
| Info color       | ![#279aac](https://via.placeholder.com/10/279aac?text=+) #279aac |
| Warning color    | ![#ebb71a](https://via.placeholder.com/10/ebb71a?text=+) #ebb71a |
| Success color    | ![#439b38](https://via.placeholder.com/10/439b38?text=+) #439b38 |
| Muted text color | ![#afafaf](https://via.placeholder.com/10/afafaf?text=+) #afafaf |
| Light  color     | ![#dadada](https://via.placeholder.com/10/dadada?text=+) #dadada |

### Overriding CSS

You may override css variables within inline css or an external file.

```scss
/* Override a variable from a certain theme */
html[data-color='light-blue'] {
--body: red;
}

/* Overriding a variable globally */
:root {
--body: red !important;
}
```

## CI/CD Pipeline

We have Github Actions workflow configuration, which stores in folder `.github/workflows`. We have almost all possible scripts, we check lintings, typescript checking, tests. After checking and audit, we run deployment process.

## Acknowledgements

- [Golang Backend Part](https://github.com/semelyanov86/vtiger-portal)
- [Vtiger CRM source code](https://code.vtiger.com/vtiger/vtigercrm/-/tree/master)
- [React.js](https://react.dev)
- [Bootstrap Icons](https://icons.getbootstrap.com)
- [Vite](https://vitejs.dev)

## Support

For support, email info@itvolga.com or write us in telegram: @sergeyem

## Feedback

If you have any feedback, please reach out to us at info@itvolga.com.


## Related

Here is a list of other vtiger customer portal, which works directly with Vtiger API.

[Default vtiger customer portal](https://sourceforge.net/projects/vtigercrm/files/vtiger%20CRM%207.1.0/Add-ons/vtigercrm-customerportal-7.1.0.zip/download)


## Lessons Learned

This is first project, based on React application. We all need quality and fact portal for Vtiger CRM. Thanks to this project, customers can be happy.

## Appendix
This is a simple customer portal web app that allows the user (customer) to work with tickets, projects, project tasks and view entities of custom modules.
Currently there are supported not only custom modules, but also system modules:   'HelpDesk', 'Project', 'Invoice', 'Faq', 'Contacts', 'Products', 'Services', 'Lead', 'Documents', 'SalesOrder',

## Contributors

Currently, we are the only contributor of this project, and have been focusing on the server side development since the beginning. The development is slow. Any people who are interested are welcome to contribute. You can reach us at info@itvolga.com .

## License

[MIT](https://choosealicense.com/licenses/mit/)


