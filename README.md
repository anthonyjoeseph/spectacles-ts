# spectacles-ts 👓
 
Practical Optics • Unfancy monocle-ts 🧐

A facade on top of [monocle-ts](https://github.com/gcanti/monocle-ts) 

[Blog post](https://dev.to/anthonyjoeseph/simple-immutable-data-w-spectacles-4nb5)

[Try it out!](https://www.typescriptlang.org/play?exactOptionalPropertyTypes=true#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-K7VSfITJnSwz5MPsU-8zVKnP05Y0366YAA1Z8wrX3aa9eS4DdiDNgYVYCmrZmLM8sfTZ5DEBUMOcwy+Fzyq3PqsI6aYjqKuRkd81AKjrRAtMeo2F41EXrVwfYzFrjZkEv8YPfV58yWRNibPSlTLhbsubu3eQetjb-1ipbUQM1a0CzaEwGkJwHakW1ZgA1uIIV+s5erUywlIPyDfurflhRhXYoldC2V59FXXskFU9VglZ2-BNcjTp9roGjPdbYL1104PBt2KQ3ZtDGGnMTdc3h9zs2tUkcWzUcjfm1sGqC9txj4XIt7ei-hWLj4eN8fPcD87wnLJmSu+llKD3B3Pea++97n3Ezfd+44bFdrAfQ+fADczXK4PU4N5smX+PUe-L+i88hByUeDfK7fSrWKccTBB+rgDVPFM09syN+zDPnM1a0++onemOuGflRBnrU2WczZffNnVnO4Dc5W-59b4XBfbeF5Z9jJ5nwNBBxd+Xx703iZSpJh3CiDnmJKPe231nXdAsx7NtTdv3ze8jX7hDAfhujZD0zgn7fI-Ss66TuP5OE81Hwx5ubXnSNc+W6tmjfONu58tbtgvgqi8szgKXuXgkK9pY4Blgt7KLf26veQhZSzHFwAh2z93rBO94twzUNAoDuUL-Zwt4-BXM-KAPNFXEnWPSDQDclWHf3DnHoWZdIG-a9BZFCBwZ3NHF-dvbHOHCYauRgZwAAaUYDOEjTgN-R9zFXH30xj2M3j0-xAT8F-zZxT28wmDckIOIIaDwI4MXhS0V3P2VxjS3UHT72syFWb35W4KIJOBv1vwUUeTXHQIQ1bwoKxyqxwJqAtWuGN1IIW270a3IMJ1a2hWJ0nwgLoOmwI2TyXzT0YWLzgC0JQnxyWwo0z15zmDowF1Rw23zx5UL3sKPz4OANAKELjQC31R3QcO0L8CGCe1DRe19U1znm116B+z+310ElnTN0s2vxN29xL0awkNkOvWx20HIEEhKAAH1sckAVY+N+AkDyFqiqsyjzNftVCbDXQ3IMMKiDR4iOjS4iAFlvAoA40p0PU4BmiPcGZiCIBkBzMOjujaUoDGUN0LhGgYRHkOVBU2jiEQpuBKU0NsBzoZiTg5jzM2QFtk0Jg+NfsEcgho1LhNiwAOUOjhjoA404DCB0AZDej7kmE8Ba4IBvlAhIhJZmxzoQcG06BkBzpKjHiNjGAtip1k17jJiETnjXjI13jRjzoviBRfjXQgYWgCCKE4BTjzjBNJB4pKkvhdYm8ahtASTYjRQLYagVhQEAF3ocS41BoDj7NjiCDLjU9+I+B4pUpyBq48Bq5UBOTESOVmTUSHYy1sA1YZQSSQR7gKT5imSCCRg-I+TDjUgYBzohSbDRTMp+SjiTSzSOdBJI0VZAdHT9o5g9o+BLTV4CBfATBfApZZY9ZsUHZrorTjTTSgRhTORO0sZRTUohg+NmSNTXosY+B7oZQYAhwYQ1SagNSyTa4MzGBpC5iFS9TBIDTLSjTBSIybgLSEAQzKzzSOjHTkVnTlZXS+AWhyyBSTSgyZQCDwyeyGwACiZRShhYz4y9TEzUzBYpyPxJYPjNkRi40ezDSuzTSqycgay6ybT1z7T28mzlY9omU9o2zMo-YOchhDyQo9oQ4A48p85rpdShgWhzyHZ7csZ8Q0MTgFyPiGT0YVzrS1zzT3TayKztyGyHTDzmzDyXS3TTzmIYxLzlZ-Y3SJSezHz4KNhXyZzKBmxvzcTlzOyALbSrjgKtzAK7TGzIKDyjy2z4oiAHFUKiYyLHzK0HFzodNk0Wg9p98G09ohNoyZzmAAk8KlyiZ-zQziKRTSLQLyKrjKKnToLWy3T4oYQolGK8ZmLmTyBIkTSOL+IuLVKYA+LXyQgeyeTfysZxL6y7TpLVzJLIz5KoKaLlKOR0l1KmKZKWK-UEkkl2LjD0BOK9pXKkljLhyZyP4QA1injGATBVhiyhg3z0Z8h2AoANRGAMNUzdQah7cUza8Hj1iYRYqQAm8yiJgZZiAEj30kBvgchHpU8hQxQKrqMOdRgfEZLyqwxsUp1yBqqCBaqbCGrMAmq6rOQGjlVXR-ibQgSQTHNwSbQm8OrKqAMdMA1DY8YSSyTFquKaq+K4y1qiYcz7gtqNYmq+KuArKwKbK6hCKJLwygKxy4A6AnZuyg5mKerGRKiyS9SGg+yGj7y8YCCBy4BErkyZz2zjqdqhh+KZQ0qMNlU0TdA6SeVTN3xEaYBdZHAOiLYVS7kVjvpRQCRFyGgdNUz0zoR3oSbRQPyCAvy8bUyOS8RETib-LUycKbRmaJVUyhKUqObvVUyIrebyVWbhK6aJhdRei1dI1BiZTQFtiJi0aMaiAuKGauTQqmUWhBMOix0uk-KJVp15akbHAuK2a8A1bWhNbR1-EUrdbvUE1-L9aahkUFb2AlbjYvF9ZoaGhYRhE15QBtD3htjFj0qOAJiNaR128WgCQCBD50AwE8aXpobHa4A8zybCzYSp0g64asYnbDbXbqaTg1bV1naja9oyaYRC6mUWrI1tTzNVri7XbCaPiK661+ipahi5zcTxjroc70aXauKcbm7Rlc7jaAkzah7e6S6Iq+LL19QZYCRHgoFgETBAhkABQo13AQAch8QYA3JAl9QkkYBhw6glAXgCgNiIAcg5hGBUAFBXlV514YBJAMAbRpARtrhQSwxrQ8AbBr1JrATgT3hZqv70Bzpa5eiKha4OiCTAcKhEwGha481oHYaBDI1YGGgJ1OBYlEGfjDcmUlioA0SoTC107eimSa7BNL08rHrfA0NmxXQ9ovToQTgh9HNnMTdB9g9WGJs0TwdWjtBM8OjI9yBcwOjcwOAaEaASgGGwAmGWHxtsNXQdMOjtAJiVqag+MBGIKJiVH1HqHGzGGwE5HGdE5tGZGwFa56cuHAysZ+GqMtaMGojIgYByBAtEVa4CA8FE70YsibVtAzGThwCTTWiyKtCnGdzBV3G8Facg9LH5HJsiY+N-rbG5prpO0NG7HR0HHQnsgXG+c3GPGYjtHsieU-GmHAmOVyAQngAwnzSImCnhGwA0nzMeH-GLGxtjGKnzNNGx9-L-ZKdunfUWgsnqmcn088mLRInCmk7smiV29UoKhMoOc8pVrSnzHYmOnWjJmoymUZnGzkKVnWn1msMFTYjk6CntmGhdmHSby9oDmmG2nh9sVzKvjuqzm8ELnzNDn2njnNnzmbjmmqHVmAmzCgnK0DMOiKLqCOj5nMoHHdBnYYQ+BdhUptGWgyL4WPYYRyByGHamUZVGyzYJipT0AZbGaYQ5bdH8WHS6KHFbmk63q7E2K9KuKeKvZPbo8CXDK6XAcGWdKbak19K9ouX2WqW9z4pgqjKJiGW0lfLmWgqfKjKRXwWHTkL2GMLWJuXkUGWo6Y647I99L6olXbhrnQ41XzzNWeBPLd0O7Pi9C8bOKXzKXlW5mOyEAHGU6YQtcaIUWk6mSyKPXGAtdsXZidTcXzljW5nYW+U4Bvb76-aUJ3g+Brq3Xo3dBFkWRln6WrXagNr7hY3fanYE2YA9q02WIGjM6Q7u7zM0WZKZVg2zjQ2vGGgGWkBc38B82ORC2qES302LRfp-m-Xa2DN63KTp1KHr0xHaGbQQQpH3AaDEKgrFkvxIY5A1p3EoFyEVdf0QWSAjCJUXp3w6APAwAPBD3XLojFH-L3wpDiCIWFtXQyCagRHI1J2JH0AZ3lY52wNbnejAnd2I7XGLRvkWBv5o3DBiBi2Jit2sZgPnGHYHtymyLwPRm7TyBwc6Bz2nCYCQPA8jHQ9hHj3T24Ab2TgGmatroMOEloj-rH30YGHUB53RQmmj3D6PA0SEOQXbUQW73U9hGt1JT8CBOeCePvM9GX2aG32gReilGX2t0JiLV4ETA14kauOaChOmntAGOwNVOwM+PeghOhPpCyO0SFPhAlPaH6TAmRPdViP8Dei6B0Bynt21PSxRQGauD8CTcwolEWoTcGbWaukGgLpuCQa4BDLm33bzpuDyB8HQuJWIuAlzp8H1PUz86tcPPnAXpUzG7Rj0vatFy8S7WQvSajmD9uCsvRQBbo8wNoWo3EUO342qEk3FmFtM3vH9q8YdW8A4623LXcRUB+gTiQ3bPnByAGuu33hp14gaSRvmSZzBYtUkAuvY6zhevxv-bi2Rq0Usr0ZkGCHRQy73pyuRhQglulRdXVvST7hAm9ruDVQCabWKZlueurv8ArPI0YWU3EUMXPYkXUpAcfvAFw2wNbvPPcrBZ4bAWtOjMdOjNrOuRHr+ORvDPb3dDeOxP29X3mwpOLFHPOPnPdPXPrp3ORuTcKhvPGExxZPCxPVmoxw9u+IQoKgGbRGt1AcWeGeAvcLqGITivRRwueBIvovLXVy6AkeZXdL7bBWJW+K4uFWEvrayKxf9O4A+W5XhWUuqaoBPy8vW3XvyThvlfQfnB7vrocveg8vnmiu7OSvvmyv8CKvroqv3vI2vuLR1ui3mu3fOBS2M2fXvGgbAYgbro1ufbO2NuTca7uC9rSTq7hu7vkVyu9SmVfftRg-+BA++u-ABvGBzplfrWCuPeqFyBU+oBrisY9vSb8zge4ePvXX3X8zpDvXAdNOaDzKA2jPEeVfheSOyO8Hg79uzfHu+iG0Bj26CvlftnfXof3hzKXffVPu4WEXGA-uAfl+8WQW9ODORvO-cwp-++MqxbIe5CghW+wM5-uO0fRP8-ked-Uf28vjn3MeJPsfeieSnOahe+Jhcx3wLYEC1TeuBxfroNxro39Am06ILlujm6ihweMoZCKhApiADEwwA3PqAKR7gC9qyvZkqMFO6zlo63XS7mSRI7G9TeMoG5LABr4CI4+DbLvg7GRRsl0YvXNAb0Bj4dErOifTzj9Q6LMDAcWA5PpXx7I7dV0yvRbkDWe6EDruILY3vN1IHi00SDnD-nYnh7vgW0TUGEJwEjQWwSelNa6CbW6Si1roAvHQXAPl4GCZQaXZIoLWhTZcbWeXYwTUE4bjYrB+NJ3qsGcFV9ya7gh7kTTMHi1pU0LBZggCWb+9kUqgz2FAC4rm8x64eADFbAtZhD1BytWUn4GiEEt6KDgeIQKHCHG0ukqQ6llywmIJCOABlUJHkLFYy9ChWQxIfK3SRlCF+LXVPF72CGVC1BxQvaFPRFZ7NDWmQ1oREIYba8aaWuOoe+jPILYLyLQ7IYu0XJDDOhKrBKj0MmGODGcww2ITcwmHVClhz4FYWKlSiuslmo5dYW0MO5j0ihfQqIa9BP75cPiigkjsoO-5gBRGL-adioKqEWhNBD3B-F4KH6oEKaLNUUOQNxrGC-BTiB4Q6QQJUVThkQpdmeDOpbcI2vqW4aENeF9CARsIuAJCMXY-Dp6tgS4SYFYDYIt0-xRwENV8C2p4ev7AIXVwtALJsgbXZFHiIJG9AiRnpUkTSJgBNMYhOwgAFQNDOQdIkftsl0b4MTOIzGAOU05Hvw5KJQSWu3gZGykmRbkFkbnztTydRR3AJUb0HFEcjKR3vUZMvyRa8ibg-Iz7oDxX7It-mEotKFSM4AzM+AcwQ0TkH5EzMLRIopxuqJJEFhFBlo2jmkXh70Mf2-gj7oEIcYApkIRAPgDyN1GmiDRuotkfyNDFvB-2vqFWKtU+5pFgK0Y80auhmbuivSnozjoNATFZAIxmUOMRKStEIB0xmUTMalG1FBjrReozFmaIdHGjAhNYl0VQ0mbijyRroGUb6jlGEjFRHojtBMUma5jfAmozjiqMpY6ilmuwBsZM35GTNoW9o3UdoCiQcBYQ+QNrr6w3FQAtx0SVdJMwtG1cghrXVce6wKZLiCm-zFWGiTHEajuxV-asoGLmbBjo2RY8MZGLnENiyxExT8ZRVWpsiVxDY9caCQPE7iu05mPcQeIdibJsgooeBgU3HH5iaC50QsXDGLGRiyxHItEn+zJHPiEevowie1gPaON-ghE10DMy1EUitGvrX7P8yuZviWxWYwHPhK7FTjBUxEiOjOkZAzMRg7hNIuQH4lNMmJyYwlknXYkFMtRaHdoqOl4lcUzYAk9fHMCEnKwlJok0UaeOGZOMxSIQ6rlPg4loT2M3EwZgpJmZIYlJ6tcjGpIsnqTZejErSfWKjH6jdg4pCYlJLwQyTdiWtBSSaNcnli4hyk8IqpN+zkB-JTYv7pZIclOsaC2KIydpxMlySeJgOFoPxOsn6pbJoohKmiRQk+lJY0sPwHLAVhAgCJD-KUUoNdQTAry3LK8vsxqBXk1hDU5WBUBvK7BapaUPYa1wOHNTBoSzVcc0N6ktj4oLY-3iFD6mtdk2g0k3BNMaGBDppyKT7iYD+4djLhW2bfKxjgz6BBGvTU5qZIjy7TXQfTEoNtMybRs7JgHTgJM2hrIoxJIw9VuMKrbrTmMO+HlJM3IAhS1JhrD5ndNiHPkxh3LJOs9J2ybTLM70lSWpPPIfNgZvhUBvU12Iac7iOIy4XlN9KFTipkQMqb6khaVTXeP4s8Y0P0koSix8cYRCOJnFVSsYNUh2HVPmE0zlYTU9GFeVam-R2p9M3YS2J6lMyKx-U0aezOGl8yqZPMyaYLO5mzS+R801rvpKWkrTKWuUpUSTJdpkzvRFUpad8FgCchPxHaEsQgGWnIs8J6snADcC1kqz0e+0gDC1SkYuZXx9QgmXyPnG6jFx+k5etvU1mYT4p8MwaOmIqC1iB2SM1domHXYwIgg0tZIYHTaqrlWiFPCKIWBCgM1dyvqfBuzwH5Mpnsl6NdrYmvSDFzKGdEoDJ3bxzpkUSc82uHUGZW90eBJadIDjVwCCA5Qc69B3xDbhys+OfIbjQNaLkMBhJwfloukaIKJuAPyaAGkEMDMI0MfgZuVXQLnJyMMqc+IunMDmZzyERfAOnOkjRgxyAYMSnKQzeI2tCuFcn4p2mRQtAwYpc99GHVWr4NEJjIchlqhronyta+DLxkXIH5Xy+x76AecgCHmMAR5oJdtGQ2G5zpQgd8hKqtTIo3ygFw3deeaVfmt128H8r+T-PEbjywYLQcBQbxoEnztmWrGSmgrvk7kr5l8oUQPwRq9tMZrRZebM2xkVSW2jIfXhQr2pKNfoLQehfPPrnkJFqXVMbsIj9FxzAoroChdsV6Kxt4eExBgTVS9rCIZyQ1TqpUlIWcKY2wiULjt1rnXpbsRaNDgMwOn7sEqvY2BYkWIAPMrGHKTPIfNrq6M35AGd7KS2MVUZTFF0LurPNH7NpiARVGxUQDsU60HFLdJxe3iSL9AUiaRPXG4o8UQkvFALS4e9jbTjzkmO07RRLT0Ua5iA1i5JqYuez-MLFb2FxXFRSUTE0l5ihJZYuIBa4dc6RYJbkviL-NhRVDPxV9lSK65-sMSvdkBh0UwZNFAGIZudNFG5MPC0ba6aqKcZdDAoj0qCXkphrkTKF9081qtVGW6MalAS+pR7PeaVLiFOI69O9lcWNKemcS-phkwjo6TRml0t5lM0By-SdhksxoaxKTrrK4qWzK+acpIDiyjRU0qWdMoqWrprlxVW5UQsP4RKklYczZS1m2WtLdlgzfZc4zGY9L8mnjfpRROYl2yjRlywHFYrDlfKxl9y4WY0PclVsZlOzJyXMxpYOB-eSdHFZczxUL8VKoSIldXLeVoqyV76VKOKwVZUrkUJK9EX8tlqoqVF5Cd7IYvkZuLYlzS0hm0rFQdLEUF08ZldIKY3Txls41roiqRFEBeVHTVFbo3RV+x5h7DRmcSppWzKDFpXRZX4CabCigAA)

![prop video](readme-vid.gif)

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Installation](#installation)
- [Examples](#examples)
  - [`get`](#get)
  - [`set`](#set)
  - [`setOption`](#setoption)
  - [`upsert`](#upsert)
  - [`remove`](#remove)
  - [`rename`](#rename)
  - [`modify`](#modify)
  - [`modifyOption`](#modifyoption)
  - [`modifyW`](#modifyw)
  - [`modifyOptionW`](#modifyoptionw)
  - [`modifyF`](#modifyf)
- [Operations](#operations)
- [Social Media](#social-media)
<!-- AUTO-GENERATED-CONTENT:END -->

## Installation

```shell
yarn add fp-ts spectacles-ts
```

## Examples

### `get`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gP4deleAg5Dy84AF5kVDQACn44CwA6YAATAB4kEwAuKQZsqDQTZN5aMTgAqGA2AHMAbQBdRUwAPmiASgAaOMSwfDBoohMiDq7ZBJ6g-oYhzvjRyuS0AA9ogAZh1v5ff3g2NAC0ZOz3XlTyyqqm8LggnS8EqrQYY7ZojOykXLgagYYOInbiAscEQGthMK0gA)

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { get } from 'spectacles-ts'

const gotten = pipe(
  { a: { b: ['abc', 'def'] } },
  get('a.b.[number]', 0)
)
// gotten: O.Option<string>
```

### `set`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAPK58hEuSp1G1GWG68BQ6PHFTZYeQWIheEDrTQUa9Jhq1sJtAYLYw0UHBI4YAIhIwEoiSAFxwUGgSACa8tACecJQwUMBsAOYA2gC6WPwxaFYSUXAcvClwMUESEYHB-PzlbJXVwRpwALzIqGgAFPxwRgB0wDEAPPUSAHx9AJQANIMjYPhgfUQSRIvLGqNshQAefQCMO3ONzZUMaGhsAMpoMHU1XVU1e5RPG4cJAF7bPptCRzIA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG+ADtMUbKgDGWACLpUcAN5xUALjlwKy-ghAVOcAL57uyDKOqooWURH4BneGnLKp5XpZvx+GWxmSPpcALyIKOgYABT2qAA0ctxwCsqysXGqCUnJcAAk1hgwyowAjABMAMxpBnG63LoAlEA)

```ts
import { pipe } from 'fp-ts/function'
import { set } from 'spectacles-ts'

const beenSet = pipe(
  { a: ['abc', 'def'] },
  set('a.[number]', 1, 'xyz')
)
// beenSet: { a: string[] }
```

### `setOption`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAPK58hEuSp1G1GWG68BQ6PHFTZYeQWIheEDrTQUa9Jhq1sJtAYLYw0UHBI4YAIhIwEoiSAFxwUGgSACa8tACecJQwUMBsAOYA2gC6WPwxaFYSUXAcvClwMUESEYHB-PzlbJWUaDD1IQC8yKhoABT8cEYAdMAxADydAHz9AJQANEOjYPhg-UQSRIvLGmNshQAe-QCMO8N7bTCOPGwbhwkAXtv8c43NlQxoaGwAyu0RGQjG68KY1aZwHpXTr9arBOZAA)

```ts
import { pipe } from 'fp-ts/function'
import { setOption } from 'spectacles-ts'

const setOptioned = pipe(
  { a: ['abc', 'def'] },
  setOption('a.[number]', 1, 'xyz')
)
// setOptioned: O.Option<{ a: string[] }>
```

### `upsert`

[immutability-helper equivalents](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAVzAEwIYwKZwGZQiOAclBARlQCNgAbYGATwFoALDasDKQgKG4GMIAOwDO8YCM4wA0hnpwAvHG5xEKdBgAUylXADecVAC49cCsYCMAJgDMcAL72ANNpX6XOo3A2oAlAoB8XrruOnAAdBGozqGhfMaElHw8MfY+7nbaaUA)

```ts
import { pipe } from 'fp-ts/function'
import { upsert } from 'spectacles-ts'

const upserted = pipe(
  { a: { b: 123 } },
  upsert('a', 'c', 'abc')
)
// upserted: { a: { b: number; readonly c: string } }
```

### `remove`

```ts
import { pipe } from 'fp-ts/function'
import { remove } from 'spectacles-ts'

const removed = pipe(
  { a: { b: 123, c: false } },
  remove('a.c')
)
// removed: { a: { b: number } }
```

### `rename`

```ts
import { pipe } from 'fp-ts/function'
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import type { Option } from 'fp-ts/Option'
import { rename } from 'spectacles-ts'

const renamed = pipe(
  { a: { b: 123, c: 'abc' } },
  rename('a.c', 'd')
)
// renamed: { a: { b: number; readonly d: string } }
```

### `modify`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcADK58hIiF4QOtNBRr0mMtG0oCh0eOKlwAkvILFSmuo2rmAJnu4wAngMFsYaKDgkODAARCRgJREkALkiGGLYWEAY-LCx+FzUJKAwOXkp4JzCJGNDw-n5c-XgIMG5eCVo4AF5kVDQACn44WQA6YCcAHlKJAD52gEoAGi7esHwwdqIJIimZmR65msWGFenx8sr8uGUnYBxgNCcSoubW9E7umrq2Bsm4NZ6Ts-d2gCtmkZwf4AajgABYpu9uuYehIFoVwvtxkA)

[immutability-helper equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gKEG4xszgASSsVUmcNJiCAEzQ2bnEBQXi0KBwTDgwAERMYEykTAC44KDQTaN5aMSkGYrYWEAZUrABtAF0sfn4OXkp4CDkPLzgAXmRUNAAKfjgLADpgaIAeHLyAPkmASgAaGfmwfDBJohMiHb3ZBbZYgA9JgAZz2cuDgeOGM93NrtiHE1K4D02H04NFckU4KsTF0gSDbNFgDhgGhosUoaNxuhprMBjovNs4BcwHN4YixJMAFajNZwKkAajgABYdoTZkE5iYjmC8t9NkA)

```ts
import { pipe } from 'fp-ts/function'
import { modify } from 'spectacles-ts'

const modified = pipe(
  { a: [{ b: 123 }] },
  modify('a.[number].b', 0, (j) => j + 4)
)
// modified: { a: { b: number }[] }
```

### `modifyOption`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgwAnukRwA8mG68sufIRLkqdRtVny+g8NHgAqOAENKMsEoLEQvCB1poKNek2082J2gKEG4xszgASSsVUmcNJiCAEzQ2bnEBQXi0KBwTDgwAERMYEykTAC44KDQTaN5aMSkGYrYWEAZUrABtAF0sfn4OXkp4CDkPLzgAXmRUNAAKfjgLADpgaIAeHLyAPkmASgAaGfmwfDBJohMiHb3ZBbZYgA9JgAZz2cuDgeOGM93NrtiHE1K4D02H04NFckU4KsTF0gSDbNFgDgxNo0NFiu5eCtwWtRuN0NNZgMdF5tnALmA5vDEcjBrxJgArUY4xkAajgABYdmTZkE5iYjmC8t9NkA)

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyOption } from 'spectacles-ts'

const modifyOptioned = pipe(
  { a: [{ b: 123 }] },
  modifyOption('a.[number].b', 0, (j) => j + 4)
)
// modifyOptioned: O.Option<{ a: { b: number }[] }>
```

### `modifyW`

```ts
import { pipe } from 'fp-ts/function'
import { modifyW } from 'spectacles-ts'

const modifyWidened = pipe(
  { a: 123 } as { a: number | undefined },
  modifyW('a?', (j) => `${j + 2}`)
)
// modifyWidened: { a: string | undefined }
```

### `modifyOptionW`

```ts
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { modifyOptionW } from 'spectacles-ts'

const modifyOptionWidened = pipe(
  { a: 123 } as { a: number | undefined },
  modifyOptionW('a?', (j) => `${j + 2}`)
)
// modifyOptionWidened: O.Option<{ a: string | undefined }>
```

### `modifyF`

[monocle-ts equivalent](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzmYYCmcC+cBmUIhwDkOYAtDAM4D0ANsAEbU4CuAdgMYzARtEBQoSLDgAqOAENKcAKK58hEuSrUZwGAAs0UAUOjxxUuABl5BYiF4QOtNBRr0mxtG0q7w+sZOkBJM4tJ7OkZqHwATF24YAE8BQTYYbRwJDgwAEQkYCURJAC4chny2FhAGbSwsfgibCSgMDl5KeDDMiXyMrP5+Btd4CDBuXglaOABeZFQ0AAp+OBMAOmAwgB4OiQA+KYBKABpZhbB8MCmiCSJd-eN5w-6ThnO9ra6eprhLMOAcYDQw-Jl5tSabTLJpQYBsADmOzga3WYwm6Bmc36gzYw2hl3m70+0QAYlN-rj2FxoFsplMAFZbMZwilwOEARgADHAAPyyea2HAwE7JYC0c5wP7zMEQjQ8ulkODMrYXOY+eYSY4tLJPLZAA)

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { modifyF } from 'spectacles-ts'

const modifieFunctored = pipe(
  { a: { b: 123 } },
  modifyF(E.Applicative)(
    'a.b',
    (j) => j > 10 ? E.left<string, never>('fail') : E.right(j - 10)
  )
)
// modifieFunctored: E.Either<string, { a: { b: number } }>
```

## Operations

| usage &nbsp; &nbsp; &nbsp;  | equals | Optional | monocle |
|------|-----|-------|-------|
| `get('a')(x)`| `1` | no | [prop](https://github.com/gcanti/monocle-ts/blob/master/test/Lens.ts#L89) |
| `get('c.[0]')(x)`| `123` | no | [component](https://github.com/gcanti/monocle-ts/blob/master/test/Lens.ts#L119)
| `get('d.[number]', 0)(x)`| `O.some({ e: 123 })` | yes | [index](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L107)
| `get('f.[string]', 'a')(x)` | `O.some([123])` | yes | [key](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L133) |
| `get('g.?')(x)` | `O.some(2)` | yes | [fromNullable](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L223) |
| `get('h.?some')(x)` | `O.some(2)` | yes | [some](https://github.com/gcanti/monocle-ts/blob/master/src/Optional.ts#L287)
| `get('i.?left')(x)`| `O.none` | yes | [left](https://github.com/gcanti/monocle-ts/blob/master/test/Prism.ts#L200)
| `get('i.?right')(x)`| `O.some(2)` | yes | [right](https://github.com/gcanti/monocle-ts/blob/master/test/Prism.ts#L192)
| `get('j.shape:circle.radius')(x)`| `O.some(100)` | yes | [filter](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L160)
| `get('d.[]>.e')(x)` | `[123, 456]` | never | [traverse](https://github.com/gcanti/monocle-ts/blob/master/test/Optional.ts#L215)<br />`Array` |
| `get('f.{}>.e')(x)` | `[123, 456]` | never | `traverse`<br />`Record`<br/> (keys sorted alpha-<br/>betically) |

```ts
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
interface Data {
  a: number
  b: number
  c: [number, string]
  d: { e: number }[]
  f: Record<string, number[]>
  g?: number
  h: O.Option<number>
  i: E.Either<string, number>
  j: { shape: "circle"; radius: number } | { shape: "rectangle"; width: number; height: number }
}
const x: Data = {
  a: 1,
  b: 2,
  c: [123, 'abc'],
  d: [{ e: 123 }, { e: 456 }],
  f: { b: { e: 456 }, a: { e: 123 } },
  g: 2,
  h: O.some(2),
  i: E.right(2),
  j: { shape: "circle", radius: 100 }
}
```

## Social Media

Follow me on twitter! [@typesafeFE](https://twitter.com/typesafeFE)