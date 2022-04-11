export interface TestNode {
  readonly childNodes: TestNodeListOf<ChildNode>;
  readonly firstChild: TestChildNode | null;
  readonly lastChild: TestChildNode | null;
  readonly nextSibling: TestChildNode | null;
  // readonly ownerDocument: Document | null;
  readonly parentElement: HTMLElement | null;
  readonly parentNode: TestParentNode | null;
  readonly previousSibling: TestChildNode | null;
}
export interface TestNode2 {
  readonly childNodes: TestNodeListOf2<TestNode2>;
  readonly firstChild: TestNode2 | null;
  readonly lastChild: TestNode2 | null;
  readonly nextSibling: TestNode2 | null;
  // readonly ownerDocument: Document | null;
  // readonly parentElement: HTMLElement | null;
  readonly parentNode: TestNode2 | null;
  readonly previousSibling: TestNode2 | null;
}

export interface TestChildNode extends TestNode {
  after(...nodes: (Node | string)[]): void;
  before(...nodes: (Node | string)[]): void;
  remove(): void;
  replaceWith(...nodes: (Node | string)[]): void;
}
export interface TestParentNode extends TestNode {
  readonly childElementCount: number;
  // readonly children: HTMLCollection;
  // readonly firstElementChild: Element | null;
  // readonly lastElementChild: Element | null;
  append(...nodes: (Node | string)[]): void;
  prepend(...nodes: (Node | string)[]): void;
  querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
  querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
  querySelector<E extends Element = Element>(selectors: string): E | null;
  querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
  querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
  querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
  replaceChildren(...nodes: (Node | string)[]): void;
}

export interface TestNodeListOf<TNode extends TestNode> {
  [Symbol.iterator](): IterableIterator<TNode>;
  /** Returns an array of key, value pairs for every entry in the list. */
  entries(): IterableIterator<[number, TNode]>;
  /** Returns an list of keys in the list. */
  keys(): IterableIterator<number>;
  /** Returns an list of values in the list. */
  values(): IterableIterator<TNode>;
}
export interface TestNodeListOf2<TNode extends TestNode2> {
  [Symbol.iterator](): IterableIterator<TNode>;
  /** Returns an array of key, value pairs for every entry in the list. */
  entries(): IterableIterator<[number, TNode]>;
  /** Returns an list of keys in the list. */
  keys(): IterableIterator<number>;
  /** Returns an list of values in the list. */
  values(): IterableIterator<TNode>;
}

export interface HTMLMock {
  /* readonly children: HTMLCollection;
  readonly firstElementChild: Element | null;
  readonly lastElementChild: Element | null;
  readonly nextElementSibling: Element | null;
  readonly previousElementSibling: Element | null;
  readonly attributes: NamedNodeMap;
  readonly classList: DOMTokenList;
  readonly ownerDocument: Document;
  readonly part: DOMTokenList;
  readonly shadowRoot: ShadowRoot | null;
  readonly childNodes: NodeListOf<ChildNode>;
  readonly firstChild: ChildNode | null;
  readonly lastChild: ChildNode | null;
  readonly nextSibling: ChildNode | null; */
  // readonly parentElement: HTMLElement | null;
  // readonly parentNode: ParentNode | null;
  // readonly assignedSlot: HTMLSlotElement | null;
  readonly previousSibling: ChildNode | null;
  readonly childElementCount?: number;
  append(...nodes: (Node | string)[]): void;
  prepend(...nodes: (Node | string)[]): void;
  querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
  querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
  /* querySelector<E extends Element = Element>(selectors: string): E | null;
  querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
  querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
  querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
  replaceChildren(...nodes: (Node | string)[]): void;
  innerHTML: string;
  after(...nodes: (Node | string)[]): void;
  before(...nodes: (Node | string)[]): void;
  remove(): void;
  replaceWith(...nodes: (Node | string)[]): void;
  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
  ): Animation;
  getAnimations(options?: GetAnimationsOptions): Animation[];
  ariaAtomic: string | null; */
  /* ariaAutoComplete: string | null;
  ariaBusy: string | null;
  ariaChecked: string | null;
  ariaColCount: string | null;
  ariaColIndex: string | null;
  ariaColSpan: string | null;
  ariaCurrent: string | null;
  ariaDisabled: string | null;
  ariaExpanded: string | null;
  ariaHasPopup: string | null;
  ariaHidden: string | null;
  ariaKeyShortcuts: string | null;
  ariaLabel: string | null;
  ariaLevel: string | null;
  ariaLive: string | null;
  ariaModal: string | null;
  ariaMultiLine: string | null;
  ariaMultiSelectable: string | null;
  ariaOrientation: string | null;
  ariaPlaceholder: string | null;
  ariaPosInSet: string | null;
  ariaPressed: string | null;
  ariaReadOnly: string | null;
  ariaRequired: string | null;
  ariaRoleDescription: string | null;
  ariaRowCount: string | null;
  ariaRowIndex: string | null;
  ariaRowSpan: string | null;
  ariaSelected: string | null;
  ariaSetSize: string | null;
  ariaSort: string | null;
  ariaValueMax: string | null;
  ariaValueMin: string | null;
  ariaValueNow: string | null;
  ariaValueText: string | null; */
  /* className: string;
  readonly clientHeight: number;
  readonly clientLeft: number;
  readonly clientTop: number;
  readonly clientWidth: number;
  id: string;
  readonly localName: string;
  readonly namespaceURI: string | null;
  onfullscreenchange: ((this: Element, ev: Event) => any) | null;
  onfullscreenerror: ((this: Element, ev: Event) => any) | null;
  outerHTML: string;
  readonly prefix: string | null;
  readonly scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  readonly scrollWidth: number;
  slot: string;
  readonly tagName: string;
  attachShadow(init: ShadowRootInit): ShadowRoot;
  closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
  closest<E extends Element = Element>(selectors: string): E | null;
  getAttribute(qualifiedName: string): string | null;
  getAttributeNS(namespace: string | null, localName: string): string | null;
  getAttributeNames(): string[];
  getAttributeNode(qualifiedName: string): Attr | null;
  getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
  getBoundingClientRect(): DOMRect;
  getClientRects(): DOMRectList;
  getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
  getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K
  ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof SVGElementTagNameMap>(
    qualifiedName: K
  ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
  getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/1999/xhtml",
    localName: string
  ): HTMLCollectionOf<HTMLElement>;
  getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
  getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element>;
  hasAttribute(qualifiedName: string): boolean;
  hasAttributeNS(namespace: string | null, localName: string): boolean;
  hasAttributes(): boolean;
  hasPointerCapture(pointerId: number): boolean;
  insertAdjacentElement(where: InsertPosition, element: Element): Element | null;
  insertAdjacentHTML(position: InsertPosition, text: string): void;
  insertAdjacentText(where: InsertPosition, data: string): void;
  matches(selectors: string): boolean;
  releasePointerCapture(pointerId: number): void;
  removeAttribute(qualifiedName: string): void;
  removeAttributeNS(namespace: string | null, localName: string): void;
  removeAttributeNode(attr: Attr): Attr;
  requestFullscreen(options?: FullscreenOptions): Promise<void>;
  requestPointerLock(): void;
  scroll(options?: ScrollToOptions): void;
  scroll(x: number, y: number): void;
  scrollBy(options?: ScrollToOptions): void;
  scrollBy(x: number, y: number): void;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
  scrollTo(options?: ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
  setAttribute(qualifiedName: string, value: string): void;
  setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
  setAttributeNode(attr: Attr): Attr | null;
  setAttributeNodeNS(attr: Attr): Attr | null;
  setPointerCapture(pointerId: number): void;
  toggleAttribute(qualifiedName: string, force?: boolean): boolean;
  webkitMatchesSelector(selectors: string): boolean;
  addEventListener<K extends keyof ElementEventMap>(
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof ElementEventMap>(
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
  readonly baseURI: string;
  readonly isConnected: boolean;
  readonly nodeName: string;
  readonly nodeType: number;
  nodeValue: string | null;
  textContent: string | null;
  appendChild<T extends Node>(node: T): T;
  cloneNode(deep?: boolean): Node;
  compareDocumentPosition(other: Node): number;
  contains(other: Node | null): boolean;
  getRootNode(options?: GetRootNodeOptions): Node;
  hasChildNodes(): boolean;
  insertBefore<T extends Node>(node: T, child: Node | null): T;
  isDefaultNamespace(namespace: string | null): boolean;
  isEqualNode(otherNode: Node | null): boolean;
  isSameNode(otherNode: Node | null): boolean;
  lookupNamespaceURI(prefix: string | null): string | null;
  lookupPrefix(namespace: string | null): string | null;
  normalize(): void;
  removeChild<T extends Node>(child: T): T;
  replaceChild<T extends Node>(node: Node, child: T): T;
  readonly ATTRIBUTE_NODE: number;
  readonly CDATA_SECTION_NODE: number;
  readonly COMMENT_NODE: number;
  readonly DOCUMENT_FRAGMENT_NODE: number;
  readonly DOCUMENT_NODE: number;
  readonly DOCUMENT_POSITION_CONTAINED_BY: number;
  readonly DOCUMENT_POSITION_CONTAINS: number;
  readonly DOCUMENT_POSITION_DISCONNECTED: number;
  readonly DOCUMENT_POSITION_FOLLOWING: number;
  readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
  readonly DOCUMENT_POSITION_PRECEDING: number;
  readonly DOCUMENT_TYPE_NODE: number;
  readonly ELEMENT_NODE: number;
  readonly ENTITY_NODE: number;
  readonly ENTITY_REFERENCE_NODE: number;
  readonly NOTATION_NODE: number;
  readonly PROCESSING_INSTRUCTION_NODE: number;
  readonly TEXT_NODE: number; */
}

export interface Big {
  "0": Big;
  "1": Big;
  "2": Big;
  "3": Big;
  "4": Big;
  "5": Big;
  "6": Big;
  "7": Big;
  "8": Big;
  "9": Big;
  "10": Big;
  "11": Big;
  "12": Big;
  "13": Big;
  "14": Big;
  "15": Big;
  "16": Big;
  "17": Big;
  "18": Big;
  "19": Big;
  "20": Big;
  "21": Big;
  "22": Big;
  "23": Big;
  "24": Big;
  "25": Big;
  "26": Big;
  "27": Big;
  "28": Big;
  "29": Big;
  "30": Big;
  "31": Big;
  "32": Big;
  "33": Big;
  "34": Big;
  "35": Big;
  "36": Big;
  "37": Big;
  "38": Big;
  "39": Big;
  "40": Big;
  "41": Big;
  "42": Big;
  "43": Big;
  "44": Big;
  "45": Big;
  "46": Big;
  "47": Big;
  "48": Big;
  "49": Big;
  "50": Big;
  "51": Big;
  "52": Big;
  "53": Big;
  "54": Big;
  "55": Big;
  "56": Big;
  "57": Big;
  "58": Big;
  "59": Big;
  "60": Big;
  "61": Big;
  "62": Big;
  "63": Big;
  "64": Big;
  "65": Big;
  "66": Big;
  "67": Big;
  "68": Big;
  "69": Big;
  "70": Big;
  "71": Big;
  "72": Big;
  "73": Big;
  "74": Big;
  "75": Big;
  "76": Big;
  "77": Big;
  "78": Big;
  "79": Big;
  "80": Big;
  "81": Big;
  "82": Big;
  "83": Big;
  "84": Big;
  "85": Big;
  "86": Big;
  "87": Big;
  "88": Big;
  "89": Big;
  "90": Big;
  "91": Big;
  "92": Big;
  "93": Big;
  "94": Big;
  "95": Big;
  "96": Big;
  "97": Big;
  "98": Big;
  "99": Big;
  "100": Big;
  "101": Big;
  "102": Big;
  "103": Big;
  "104": Big;
  "105": Big;
  "106": Big;
  "107": Big;
  "108": Big;
  "109": Big;
  "110": Big;
  "111": Big;
  "112": Big;
  "113": Big;
  "114": Big;
  "115": Big;
  "116": Big;
  "117": Big;
  "118": Big;
  "119": Big;
  "120": Big;
  "121": Big;
  "122": Big;
  "123": Big;
  "124": Big;
  "125": Big;
  "126": Big;
  "127": Big;
  "128": Big;
  "129": Big;
  "130": Big;
  "131": Big;
  "132": Big;
  "133": Big;
  "134": Big;
  "135": Big;
  "136": Big;
  "137": Big;
  "138": Big;
  "139": Big;
  "140": Big;
  "141": Big;
  "142": Big;
  "143": Big;
  "144": Big;
  "145": Big;
  "146": Big;
  "147": Big;
  "148": Big;
  "149": Big;
  "150": Big;
  "151": Big;
  "152": Big;
  "153": Big;
  "154": Big;
  "155": Big;
  "156": Big;
  "157": Big;
  "158": Big;
  "159": Big;
  "160": Big;
  "161": Big;
  "162": Big;
  "163": Big;
  "164": Big;
  "165": Big;
  "166": Big;
  "167": Big;
  "168": Big;
  "169": Big;
  "170": Big;
  "171": Big;
  "172": Big;
  "173": Big;
  "174": Big;
  "175": Big;
  "176": Big;
  "177": Big;
  "178": Big;
  "179": Big;
  "180": Big;
  "181": Big;
  "182": Big;
  "183": Big;
  "184": Big;
  "185": Big;
  "186": Big;
  "187": Big;
  "188": Big;
  "189": Big;
  "190": Big;
  "191": Big;
  "192": Big;
  "193": Big;
  "194": Big;
  "195": Big;
  "196": Big;
  "197": Big;
  "198": Big;
  "199": Big;
}

export type TooBroad<O, T extends keyof O = keyof O, Acc extends unknown[] = []> = (
  (T extends any ? (t: T) => T : never) extends infer U
    ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
      ? V
      : never
    : never
) extends (_: any) => infer W
  ? Acc["length"] extends 50
    ? true
    : TooBroad<O, Exclude<T, W>, [...Acc, unknown]>
  : never;

// type a = TooBroad<Person>;
type b = TooBroad<HTMLElement["scrollLeft"]>;
type c = TooBroad<simple>;

interface simple {
  a: number;
  b: number;
  c: number;
}
