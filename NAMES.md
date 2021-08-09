# Alternative Names

- glasses-ts ("Unfancy monocle", "practical optics")

- simple-optics-ts
- monocle-ts-facade
- fluent-monocle-ts
- ergonomic-monocle-ts

- object-ts
- readonly-ts
- copy-ts
- transform-ts
- update-ts

## "immutable-ts"
PROS:
- sounds adjacent to [immutability-helper]() & [immer]()
- easy-to-understand name for folks outside the ecosystem

CONS:
- also sounds adjacent to [immutable.js]() which uses persistent data structures (monocle uses object.assign)
- the word 'immutable' is poorly defined & vague (all fp-ts libraries are data transformations & therefore 'immutable')

## "glasses-ts" (practical optics)
PROS:
- descriptive for people who already use monocle/optics
- short name
- might inspire newcomers to look up optics

CONS:
- counter to fp-ts utilitarian, math-y aesthetic
- catchy/clever

## "monocle-ts-facade" or "fluent-monocle-ts"
PROS:
- most accurate & literal name
- useful description for people who already use monocle

CONS:
- not a useful description for newcomers - 'monocle-ts' is an implementation detail
- long, un-ergonomic name (ironic for an ergonomics library)