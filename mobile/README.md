### mobile

This is a mobile application build with react native and expo. You can start this in development to consume the graphql `api` that is running on port `3001`. First navigate to the mobile by running the following command:

```shell
cd mobile
```

Then you need to install the packages that were used in this project by runnning the following command:

```shell
yarn
```

After that you may want to generate the graphql-types for your, `fragments`, `subscriptions`, `mutations` and `query` documents which are located in the `src/graphql` folder and are files of extension `.graphql`. You can do that by navigating to the mobile and run the following command:

```shell
cd mobile

# then

yarn gen
```

Now you can start the expo application by running the following command.

```shell
yarn start
```

### The App

This app have many functionalities but here are the basic screens for the main functionality of the mobile app.

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

These are the basic functionalities of the mobile version of `petmall`.
