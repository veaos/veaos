
<p align="center">
  <img width="128" height="128" src="https://i.imgur.com/RWUpyxw.png">
  <h3 align="center">Veaos</h3>
  <p align="center">
	  Veaos is a free open source Q&A and knowledge management platform
    <br />
    <a href="https://veaos.gitbook.io/veaos"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/veaos/veaos/issues">Report Bug</a>
    ·
    <a href="https://github.com/veaos/veaos/issues">Request Feature</a>
  </p>
</p>

## About The Project

**Veaos** is a Q&A/knowledge base platform written in MERN stack (MongoDB, Express.js, React, and Node.js). 
The motivation of this project is to give organizations the ability to set up their own Q&A and knowledge platform for the employees, so they can share knowledge between them by asking questions/writing docs, and collect it for future applications.
 
**Veaos** can run everywhere - easily by installing Docker on your target server and following the instructions below.

### Built With

**Veaos** is written in MERN stack (MongoDB, Express.js, React, and Node.js), using some awesome other open-source projects. the main ones will be described in the section, but there are much more that you can find out in the [package.json](https://github.com/veaos/veaos/blob/main/package.json)

* [React](https://reactjs.org)
* [Node.js](https://nodejs.org/en)
* [MongoDB](https://www.mongodb.com)
* [Tailwind CSS](https://tailwindcss.com)


## Getting Started

In this section, you can find out how to set up **Veaos**, both for production environment and for development environment.

### Development

#### Using NPM and Lerna
```bash  
npm install  
lerna run dev --stream  
```

#### Using Docker Compose
```bash  
docker-compose -f docker-compose.dev.yml up --build  
```

### Production

#### Using Docker Compose

```bash  
docker-compose run --build  
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.  
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated** ❤️.  
you can learn more about how you can contribute to this project in the [contribution guide](https://github.com/veaos/veaos/blob/main/CONTRIBUTING.md).

## License
This repository is available under the  [MIT License](https://github.com/veaos/veaos/blob/main/LICENSE).
