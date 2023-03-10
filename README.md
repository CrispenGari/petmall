### petmall

Online pet marketing made easy online.

> This is a full stack application for buying and setting pets online.

<p align="center">
    <img src="cover-2.png" width="200" alt="logo"/>
</p>

```shell

                    |---------> [reaction] ------> [user]
                    |
  [user] -------> [pet] ------> [comment] -------------> [reaction] -----> [user]
                    |       |        |
                    |       |        |------> [comment] -----> [reaction] ---> [user]
  [location] <------|       |                     |
                            |                     |---------> [user]
                            |--------> [user]

```

```shell
- api
- mobile
- web
```

<!-- http://www.geoplugin.net/extras/location.gp?lat=-32.9721835&long=27.909569&format=json -->

```shell
curl http://localhost:3001/graphql -F operations='{"query":"mutation NewPet($input: NewPetInputType!){ add(input:$input) }", "variables":{"input": { "image":null } } }' -F map='{ "0": ["variables.input.image"] }' -F 0=@male.jpg
```

### License

```js
[
  "CATS",
  "DOGS",
  "BIRDS",
  "RABBITS",
  "HORSES",
  "FERRETS",
  "FISH",
  "GUINEA-PIGS",
  "RATS-AND-MICE",
  "AMPHIBIANS",
  "REPTILES",
];
```

In this project i'm using the `MIT` license which reads as follows:

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
