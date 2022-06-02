import { CharacterMetadata, ContentBlock, genKey, Entity } from "draft-js";
import { Map, List, OrderedMap, OrderedSet } from "immutable";
const getEntityId = node => {
    let entityId = undefined;
    if (node instanceof HTMLAnchorElement) {
        const entityConfig = {};
        if (node.dataset && node.dataset.mention !== undefined) {
            entityConfig.url = node.href;
            entityConfig.text = node.innerHTML;
            entityConfig.value = node.dataset.value;
            entityId = Entity.__create("MENTION", "IMMUTABLE", entityConfig);
        } else {
            entityConfig.url = node.getAttribute ? node.getAttribute("href") || node.href : node.href;
            entityConfig.title = node.innerHTML;
            entityConfig.targetOption = node.target;
            entityId = Entity.__create("LINK", "MUTABLE", entityConfig);
        }
    }
    return entityId;
};

function getBlockData(node) {
    if (node.style.textAlign) {
        return new Map({
            "text-align": node.style.textAlign,
        });
    } else if (node.style.marginLeft) {
        return new Map({
            "margin-left": node.style.marginLeft,
        });
    }
    return undefined;
}

const inlineTags = {
    code: "CODE",
    del: "STRIKETHROUGH",
    em: "ITALIC",
    ins: "UNDERLINE",
    strong: "BOLD",
    sub: "SUBSCRIPT",
    sup: "SUPERSCRIPT",
};
function processInlineTag(tag, node, currentStyle) {
    const styleToCheck = inlineTags[tag];
    let inlineStyle;
    if (styleToCheck) {
        inlineStyle = currentStyle.add(styleToCheck).toOrderedSet();
    } else if (node instanceof HTMLElement) {
        inlineStyle = currentStyle;
        const htmlElement = node;
        inlineStyle = inlineStyle
            .withMutations(style => {
                const color = htmlElement.style.color;
                // const backgroundColor = htmlElement.style.backgroundColor;
                const fontSize = htmlElement.style.fontSize;
                const fontFamily = htmlElement.style.fontFamily.replace(/^"|"$/g, "");
                const fontWeight = htmlElement.style.fontWeight;
                const textDecoration = htmlElement.style.textDecoration;
                const fontStyle = htmlElement.style.fontStyle;
                if (color) {
                    style.add(`color-${color.replace(/ /g, "")}`);
                }
                // if (backgroundColor) {
                //     style.add(`bgcolor-${backgroundColor.replace(/ /g, "")}`);
                // }
                if (fontSize) {
                    style.add(`fontsize-${fontSize.replace(/px$/g, "")}`);
                }
                if (fontFamily) {
                    style.add(`fontfamily-${fontFamily}`);
                }
                if (fontWeight === "bold") {
                    style.add(inlineTags.strong);
                }
                if (textDecoration === "underline") {
                    style.add(inlineTags.ins);
                }
                if (fontStyle === "italic") {
                    style.add(inlineTags.em);
                }
            })
            .toOrderedSet();
    }
    return inlineStyle;
}

const blockRenderMap = new Map({
    "header-one": {
        element: "h1",
    },
    "header-two": {
        element: "h2",
    },
    "header-four": {
        element: "h4",
    },
    "header-five": {
        element: "h5",
    },
    "header-six": {
        element: "h6",
    },
    "header-three": {
        element: "h3",
    },
    "unordered-list-item": {
        element: "li",
        wrapper: "ul",
    },
    "ordered-list-item": {
        element: "li",
        wrapper: "ol",
    },
    blockquote: {
        element: "blockquote",
    },
    code: {
        element: "pre",
    },
    atomic: {
        element: "figure",
    },
    unstyled: {
        element: "p",
    },
    MyCustomBlock: {
        aliasedElements: ["div"],
        element: "section",
    },
});

function getBlockTypeForTag(tag, lastList) {
    const matchedTypes = blockRenderMap
        .filter(draftBlock => {
            return (draftBlock.element === tag && (!draftBlock.wrapper || draftBlock.wrapper === lastList)) || draftBlock.wrapper === tag || (draftBlock.aliasedElements && draftBlock.aliasedElements.indexOf(tag) > -1);
        })
        .keySeq()
        .toSet()
        .toArray();

    if (matchedTypes.length === 1) {
        return matchedTypes[0];
    }
    return undefined;
}

const SPACE = " ";
const MAX_DEPTH = 4;
const getWhitespaceChunk = entityId => {
    return {
        text: SPACE,
        inlines: [new OrderedSet()],
        entities: [entityId],
        blocks: [],
    };
};
const createTextChunk = (node, inlineStyle, entityId) => {
    const text = node.textContent;
    if (text.trim() === "\n") {
        return { chunk: getWhitespaceChunk(entityId) };
    }
    return {
        chunk: {
            text,
            inlines: Array(text.length).fill(inlineStyle),
            entities: Array(text.length).fill(entityId),
            blocks: [],
        },
    };
};

const getSoftNewlineChunk = () => {
    return {
        text: "\n",
        inlines: [new OrderedSet()],
        entities: new Array(1),
        blocks: [],
    };
};

const getEmptyChunk = () => {
    return {
        text: "",
        inlines: [],
        entities: [],
        blocks: [],
    };
};
const getFirstBlockChunk = (blockType, data) => {
    return {
        text: "",
        inlines: [],
        entities: [],
        blocks: [
            {
                type: blockType,
                depth: 0,
                data: data || new Map({}),
            },
        ],
    };
};

const getBlockDividerChunk = (blockType, depth, data) => {
    return {
        text: "\r",
        inlines: [],
        entities: [],
        blocks: [
            {
                type: blockType,
                depth: Math.max(0, Math.min(MAX_DEPTH, depth)),
                data: data || new Map({}),
            },
        ],
    };
};

const getAtomicBlockChunk = entityId => {
    return {
        text: "\r ",
        inlines: [new OrderedSet()],
        entities: [entityId],
        blocks: [
            {
                type: "atomic",
                depth: 0,
                data: new Map({}),
            },
        ],
    };
};

const joinChunks = (A, B) => {
    return {
        text: A.text + B.text,
        inlines: A.inlines.concat(B.inlines),
        entities: A.entities.concat(B.entities),
        blocks: A.blocks.concat(B.blocks),
    };
};

const getSafeBodyFromHTML = html => {
    var doc;
    var root = null;
    if (document.implementation && document.implementation.createHTMLDocument) {
        doc = document.implementation.createHTMLDocument("foo");
        doc.documentElement.innerHTML = html;
        root = doc.getElementsByTagName("body")[0];
    }
    return root;
};

const space1 = " ";
const REGEX_NBSP = new RegExp("&nbsp;", "g");
let firstBlock = true;
function genFragment(node, inlineStyle, depth, lastList, inEntity, customChunkGenerator) {
    const nodeName = node.nodeName.toLowerCase();

    if (customChunkGenerator) {
        const value = customChunkGenerator(nodeName, node);
        if (value) {
            const entityId = Entity.__create(value.type, value.mutability, value.data || {});
            return { chunk: getAtomicBlockChunk(entityId) };
        }
    }

    if (nodeName === "#text" && node.textContent !== "\n") {
        return createTextChunk(node, inlineStyle, inEntity);
    }

    if (nodeName === "br") {
        return { chunk: getSoftNewlineChunk() };
    }
    if (nodeName === "div" && node.classList.value === "scrollBar") {
        const entityConfig = {};
        let imgList = [];
        entityConfig.marginTop = node.style.marginTop.replace(/px$/g, "");
        entityConfig.marginBottom = node.style.marginBottom.replace(/px$/g, "");
        for (let data of node.getElementsByTagName("img")) {
            if (data.style.paddingLeft) {
                entityConfig.paddingLeft = data.style.paddingLeft.replace(/px$/g, "");
            }
            entityConfig.pictureSpacing = data.style.marginRight.replace(/px$/g, "");
            imgList.push({ src: data.getAttribute("src"), width: data.style.width.replace(/px$/g, ""), height: data.style.height.replace(/px$/g, "") })
        }
        entityConfig.imgList = imgList;
        entityConfig.height = node.style.height.replace(/px$/g, "");
        const entityId = Entity.__create("CAROUSELBANNER", "MUTABLE", entityConfig);
        return { chunk: getAtomicBlockChunk(entityId) };
    }
    if (nodeName === "div" && node.classList.value === "headerImage") {
        const entityConfig = {};
        entityConfig.img = node.style.backgroundImage.slice(5, -2);
        entityConfig.width = "100%";
        entityConfig.height = node.style.height;
        const name = node.children[0];
        const shortDesc = node.children[1];
        entityConfig.name = {
            data: name.innerText,
            fontSize: name.style.fontSize.replace(/px$/g, ""),
            fontFamily: name.style.fontFamily,
            lineHeight: name.style.lineHeight.replace(/px$/g, ""),
            letterSpacing: name.style.letterSpacing.replace(/px$/g, ""),
            color: name.style.color,
            top: name.style.paddingTop.replace(/px$/g, ""),
            bottom: name.style.paddingBottom.replace(/px$/g, ""),
            left: name.style.paddingLeft.replace(/px$/g, ""),
            right: name.style.paddingRight.replace(/px$/g, ""),
        }
        entityConfig.shortDesc = {
            data: shortDesc.innerText,
            fontSize: shortDesc.style.fontSize.replace(/px$/g, ""),
            fontFamily: shortDesc.style.fontFamily,
            lineHeight: shortDesc.style.lineHeight.replace(/px$/g, ""),
            letterSpacing: shortDesc.style.letterSpacing.replace(/px$/g, ""),
            color: shortDesc.style.color,
            top: shortDesc.style.paddingTop.replace(/px$/g, ""),
            bottom: shortDesc.style.paddingBottom.replace(/px$/g, ""),
            left: shortDesc.style.paddingLeft.replace(/px$/g, ""),
            right: shortDesc.style.paddingRight.replace(/px$/g, ""),
        }
        const entityId = Entity.__create("HEADERIMAGE", "MUTABLE", entityConfig);
        return { chunk: getAtomicBlockChunk(entityId) };
    }
    if (nodeName === "div" && node.classList.value === "glide") {
        const entityConfig = {};
        let imgList = [];
        const nextSibling = node.nextSibling.nextSibling;
        if (nextSibling.nodeName === "SCRIPT") {
            const data = nextSibling.text.split("{")[1].split("}")[0].split(",");
            entityConfig.perView = data[0].split(":")[1]
            entityConfig.type = data[1].split(":")[1].replace(/"/g, "")
        }
        for (let data of node.getElementsByTagName("img")) {
            imgList.push({ src: data.getAttribute("src") })
        }
        if (node.getAttribute("id").indexOf("pre") >= 0) {
            entityConfig.id = node.getAttribute("id").slice(3);
        }
        entityConfig.imgList = imgList;
        entityConfig.width = "100%";
        entityConfig.background = node.style.background;
        entityConfig.padding = node.style.padding;
        entityConfig.height = node.style.height.replace(/px$/g, "");
        entityConfig.lineHeight = node.style.lineHeight;
        const entityId = Entity.__create("CAROUSELIMAGE", "MUTABLE", entityConfig);
        return { chunk: getAtomicBlockChunk(entityId) };
    }
    if (nodeName === "div" && node.classList.value === "carouselText glide") {
        const entityConfig = {};
        let formList = [];
        const nextSibling = node.nextSibling.nextSibling;
        if (nextSibling.nodeName === "SCRIPT") {
            const data = nextSibling.text.split("{")[1].split("}")[0].split(",");
            entityConfig.perView = data[0].split(":")[1]
            entityConfig.type = data[1].split(":")[1].replace(/"/g, "")
        }
        for (let data of node.getElementsByTagName("li")) {
            const title = data.children[0];
            const img = data.children[1].firstChild;
            const desc = data.children[2]
            formList.push({ title: title.innerText, src: img.getAttribute("src"), description: desc.innerText })
        }
        const title = node.getElementsByTagName("li")[0].children[0];
        const desc = node.getElementsByTagName("li")[0].children[2];
        entityConfig.title = {
            fontSize: title.style.fontSize.replace(/px$/g, ""),
            fontFamily: title.style.fontFamily === "null" ? "" : title.style.fontFamily,
            lineHeight: title.style.lineHeight.replace(/px$/g, ""),
            letterSpacing: title.style.letterSpacing.replace(/px$/g, ""),
            top: title.style.paddingTop.replace(/px$/g, ""),
            bottom: title.style.paddingBottom.replace(/px$/g, ""),
            color: title.style.color,
        }
        entityConfig.description = {
            fontSize: desc.style.fontSize.replace(/px$/g, ""),
            fontFamily: desc.style.fontFamily === "null" ? "" : desc.style.fontFamily,
            lineHeight: desc.style.lineHeight.replace(/px$/g, ""),
            letterSpacing: desc.style.letterSpacing.replace(/px$/g, ""),
            top: desc.style.paddingTop.replace(/px$/g, ""),
            bottom: desc.style.paddingBottom.replace(/px$/g, ""),
            color: desc.style.color,
        }
        entityConfig.paddingLeft = desc.style.paddingLeft.replace(/px$/g, "");
        entityConfig.paddingRight = desc.style.paddingRight.replace(/px$/g, "");
        if (node.getAttribute("id").indexOf("pre") >= 0) {
            entityConfig.id = node.getAttribute("id").slice(3);
        }
        entityConfig.formList = formList;
        entityConfig.width = "100%";
        entityConfig.padding = node.style.padding;
        entityConfig.background = node.style.background;
        entityConfig.height = node.style.height.replace(/px$/g, "");
        const entityId = Entity.__create("CAROUSELTEXTIMAGE", "MUTABLE", entityConfig);
        return { chunk: getAtomicBlockChunk(entityId) };
    }
    if (nodeName === "img" && node instanceof HTMLImageElement) {
        const entityConfig = {};
        entityConfig.src = node.getAttribute ? node.getAttribute("src") || node.src : node.src;
        entityConfig.alt = node.alt;
        entityConfig.height = node.style.height;
        entityConfig.width = node.style.width;
        entityConfig.background = node.style.background;
        entityConfig.padding = node.style.padding;
        if (node.style.float) {
            entityConfig.alignment = node.style.float;
        }
        const entityId = Entity.__create("IMAGE", "MUTABLE", entityConfig);
        return { chunk: getAtomicBlockChunk(entityId) };
    }

    if (nodeName === "video" && node instanceof HTMLVideoElement) {
        const entityConfig = {};
        entityConfig.src = node.getAttribute ? node.getAttribute("src") || node.src : node.src;
        entityConfig.alt = node.getAttribute("alt");
        entityConfig.height = node.getAttribute("height");
        entityConfig.width = node.style.width;
        if (node.style.float) {
            entityConfig.alignment = node.style.float;
        }
        const entityId = Entity.__create("VIDEO", "MUTABLE", entityConfig);
        return { chunk: getAtomicBlockChunk(entityId) };
    }

    if (nodeName === "iframe" && node instanceof HTMLIFrameElement) {
        const entityConfig = {};
        entityConfig.src = node.getAttribute ? node.getAttribute("src") || node.src : node.src;
        entityConfig.height = node.height;
        entityConfig.width = node.width;
        const entityId = Entity.__create("EMBEDDED_LINK", "MUTABLE", entityConfig);
        return { chunk: getAtomicBlockChunk(entityId) };
    }

    const blockType = getBlockTypeForTag(nodeName, lastList);

    let chunk;
    if (blockType) {
        if (nodeName === "ul" || nodeName === "ol") {
            lastList = nodeName;
            depth += 1;
        } else {
            if (blockType !== "unordered-list-item" && blockType !== "ordered-list-item") {
                lastList = "";
                depth = -1;
            }
            if (!firstBlock) {
                chunk = getBlockDividerChunk(blockType, depth, getBlockData(node));
            } else {
                chunk = getFirstBlockChunk(blockType, getBlockData(node));
                firstBlock = false;
            }
        }
    }
    if (!chunk) {
        chunk = getEmptyChunk();
    }

    inlineStyle = processInlineTag(nodeName, node, inlineStyle);

    let child = node.firstChild;
    while (child && node.classList.value !== "glide" && node.classList.value !== "carousel_text glide" && node.classList.value !== "headerImage" && node.classList.value !== "scrollBar") {
        const entityId = getEntityId(child);
        const { chunk: generatedChunk } = genFragment(child, inlineStyle, depth, lastList, entityId || inEntity, customChunkGenerator);
        chunk = joinChunks(chunk, generatedChunk);
        const sibling = child.nextSibling;
        child = sibling;
    }
    return { chunk };
}

function getChunkForHTML(html, customChunkGenerator) {
    const sanitizedHtml = html.trim().replace(REGEX_NBSP, space1);
    const safeBody = getSafeBodyFromHTML(sanitizedHtml);
    if (!safeBody) {
        return null;
    }
    firstBlock = true;
    const { chunk } = genFragment(safeBody, new OrderedSet(), -1, "", undefined, customChunkGenerator);
    return { chunk };
}

export default function htmlToDraft(html, customChunkGenerator) {
    const chunkData = getChunkForHTML(html, customChunkGenerator);
    if (chunkData) {
        const { chunk } = chunkData;
        let entityMap = new OrderedMap({});
        chunk.entities &&
            chunk.entities.forEach(entity => {
                if (entity) {
                    entityMap = entityMap.set(entity, Entity.__get(entity));
                }
            });
        let start = 0;
        return {
            contentBlocks: chunk.text.split("\r").map((textBlock, ii) => {
                const end = start + textBlock.length;
                const inlines = chunk && chunk.inlines.slice(start, end);
                const entities = chunk && chunk.entities.slice(start, end);
                const characterList = new List(
                    inlines.map((style, index) => {
                        const data = { style, entity: null };
                        if (entities[index]) {
                            data.entity = entities[index];
                        }
                        return CharacterMetadata.create(data);
                    })
                );
                start = end;
                return new ContentBlock({
                    key: genKey(),
                    type: (chunk && chunk.blocks[ii] && chunk.blocks[ii].type) || "unstyled",
                    depth: chunk && chunk.blocks[ii] && chunk.blocks[ii].depth,
                    data: (chunk && chunk.blocks[ii] && chunk.blocks[ii].data) || new Map({}),
                    text: textBlock,
                    characterList,
                });
            }),
            entityMap,
        };
    }
    return null;
}
