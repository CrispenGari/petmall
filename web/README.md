### web

This is a web application generated using `create react-app` you can start this in development to consume the graphql `api` that is running on port `3001`. First navigate to the web by running the following command:

```shell
cd web
```

Then you need to install the packages that were used in this project by runnning the following command:

```shell
yarn
```

After that you may want to generate the graphql-types for your, `fragments`, `subscriptions`, `mutations` and `query` documents which are located in the `src/graphql` folder and are files of extension `.graphql`. You can do that by navigating to the web and run the following command:

```shell
cd web

# then

yarn gen
```

Now you are ready to start the development server that will be running on port `3000` as follows:

```shell
yarn start
```

### The App

In this section I will show how the application looks as follows:

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

These are the basic functionalities of the web version of `petmall`.
