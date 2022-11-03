# E-commerce API

<div align="center">
<img src="https://saasradar.net/wp-content/uploads/2022/03/api_rest.png" alt="MaterialUI" width="300"  />
</div>

Languages: <a href="/docs/readme_es.md">Español</a><a href="./README.md">English</a>

## Api Documentation

[Documentation API](https://documenter.getpostman.com/view/19402742/2s8YKApk8i)

[Deploy](https://e-commerce-backend-jade.vercel.app/)

<br/>

## Features

- Create an user
- User authentication with passwordless
- Update user data
- Payment gateway (mercado pago)
  <br/>
  <br/>

## How did I build it ?

This API was built with Next.js, using the Serverless Functions architecture. The code is written with Typescript. As databases, the API is prepared to use connections to Firebase, Airtable and Algolia.
<br/>
<br/>

## Installation

Use the package manager yarn or npm to install the project.

To run it locally:

```bash
git@github.com:ayrton08/e-commerce_backend.git

yarn && yarn dev

npm install && npm run dev
```

To run it with _Docker_:

```bash
docker push ayrton08/api-ecommerce

docker run --rm -p 3000:3000 ayrton08/api-ecommerce
```

<br/>

## How to use

Apart from doing the installations, it is necessary to add the environment variables, in the **.env.example** file the necessary variables are declared for the project to work.

## Technologies

<br/>
<ul align="start">

- <a href="https://nextjs.org/" target="_blank"> <img src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png" alt="MaterialUI" width="40" height="40" /> Next.js</a>

- <a href="https://firebase.google.com/" target="_blank"> <img src="https://www.gstatic.com/devrel-devsite/prod/vab7ee6e3641f10848d404faa598f256587df1a361a1e70cd114230c2961b73d9/firebase/images/touchicon-180.png" alt="MaterialUI" width="40" height="40" /> Firebase</a>

- <a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> Typescript</a>

- <a href="https://airtable.com/" target="_blank"> <img src="https://e7.pngegg.com/pngimages/444/851/png-clipart-airtable-database-spreadsheet-logo-application-software-slack-logo-angle-rectangle-thumbnail.png" alt="typescript" width="40" height="40"/> Airtable</a>

- <a href="https://www.algolia.com/" target="_blank"> <img src="https://midu.dev/images/tags/algolia.png" alt="typescript" width="40" height="40"/> Algolia</a>

- <a href="https://sendgrid.com/" target="_blank"> <img src="https://avatars.githubusercontent.com/u/181234?s=200&v=4" alt="typescript" width="40" height="40"/> SendGrid</a>

- <a href="https://www.mercadopago.com.ar/developers/es" target="_blank"> <img src="https://yt3.ggpht.com/cmFrex7B0vUrC-Tu_dD1EyFDpamtb-SmV45S9lbisLjCZtYMVi79E-hpb9O3x5-c1u-UZgTS=s900-c-k-c0x00ffffff-no-rj" alt="typescript" width="40" height="40"/> Mercado Pago Dev</a>

- <a href="https://www.mercadopago.com.ar/developers/es" target="_blank"> <img src="https://atix.de/wp-content/uploads/docker_Logo.png" alt="typescript" width="40" height="40"/> Docker</a>

</ul>
<br/>
<br/>

## Tests

The tests were performed with _Jest_, to run the tests use the following command:

```bash
yarn test or npm run test
```

<br/>

```bash
Node Version : > 15v
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
