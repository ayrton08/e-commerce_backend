# E-commerce API

<div align="center">
<img src="https://saasradar.net/wp-content/uploads/2022/03/api_rest.png" alt="MaterialUI" width="300"  />
</div>

## Api Documentación

[Documentación API](https://documenter.getpostman.com/view/19402742/2s8YKApk8i)

[Deploy](https://e-commerce-backend-jade.vercel.app/)

<br/>

## Características

- Crear un usuario
- Autenticación con sistema _passwordless_
- Actualizar informacion del usuario
- Plataforma de pagos (mercado pago)
  <br/>
  <br/>

## Como fue construido ?

Esta REST API fue construida con Next.js, usando la arquitectura _Serveless Functions_. El codigo esta escrito con Typescript. Y en el manejo de datos se implento el uso de base de datos como _Firebase, Airtable y Algolia_.
<br/>
<br/>

## Instalación

Use el manejador de paquetes _yarn_ o _npm_ para instalar las dependencias.

Para correrlo en local:

```bash
git@github.com:ayrton08/e-commerce_backend.git

yarn && yarn dev

npm install && npm run dev
```

Para correrlo con _Docker_:

```bash
docker push ayrton08/api-ecommerce

docker run --rm -p 3000:3000 ayrton08/api-ecommerce
```

<br/>

## Implementación de uso

Aparte de realizar las instalaciones tambien será necesario agregar las variables de entorno para una conección exitoza de las herramientas empleadas. En el archivo **.env.example** dejo cuales son las variables de entorno necesarias para que el projecto funcione.

## Tecnologias

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

## Tests

Los tests fueron creados con _Jest_, para correr los test use el siguiente comando:

```bash
yarn test or npm run test
```

```bash
Node Version : > 15v
```

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
