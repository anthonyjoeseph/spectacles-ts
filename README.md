# spectacles-ts 👓
 
Practical Optics • Unfancy monocle-ts 🧐

A facade on top of [monocle-ts](https://github.com/gcanti/monocle-ts) 

[Blog post](https://dev.to/anthonyjoeseph/simple-immutable-data-w-spectacles-4nb5)

[Try it out!](https://www.typescriptlang.org/play?exactOptionalPropertyTypes=true#code/JYWwDg9gTgLgBAbzgMwK4DsDGNgXXAQwGcUAaOCMHPQkgeXIFNgYALRqWuAUTgF8UUCCDgByZGAC0MIqIBQAeiXKVKxQp4ANAIIBZAAoAZbgGU4S9aqsK5czHiLwA5hBgxG+ALxwwwMIwAKOThEQgAuUIAjCIBtUQJIzFFyUQATRmRRAF1+flJguCdGGAD4gDpIspj0VBBIjizkuAAGAEo5drsHeHqPE2K4b19-IJCkAlj4xKa0jOy8gqJi0oIqmrqGpoBGFIAPAE8AL1F2zvt0RzglmDoqXHRGVMGfP0CC8cmEpJT0zJy+fIha63ajoFZrWr1KCNcg7MQHY6nWznS6oMBLWCPZ7DN5jcJRCJbABMAGZcgCCmiMSV4jNvmIvicOsjunAoIwQBAAG5YoavUahCYEuDEknkTARZAEAA2S3JgLZHO5gXKSSRXQu8HZ6AIIF5LxG73xSGiItJ4oiUyS8oK2t1KtW9LSTLOrM5qWAyGA+pxAo+cBiJsJpP4-wV7s9+3B1UhDQqTWa5ACACtWoMAHxwZNwADUcAALOqUfAI8h9iD7j7+UahYG4KbRaGFiFS+W7nho+soVl4+RE3AU2nPJns3nC8yNZdWwB1YDpB5PPmGvFCxsCYiCiJdjhwAA+cAwv2AC+bcBnKwA-E1Bxm4AADAAkCFHcCJfDvRbdEA9ZYreFn85Vsum5mmS64kP626cPuh4ZMeWIUi236Rn+6DTpe16prej7Prmr7vuq1hEao6hwAAkgYxi6NwAByAAq2h0WRdA0eYNjERxNikUQ-jYAQmDSowRDSCQrAbhIIlcAQPiMBwkjpP46Dzpg+ykXR+z+EQmBQH48D6NKBD7E4QiHiQqR4KI8AAO7QAA1nAVmMNK0oOSwrAyTuCkeMp3pEKR2gkEQqCYKw5AsKIJAYAkglwDAEAoKgzn7HAoCQLAsXsLFGlCYIwhXLxMD8YJwkyPkSiEEprnOT4BDoMAmCuWwYgwNlKWarVOAEKCKUkMeXp1e40rJekjBgPIanxZgwBQJgtQ8ug8BsMARDkI5cBiTysXxQQqRPGwjBZf4cBHgN9wkCAtWoDKQ22Kl0DwDizzIGUOJyHd6Woc8dBlKhb3gPdcAmMIB3eN9QN6n9aXwNwbk7t43BlDD+1QJDAOGBk8Dw2U6PIDAqPpQASsATisJjPBlETJN43I6QCQQ7JwMWhTFBEADixQ04wdMM0zrYRLoyFlpz3MHbzgv7NO-Pi9OwsGTzX4-m2oJS4rv203LosKyh7ZoSr2ugjL6v05rmqKpyPIRATSo8rLxuM6ydp6pbHj2rb8um9cET9HjRvu5cwI617xRq1zGv26bVIcDAEQAKrolHtgtUd7NkwAPAUZHoMgHAKvoXXuYwuzuEpkXoLZ6AQFZ+CF8XqQkJn2ecBeVwwDp6BOHAER52wRCpw3HDpgqVvwDX3ml+XlfV0XY-kVnO7NxgE9V53cCs8APIgqn2gwN3rB93PUDkCYg+A4PBRmKPJcHmXFdVzEOTeP0Th6gtve7+mcjpgKYD513+dwAAMhbm3JwCoyjgOPB6KaQkIiZygb5AAYtAXeqdj4dFvIvW+U9a71wPgUBeN9J5wEvnXOAw8CghGbqnAAwt0KAwV3BPBISQAAQqgYA0pUioPIJgye6Yv4QEiMmCItDNT0OwI8IcmY14byoFvHe+caF0IYY8I+J80EhBCBEVuqADrMLgAACWIKhGUqCP6aLgM3AIgjhFwDYRwrhJhyAxGHjkfRMRUKpz6jubQ6YcjN20CvXhVd0xSLIRzCxERrFCIiPYzh3DwkwFCbechWiBw2NgQfMJw8ADcidWoC0Vs8dOIR+6HwKLvYh08r6717mUs+IQL7VNIcE9A99nhPxfjIVO78FSBO8NvFBZSj7kAAEQV2kFAAgPIoBEBlEQUZH8v4FB-mwP+TUgGOBAWA8B9MnBEFiOAsokD6q+UyfAoSSCoAoOPuQd0CCMASgHFyCI2gwnaCyOg4cA4hRlLCWUvJcgk4HUKfre4xSM4H1zv-fRtT96NwaYDKpODr5LzaQ-QGjBn4eG6b0go-S4CDMUcMwGYyJmt2mRwOZspFmf2-r-OAlTNmt2PKAgoRy9kHIDEck50CuVwNOZc5Bijblnm-A8rAUSXmEveZ8sJARflZNvDIxgm8SXH0BcCuAoLfw62nBC0pUKKkwuaSQOF9Sh7FAAGoygVE0lFrT2mPyxV0t++dEUEqJWweFOdSVwHGRASZlLZnzNpcskIqzWDrPcsy7Z7LdlQH2YciBSlBX8tTXyq5NyT73MeVK152TrUyjlbeBVmTG5hJVZvOJjjyA6L0aawxxA4GF0eNoTAmAhK92PpYxJNqXL7i9XvdVmZnYwH7eQC1p9NUFOlga2ejdoVNVhfnOpB9EXDwnefZFM9HUYs6Tit1bAPXPCHT6w+fqA1BpmdShZSz6VrMZf-WNrKdllE5cm45GazmzwuUQLNIqc3irzc8gtKSi3ShLd8stC6OBhJrQk+tO6r5GKIC23YbaO1drMb2zdMo9yEoUd6kdK88PSkneumdR1vbzuGca5djbzXroVP25DpCz3qrJYGilN7Q2Ivtbuwhd990usPT091dKVkMqZcA198b32Jq5TEHl36YG-rTQB71oquQygiP2qDmZom2L+beAF+TqPBx1rRo1IRKkrp7uexFrH9EcahZe8lUzeM0v42x8eWCnWYuxa-cTx7JMRuk8+2T7c30fu5Smv95yNPCq0yfHT0o9PFq+YZjJsGoCVvXqquRI6qMHStubEGcBz3kDs4x1djnw0JWcrvaNgCotOCyz88tcHbwIYPcF3pqKsEUcXW1lI7JyuiHTCV8JOo9TWcXfRgutWHMWoKDRRgVkADSjBkr6K2XJxpvnBuTwC313FEmGtoCaxFjZo2CgPC2ztiI63HuqXlYqitPX2HxKcYRoZbnRUkpe9t-YU3bBAtanHak82c6LaO0xhFCoEHHnw3tll0WChbsO-ovdHTRP9Yuw+qNT7bv7YxyEfqum4DI51OR+TsXlPxbTYlzNyW97aap-pjrMGTPfIQ4zsov2afFrrfQhtKLUPocw52og3bMwBKI8OgHmZ9ysYy+R3LYPzMHThdocgmZvAAH04VIFGaM15-AtdauN3VvXhKO1HbJx3bwDwZkG9imLo7ZEiBW3sFALhvj8FwBtw52yO2IDIEJUd1389jvL1iagSIkRBJxy3ife3DV9zcCLlM7Aqcw-7Aj4S8gTv+EFFeR26bbCk8p7AFvI7vvoBcKd+QWqoP3cxzqngOiEBM7uFmVzUEqd+26LoMgVOhvq-J8YKn3x-DpuT8T9P2fDeuZN9Ti3iq7fngIAKDETbbU4AF6Lx8yQF5+ZdRCiUzR2h99ZAVGMChmiajOWiowZ2fuuE4WzxSvPm2S-o5ODph8AXh3jkA0R4A0SJQGTT5bx37z5P5Ag6LYARC74WIWL75EiH7H6R636bY5Abjf4578QwCpz-5tbAFPg-656kHkGl5HZm69qMERCjJlCjJ8BUFaQED+AmC8TAAyjUJiSzLX7oGaLUEkFkFEgAEgLmKiFwDAF3hZCvJ36YFZB5KiF8DqHoEwBoiCSoGIGaKYGH50S6GMAg4R5wH4GZiEFUHEF-7SGsqUEIDiH2EUEMGjJMEeEsFsF8AxC2G-6kEGEWKbZSFBGaJO5hHAFZCKHKH4GqFaEWKaEGHsif4f7r5hFEEBFkEOHtxOEuG0E5FAHuGeErysHsFPijIxBO5ZAeH7ijIIB8DpjsFgFhF4FZBVGAGfKiFg6iH0xTL7BpH+4iHoGZE0HZEUEcHOF2EFFuH6KMHNzMH+o+EVExgbDQi1H+r3xNHvgP7oFtGrHdgGE9HoGUDKzhKf7DEWKjESF0GAF5HTHjH0FzEeELFeFLHsEXhEDAwtFyE8APFtFHzAypytL8IxCjJpa6KjJdHoHHEWLMDIyDFcIZH+FjG3EyGTH5GPF3HFGvGlE+EXiCS4w-FyGYkAlwA4ykEgnphgmEkwBQlHGAJhGN5DFhEhDXGuGl4YkPFomOE4n+pvFlEgE6RUzEm-Gkl37kCUykzAlCboCgmjLCmkz0m-GwnhG1AJ416MAmC1CWFZCqkhCuDsBQBbiMAzIJH8AFBg5JEQ5HRT6CTakgDX564FDULEDi4zxICFROARBO45KMxulcpO65DwwPGulLC9y+LkCekEDeltZ+mYABk+mAGW6fzPCd73A9595UqD73DX5hnulXytJP7NxoFyH76H75lglelQlKGICskBghEVlulgkJnhlQlcDskzGclhAok3FSETExFwB0AgAsCXEkn-FRkBiG6H74ERCNmNG7G-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-DhlFbgWXStZL2-AobqRoQfbZbDZh+yrJdZdrjctz919jAt9d4va57MUKbOKG7hr65FpR5R02gQrKlR7KKm+rLqQlLlLIO1LoCtLLLmzDL6rmrfT1+Z2CoN5cA+rUrBGAQxr8ETCjav7vaKHJ4U7eWSHQFeNnCva+HOHrQFrZxniMbT+drPAnrTrkrmJv7kpTDhDcpiDlDUJbrTDHryMqcDH4rBDDDoyJD9+arfrAbSkhcqBB7-jQVv7j7VkW7T+EV4bEnp1kbQx0bG2qpSN5Nc7FTFiyba7OKabp7O4w7zbObLjF9eTUABbSV9Z+4cHvxIQq75n2bBGQVL2tZB+gV9bhrzcCb+BK84TUIXbchE7znWeuw1btbjH6nXCbnIT5AIXA8Q9+56lUAM75l97C01jmj2jphIO+j17ASH7MA8jxjIOYrf7UrAHO2MLH1GX27L5HuuiXucVFxv7aXva77jT8jX7M8Z9pnnAt7l7d9N7V9d7RnC01X-7UrVXIN3XOHWFn8qNZX-XfTQHs3tX83izKrJLbN6HYHtT7uM9WrIQULEzYAsHSn1s7+dZohq7Vb0oNbwDsn4rZ2fiEQv7nbT+z7IQjs93aTh+z3r3dbiTpLNXn3tZP3QXAgC7fDpbK7g7u3+w8ninFikcsAOXxdKK73qQdlD3znq7+P3nR2RLAXhrc5R2+PvasPOQy3YREX7lGHC7xbS7SPA7h7fT8nYXIQz72Fr7B0Gr53SK+35OTaSkgknA15er0BGFj5YFlroFFi1HKvmi7r35T+LlEb6vAPYbuvAFT+On1KCvCF6pWvFiPl93evioO76vgvHS1jJ7Fd99YlRiUvHA4VYbpD39ODHvF7UAlF0Bvv4DXxeo-vtUgfnFOsof5DJDQeAf0vNJ2DLDAmV8mD7HifUfyfCpTDcf6jebICubCArv2fnvQfBVIABfM8nDsY6x5f0fzl-rhk6GNfGfUjrKMjvaSfXvCpBvqn7fpClR7DjfufJvMoQ-JA9REjY-ffE-0oU-94mjFdBj7vOf8-phMlvflfynRVwNZ3UHa2G2gH4vbKIQh3KK1TWz6AoRIQO-R2cHLTFslvGvLsTsr-IQWP95DvOFIHGDz-RgC8Ul5N9AB7ZMdqyiOxQse+G-Svt-3AEgDc+gPffsDRMCsAIAiUVIJ3iEgJl-AqCIDoc2d7ps5aVsRwAW2bhoCMBnCbAVwTwGkCkkqjaxgACoi+rKcga10YCiNPqwNIuoSwIHPA8KjaSgZgJoG4DgGGiXtEXW4C0DHghLSOun1IRDcL6k3MbqwPbjsChuo3K9owNPrECdwRdPgGUDUFOB2BRdVRrKyDrSCxBBLI-tjkbTIsM8QHZ4Gbj-4KCSASg52nnG1BEA+ALA4btqhUG309Bj1ISDmzd69ovBHgY5iihcEq0hu7aTAJMS0F30n8EQKQTIJsGNNU4OESIRcF8FPh6BOxe8E+ASFJDAhd9eQUQP8HJDjBGgk9skPCFexpsntPgWf3dyCCUUwg6gQ8BkFmIg8ntKwdwVkFQcJBXsKoRXVaDBDF6HCdgZ7WsZGD-B2gXGBwFkquA7OPXZYVAFWF4x3KntHQSXVqELDtGjdWYY3VEZm5mhjdQYf4EyFdJ8BbQp3qfRPYS1chPgvwRMKmGFDwhzcV4UzRVr0D5hUwpYf3m2HrCxKwIlYa4AMLOxHAqQ6YdKGuHDCshOQ42HkL8FfD5B02I5vcPsGKMEhQHALP3RdqXAz+zwXgSMP4SPCMGODBIaIxHrHtahKQsStiJaEUj56DudxP4gDBF0GecWMoAkPIA8jI69ImIT-SDwsjG6cg9kQ1E5G9owSP9XkQLgFH+oFRwooOiZ0zpB0QC3w6bt0lZFZDRU+I2Uc3BiBF0xkCo2ikcmVFmiVRHHOkeqKeFTDkhoBcUX017j6i7hhojkTpS5ExBNB5QsAraMVFWiO05Af0S-TG6BjMGdo0Bm6J2qSi2Rjg40dyKDrBjwE1o1MULx4AyDeCXMfgtKEEL0wiARIHEd+yPpi9TUBQOor-TqLt0qx-qMejWP9QBAx6rQJsRo1qFr8CMOECugsLL4hB9wPY-NheFqHhDBxtQlxv2O7G1CXe+bHUUNxMDaDQG02AVKzmuSKJ9AAzNFESKNGNpcc3gVOt4E3FO05aNo05vCILrEjcetfA4g0Axa9pVxiCNnPGNNp8jlRXDZeleLbrVF7xzcR8UKnXHeow6b40MW1j1Jwj-x-6Z8cBISFb1K84OG0gdERG5ipoAhIQt2n4GPwTOHw0vnOOoYyDch+0IgMtD6GgNfMBhasRRM2Kj9RCdRRsVRNGQtjGibYqiR2NwnF8uxFiccexLYF9i8JtE4oTxPUEjihJJg8IVxMEkV1Jx-E9AtxIrqzji+84k9ouKZGf1psiIwiV5RIluC3C3gBcYVFgCspXhZifIQgBUl3gsRBknAO3GMk6TN8u4sscswhqLIqRhfUSUEP8Ge12BVVJqkZNRHujG6YYkoR2j4ABA7wcEzAO012CdMtUBFaAqpRDJ4MeEEnE1k8DNbQFMw+iA8kRwy4rx60UUmKa1G9zyNrKszWUtTRykzJaKfFHSvI03xt4-EvaJDIzzkAdMAYWqSrpZQSl-EYub3MpgkxPwt99gLHBAohJ4BZxoAnaQwCwAJrShupAVRtIEmbjZToquiAqe1NaiJcOo9efRCwnIAsJT0f1VfBcXqkvVZCJolhNpRRRaUQqB5OETEABqtYgql0higeRMrLSMucIjoTPG4ATSZojAaaf3lMT-UymT08xpdKHrQMHij0oBM9MNpfSYqjaX6cgEmkAyZpUyOaSwgemgzYZ4M8CSrUxIwzSmEPPaRQThF3T0uZpYGil2EJ24tpuXB4YlLGJ25geGTQJiOwWi1kqajRGIPTNCbrT0oWqfMvXUbZOD0pETbwHzLTzu47GQHIPE51igxkIgdjMLq2TUw0yRZdjVUhFxalaoq0cidGunQdSDN2hiMiXMQFrpC0t4imc6cFTSTfSUMxAQBtbP2S2zPEiVPKWbJnioYHSLsogG7KYoezVpBZUhJLlU7S5sMotAOUPiDlR1gaqGExHNNFpbj-MepAQV7MdlEBnZUcoPPWlEYOzQ5xAX2TnLEp5z7ZGcwuWhnDmpAEhkcm2bnLFxcCmu8c5tNXNrmy4-ZKck7GnIGRGyZ4MQTUa7Rzru086jdS8SKJvFcNfxHAuERPI74-iQqZczRBEDDnpAMMNcrDB3M3pNyqZLcogMXL7mFkTZadJOhnWdpniR5nAfOuywdEMj3Jqk9fvvJ1Lbz3Kc8xQRONHGLzG57lH2c-KXo7zp2e87OYfJaTHze5p866YPOzrnjr5YlN+e4IUlsCH5MArOfFJfnLyvxug9yS6JVpLyW6t89RhAz1DiSmp38jBfAvvBYMiSX83RLPIIWDcKGTDEhc3DwUrxUMzs9BbrNaioZLZvdTucnW3E9zE60Q-uVAuDowKx5N8-WuMPzbILm4PCuNrKBfFN06F0iuYu3QRr0TcFZCtJAouBYBTB6ACzLkAA)

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