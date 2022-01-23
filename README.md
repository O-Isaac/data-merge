
# Data Api Merge - DAM

Merge data Atlas Academy api and Chaldea dataset repository

## Acknowledgements

- [Atlas Academy API](api.atlasacademy.io)
- [Chaldea Dataset Repository](https://github.com/chaldea-center/chaldea-dataset)


## How to merge data
All data results data are store in **dataset/merge**

### Install dependencies
```bash
npm install
```

### Update and merge all data into json
```bash
npm run update
```

### Run GraphQL server (Apollo)
```bash
npm run server
```

### Only merge data
```bash
npm run merge
```
