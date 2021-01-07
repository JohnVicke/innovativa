# innovativa

## Group members
Given name  | Last name 
------------- | ------------- 
Viktor  | Malmedal 
Alice  | Ljungholm 
Evelina | Malmqvistt
Jacob | Svensson

## Setup
##### Clone repository using either ssh or new gh cli:
```bash
git clone git@github.com:JohnVicke/innovativa.git
```
```bash
gh repo clone JohnVicke/innovativa
```
##### Install dependencies
```bash
# install dependencies for server
npm i

# install dependencies for client
cd client
npm i
```

### Process env
```
Copy .env file from slack and place it in the root folder
```

### How to run
#### Server
```bash
npm run server
```

#### Client
```bash
npm run client
```

#### Concurrently
If you wish, I made a script that runs both concurrently in the same terminal (shell):
```bash
npm run dev
```

### Notes
Save all sensitive info (api keys etc) in a .env file

# License
Unlicensed

