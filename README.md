### petmall

Online pet marketing made easy online.

> This is a full stack application for buying and setting pets online.

<p align="center">
    <img src="cover-2.png" width="200" alt="logo"/>
</p>

`petmall` is a multi-repo project that contains the following packages

```shell
- api
- mobile
- web
```

- `api` - this is the backend server where the database and storage logic is handled.
- `mobile` - this is a react-native client consuming the graphql api.
- `web` - this is a web application client built with `react.js` and is consuming the graphql api.

### App Mind

In this section I will demonstrate the logic behind my application which can be visualized as follows.

```shell

                        |----------> [messages] ------> [user]
                        |
      |------------> [chats]-------> [pet] ------> [seller]
      |
      |
      |------------> [notifications]
      |
      |             |---------> [reaction] ------> [user]
      |             |
[user/seller]  -> [pet] ------> [comment] -------------> [reaction] -----> [user]
                    |       |        |
                    |       |        |------> [comment] -----> [reaction] ---> [user]
  [location] <------|       |                     |
                            |                     |---------> [user]
                            |--------> [user]
```

- It all starts with the `user` or `seller`

  - anyone who created an account with `petmall` can buy and sell pets.
  - the user can have access to his/her `notifications` which are triggered when someone in the app:
    - react to your pet
    - react to your comment
    - commented to your pet
    - reply to your comment on a pet
  - real time messages are the part of this app. The `chat` models allows buyers and sellers of pets to chat privately. and each chat will be modeled with
    - `messages`
    - `pet`
  - The user/seller of the pet can edit pet details and even mark the pet as sold if the pet is sold.
  - an authenticated seller or buyer will have access to the notifications and messages and a profile.
  - In the profile the user can do the following:
    - edit profile details
    - signing out of the app
    - delete their account
    - change account password

- `pet` model contains the following
  - `location` of the pet
  - `reactions` to the pet by others
  - `comments` / `reviews` of the pets by others

### Output

In this section wi will show the screenshot of the `petmall` app for both the `web` and `mobile` version.

### 1. web

The web UI and basic functionality looks as follows:

1. Landing

<p>
<img src="/images/web/0.jpg" alt="demo" width="100%"/>
</p>

2. Login Page

<p>
<img src="/images/web/1.jpg" alt="demo" width="100%"/>
</p>

3. Register Page

<p>
<img src="/images/web/3.jpg" alt="demo" width="100%"/>
</p>

4. Home Page

This page is shown when you are authenticated.

<p>
<img src="/images/web/4.jpg" alt="demo" width="100%"/>
</p>

5. Creating a New Pet

<p>
<img src="/images/web/5.jpg" alt="demo" width="50%"/><img src="/images/web/6.jpg" alt="demo" width="50%"/>
</p>

6. Opening a Pet

<p>
<img src="/images/web/7.jpg" alt="demo" width="50%"/><img src="/images/web/8.jpg" alt="demo" width="50%"/>
</p>

7. Edit Pet

<p>
<img src="/images/web/9.jpg" alt="demo" width="50%"/><img src="/images/web/10.jpg" alt="demo" width="50%"/>
</p>
8. User Profile

<p>
<img src="/images/web/11.jpg" alt="demo" width="50%"/><img src="/images/web/12.jpg" alt="demo" width="50%"/>
</p>
<p>

9. Notifications

<img src="/images/web/13.jpg" alt="demo" width="100%"/>
</p>

10. Messages
<p>
<img src="/images/web/14.jpg" alt="demo" width="50%"/><img src="/images/web/15.jpg" alt="demo" width="50%"/>
</p>

11. Request Reset Password Email Link

<p>
<img src="/images/web/16.jpg" alt="demo" width="100%"/>
</p>

12. Changing Password

<p>
<img src="/images/web/17.jpg" alt="demo" width="100%"/>
</p>

### 2. mobile

The following are the basic screens of the mobile app of petmall.

1. Landing

<p align="center">
<img src="/images/mobile/0.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/1.jpeg" alt="demo" width="200"/>
</p>

2. Auth Pages/Screens

<p align="center">
<img src="/images/mobile/2.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/3.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/4.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/5.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/21.jpeg" alt="demo" width="200"/>

</p>

3. App Home

<p align="center">
<img src="/images/mobile/7.jpeg" alt="demo" width="200"/>
</p>

4.  Profile

This page is shown when you are authenticated.

<p align="center">
<img src="/images/mobile/6.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/8.jpeg" alt="demo" width="200"/>

</p>

5. Creating a New Pet

<p align="center">
<img src="/images/mobile/9.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/10.jpeg" alt="demo" width="200"/>

6. Opening a Pet

<p align="center">
<img src="/images/mobile/11.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/12.jpeg" alt="demo" width="200"/>

</p>

7. Notifications and Chats

<p align="center">
<img src="/images/mobile/13.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/14.jpeg" alt="demo" width="200"/><img src="/images/mobile/15.jpeg" alt="demo" width="200"/>
</p>

8. Push Notifications

<p align="center">
<img src="/images/mobile/16.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/17.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/18.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/19.jpeg" alt="demo" width="200"/>
<img src="/images/mobile/20.jpeg" alt="demo" width="200"/>
</p>

### Languages used

In this project I used the following languages:

```shell
- typescript
```

### Tech Stack

In this project I used the following technologies.

1. api

- `fastify` server with `mercurius` graphql with `type-graphql`
- `jwt` authentication
- `prisma`
- `postgres` database
- `redis` cache

2. web

- `react.js`
- `semantic-ui` for some components
- `react-icons` for some icons
- `react-router-dom` for pages and routing
- `urql` graphql client
- `redux` for state management
- `graphql-codegen` in development for generating graphql-types from graphql documents
- `localStorage`

3. mobile

- `react-native`
- `expo-font`
- `react-native-navigation`
- `urql` graphql client
- `redux` for state management
- `graphql-codegen` in development for generating graphql-types from graphql documents
- `async-storage`

### License

In this project I'm using the `MIT` license which reads as follows:

```shell
MIT License

Copyright (c) 2023 crispengari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
