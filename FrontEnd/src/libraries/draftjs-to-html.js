// require("./glide");
(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? (module.exports = factory()) : typeof define === "function" && define.amd ? define(factory) : (global.draftjsToHtml = factory());
})(this, function () {
    "use strict";

    /**
     * Utility function to execute callback for eack key->value pair.
     */
    function forEach(obj, callback) {
        if (obj) {
            for (var key in obj) {
                // eslint-disable-line no-restricted-syntax
                if ({}.hasOwnProperty.call(obj, key)) {
                    callback(key, obj[key]);
                }
            }
        }
    }

    /**
     * The function returns true if the string passed to it has no content.
     */
    function isEmptyString(str) {
        if (str === undefined || str === null || str.length === 0 || str.trim().length === 0) {
            return true;
        }
        return false;
    }

    /**
     * Mapping block-type to corresponding html tag.
     */
    var blockTypesMapping = {
        unstyled: "p",
        "header-one": "h1",
        "header-two": "h2",
        "header-three": "h3",
        "header-four": "h4",
        "header-five": "h5",
        "header-six": "h6",
        "unordered-list-item": "ul",
        "ordered-list-item": "ol",
        blockquote: "blockquote",
        code: "pre",
        MyCustomBlock: "div",
    };

    /**
     * Function will return HTML tag for a block.
     */
    function getBlockTag(type) {
        return type && blockTypesMapping[type];
    }

    /**
     * Function will return style string for a block.
     */
    function getBlockStyle(data) {
        var styles = "";
        forEach(data, function (key, value) {
            if (value) {
                styles += key + ":" + value + ";";
            }
        });
        return styles;
    }

    /**
     * The function returns an array of hashtag-sections in blocks.
     * These will be areas in block which have hashtags applicable to them.
     */
    function getHashtagRanges(blockText, hashtagConfig) {
        var sections = [];
        if (hashtagConfig) {
            var counter = 0;
            var startIndex = 0;
            var text = blockText;
            var trigger = hashtagConfig.trigger || "#";
            var separator = hashtagConfig.separator || " ";
            for (; text.length > 0 && startIndex >= 0;) {
                if (text[0] === trigger) {
                    startIndex = 0;
                    counter = 0;
                    text = text.substr(trigger.length);
                } else {
                    startIndex = text.indexOf(separator + trigger);
                    if (startIndex >= 0) {
                        text = text.substr(startIndex + (separator + trigger).length);
                        counter += startIndex + separator.length;
                    }
                }
                if (startIndex >= 0) {
                    var endIndex = text.indexOf(separator) >= 0 ? text.indexOf(separator) : text.length;
                    var hashtag = text.substr(0, endIndex);
                    if (hashtag && hashtag.length > 0) {
                        sections.push({
                            offset: counter,
                            length: hashtag.length + trigger.length,
                            type: "HASHTAG",
                        });
                    }
                    counter += trigger.length;
                }
            }
        }
        return sections;
    }

    /**
     * The function returns an array of entity-sections in blocks.
     * These will be areas in block which have same entity or no entity applicable to them.
     */
    function getSections(block, hashtagConfig) {
        var sections = [];
        var lastOffset = 0;
        var sectionRanges = block.entityRanges.map(function (range) {
            var offset = range.offset,
                length = range.length,
                key = range.key;

            return {
                offset: offset,
                length: length,
                key: key,
                type: "ENTITY",
            };
        });
        sectionRanges = sectionRanges.concat(getHashtagRanges(block.text, hashtagConfig));
        sectionRanges = sectionRanges.sort(function (s1, s2) {
            return s1.offset - s2.offset;
        });
        sectionRanges.forEach(function (r) {
            if (r.offset > lastOffset) {
                sections.push({
                    start: lastOffset,
                    end: r.offset,
                });
            }
            sections.push({
                start: r.offset,
                end: r.offset + r.length,
                entityKey: r.key,
                type: r.type,
            });
            lastOffset = r.offset + r.length;
        });
        if (lastOffset < block.text.length) {
            sections.push({
                start: lastOffset,
                end: block.text.length,
            });
        }
        return sections;
    }

    /**
     * Function to check if the block is an atomic entity block.
     */
    function isAtomicEntityBlock(block) {
        if (block.entityRanges.length > 0 && (isEmptyString(block.text) || block.type === "atomic")) {
            return true;
        }
        return false;
    }

    /**
     * The function will return array of inline styles applicable to the block.
     */
    function getStyleArrayForBlock(block) {
        var text = block.text,
            inlineStyleRanges = block.inlineStyleRanges;

        var inlineStyles = {
            BOLD: new Array(text.length),
            ITALIC: new Array(text.length),
            UNDERLINE: new Array(text.length),
            STRIKETHROUGH: new Array(text.length),
            CODE: new Array(text.length),
            SUPERSCRIPT: new Array(text.length),
            SUBSCRIPT: new Array(text.length),
            COLOR: new Array(text.length),
            BGCOLOR: new Array(text.length),
            FONTSIZE: new Array(text.length),
            FONTFAMILY: new Array(text.length),
            length: text.length,
        };
        if (inlineStyleRanges && inlineStyleRanges.length > 0) {
            inlineStyleRanges.forEach(function (range) {
                var offset = range.offset;

                var length = offset + range.length;
                for (var i = offset; i < length; i += 1) {
                    if (range.style.indexOf("color-") === 0) {
                        inlineStyles.COLOR[i] = range.style.substring(6);
                    } else if (range.style.indexOf("bgcolor-") === 0) {
                        inlineStyles.BGCOLOR[i] = range.style.substring(8);
                    } else if (range.style.indexOf("fontsize-") === 0) {
                        inlineStyles.FONTSIZE[i] = range.style.substring(9);
                    } else if (range.style.indexOf("fontfamily-") === 0) {
                        inlineStyles.FONTFAMILY[i] = range.style.substring(11);
                    } else if (inlineStyles[range.style]) {
                        inlineStyles[range.style][i] = true;
                    }
                }
            });
        }
        return inlineStyles;
    }

    /**
     * The function will return inline style applicable at some offset within a block.
     */
    function getStylesAtOffset(inlineStyles, offset) {
        var styles = {};
        if (inlineStyles.COLOR[offset]) {
            styles.COLOR = inlineStyles.COLOR[offset];
        }
        if (inlineStyles.BGCOLOR[offset]) {
            styles.BGCOLOR = inlineStyles.BGCOLOR[offset];
        }
        if (inlineStyles.FONTSIZE[offset]) {
            styles.FONTSIZE = inlineStyles.FONTSIZE[offset];
        }
        if (inlineStyles.FONTFAMILY[offset]) {
            styles.FONTFAMILY = inlineStyles.FONTFAMILY[offset];
        }
        if (inlineStyles.UNDERLINE[offset]) {
            styles.UNDERLINE = true;
        }
        if (inlineStyles.ITALIC[offset]) {
            styles.ITALIC = true;
        }
        if (inlineStyles.BOLD[offset]) {
            styles.BOLD = true;
        }
        if (inlineStyles.STRIKETHROUGH[offset]) {
            styles.STRIKETHROUGH = true;
        }
        if (inlineStyles.CODE[offset]) {
            styles.CODE = true;
        }
        if (inlineStyles.SUBSCRIPT[offset]) {
            styles.SUBSCRIPT = true;
        }
        if (inlineStyles.SUPERSCRIPT[offset]) {
            styles.SUPERSCRIPT = true;
        }
        return styles;
    }

    /**
     * Function returns true for a set of styles if the value of these styles at an offset
     * are same as that on the previous offset.
     */
    function sameStyleAsPrevious(inlineStyles, styles, index) {
        var sameStyled = true;
        if (index > 0 && index < inlineStyles.length) {
            styles.forEach(function (style) {
                sameStyled = sameStyled && inlineStyles[style][index] === inlineStyles[style][index - 1];
            });
        } else {
            sameStyled = false;
        }
        return sameStyled;
    }

    /**
     * Function returns html for text depending on inline style tags applicable to it.
     */
    function addInlineStyleMarkup(style, content) {
        if (style === "BOLD") {
            return "<strong>" + content + "</strong>";
        } else if (style === "ITALIC") {
            return "<em>" + content + "</em>";
        } else if (style === "UNDERLINE") {
            return "<ins>" + content + "</ins>";
        } else if (style === "STRIKETHROUGH") {
            return "<del>" + content + "</del>";
        } else if (style === "CODE") {
            return "<code>" + content + "</code>";
        } else if (style === "SUPERSCRIPT") {
            return "<sup>" + content + "</sup>";
        } else if (style === "SUBSCRIPT") {
            return "<sub>" + content + "</sub>";
        }
        return content;
    }

    /**
     * The function returns text for given section of block after doing required character replacements.
     */
    function getSectionText(text) {
        if (text && text.length > 0) {
            var chars = text.map(function (ch) {
                switch (ch) {
                    case "\n":
                        return "<br>";
                    case "&":
                        return "&amp;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    default:
                        return ch;
                }
            });
            return chars.join("");
        }
        return "";
    }

    /**
     * Function returns html for text depending on inline style tags applicable to it.
     */
    function addStylePropertyMarkup(styles, text) {
        if (styles && (styles.COLOR || styles.BGCOLOR || styles.FONTSIZE || styles.FONTFAMILY)) {
            var styleString = 'style="';
            if (styles.COLOR) {
                styleString += "color: " + styles.COLOR + ";";
            }
            if (styles.BGCOLOR) {
                styleString += "background-color: " + styles.BGCOLOR + ";";
            }
            if (styles.FONTSIZE) {
                styleString += "font-size: " + styles.FONTSIZE + (/^\d+$/.test(styles.FONTSIZE) ? "px" : "") + ";";
            }
            if (styles.FONTFAMILY) {
                styleString += "font-family: " + styles.FONTFAMILY + ";";
            }
            styleString += "white-space: pre-wrap;";
            styleString += '"';
            return "<span " + styleString + ">" + text + "</span>";
        }
        return text;
    }

    /**
     * Function will return markup for Entity.
     */
    function getEntityMarkup(entityMap, entityKey, text, customEntityTransform, preview) {
        var entity = entityMap[entityKey];
        if (typeof customEntityTransform === "function") {
            var html = customEntityTransform(entity, text);
            if (html) {
                return html;
            }
        }
        if (entity.type === "MENTION") {
            return '<a href="' + entity.data.url + '" class="wysiwyg-mention" data-mention data-value="' + entity.data.value + '">' + text + "</a>";
        }
        if (entity.type === "LINK") {
            var targetOption = entity.data.targetOption || "_self";
            return '<a href="' + entity.data.url + '" target="' + targetOption + '">' + text + "</a>";
        }
        if (entity.type === "CAROUSELBANNER") {
            let carouselBannerHtml = "";
            carouselBannerHtml = '<div class="scrollBar" style="margin-top:' + entity.data.marginTop + "px;margin-bottom:" + entity.data.marginBottom + 'px">' +
                '<div class="scrollBarList">';
            for (let index in entity.data.imgList) {
                if (index === "0") {
                    carouselBannerHtml += '<img style="margin-right:' + entity.data.pictureSpacing + "px;height:" + entity.data.imgList[index].height + "px;width:" + entity.data.imgList[index].width + "px;padding-left:" + entity.data.paddingLeft + 'px" src="' + entity.data.imgList[index].src + '" />';
                } else {
                    carouselBannerHtml += '<img style="margin-right:' + entity.data.pictureSpacing + "px;height:" + entity.data.imgList[index].height + "px;width:" + entity.data.imgList[index].width + 'px" src="' + entity.data.imgList[index].src + '"/>';
                }
            }
            carouselBannerHtml += '</div>' + '</div>';
            return carouselBannerHtml;
        }
        if (entity.type === "CAROUSELIMAGE") {
            let carouselHtml =
                '<div class="glide" id="pre' + entity.data.id + '" style="height:' + entity.data.height + 'px;">' +
                '<div data-glide-el="track" class="glide__track" style="height:100%;">' +
                '<ul class="glide__slides" style="height:100%;margin:0;padding:0;box-sizing:border-box;" id="scroll' + entity.data.id + '">';
            for (let i = 0; i < entity.data.imgList.length; i++) {
                carouselHtml += '<li class="glide__slide" style="height:100%;">' +
                    '<img src="' + entity.data.imgList[i].src + '" style="height:100%;width:' + entity.data.width + '"/>' +
                    '</li>';
            }
            if (!preview) {
                carouselHtml += '</ul>' +
                    '</div>' +
                    '<div class="glide__bullets" data-glide-el="controls[nav]" style="justify-content: center;display: flex;bottom: 10px;">';
            } else {
                carouselHtml += '</ul>' +
                    '</div>' +
                    '<div class="glide__bullets" data-glide-el="controls[nav]" style="justify-content: center;display: flex;">';
            }
            for (let i = 0; i < entity.data.imgList.length && parseInt(entity.data.perView) === 1; i++) {
                carouselHtml += '<button class="glide__bullet" data-glide-dir="=' + i + '" />';
            }
            carouselHtml += ' </div >' +
                '</div>' +
                ' <script>' +
                'var ' + entity.data.id + ' = new Glide("#pre' + entity.data.id + '",{perView:1,type:"carousel",bound:true,rewind:false}).mount();' + entity.data.id + '.on("run",() => {window.ReactNativeWebView.postMessage(JSON.stringify({ quoteIndex: ' + entity.data.id + '.index.toString(),quoteTotal: ' + entity.data.imgList.length + '}))});'
            if (!preview) {
                carouselHtml += 'if(document.getElementById("scroll' + entity.data.id + '")){' +
                    'document.getElementById("scroll' + entity.data.id + '").addEventListener("touchstart", function(event) {' +
                    'window.ReactNativeWebView.postMessage(JSON.stringify({ data: "touchstart" }));' +
                    'var touch = event.targetTouches[0];' +
                    'startPos = {x:touch.pageX,y:touch.pageY};' +
                    'isScrolling = 0;' +
                    '});' +
                    'document.getElementById("scroll' + entity.data.id + '").addEventListener("touchmove", function(ev) {' +
                    'var touch = ev.targetTouches[0];' +
                    'endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};' +
                    'isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;' +
                    'if(isScrolling === 0){' +
                    'ev = ev || event;' +
                    'ev.stopPropagation();' +
                    'ev.preventDefault();' +
                    'window.ReactNativeWebView.postMessage(JSON.stringify({ data: "touchmove" }));' +
                    '}else{' + entity.data.id + '.disable();}' +
                    '},{passive: false});' +
                    'document.getElementById("scroll' + entity.data.id + '").addEventListener("touchend", function(event) {' +
                    'window.ReactNativeWebView.postMessage(JSON.stringify({ data: "touchend" }));' + entity.data.id + '.enable();' +
                    '})' +
                    '}';
            }
            carouselHtml += '</script>';
            return carouselHtml;
        }
        if (entity.type === "CAROUSELTEXTIMAGE") {
            let carouselHtml =
                '<div class="carouselText glide" id="pre' + entity.data.id + '" style="height:' + entity.data.height + "px;padding:" + entity.data.padding + ";background:" + entity.data.background + '" > ' +
                '<div data-glide-el="track" class="glide__track">' +
                '<ul class="glide__slides" style="margin:0;padding:0;box-sizing:border-box;" id="scroll' + entity.data.id + '">';
            const titleStyle = entity.data.title;
            const descStyle = entity.data.description;
            for (let i = 0; i < entity.data.formList.length; i++) {
                const imgWidth = `calc(100% - ${entity.data.paddingLeft}px - ${entity.data.paddingRight}px)`
                carouselHtml += '<li class="glide__slide">' +
                    '<div style="font-family:' + titleStyle.fontFamily + ";font-size:" + titleStyle.fontSize + "px;color:" + titleStyle.color + ";line-height:" + titleStyle.lineHeight + "px;letter-spacing:" + titleStyle.letterSpacing + "px;padding-top:" + titleStyle.top + "px;padding-left:" + entity.data.paddingLeft + "px;padding-right:" + entity.data.paddingRight + "px;padding-bottom:" + titleStyle.bottom + 'px">' + entity.data.formList[i].title + '</div>' +
                    '<div style="width: ' + imgWidth + ';margin: 0 auto">' +
                    '<img src="' + entity.data.formList[i].src + ' " style="width:' + entity.data.width + '"/></div>' +
                    '<div style="font-family:' + descStyle.fontFamily + ";font-size:" + descStyle.fontSize + "px;color:" + descStyle.color + ";line-height:" + descStyle.lineHeight + "px;letter-spacing:" + descStyle.letterSpacing + "px;padding-top:" + descStyle.top + "px;padding-left:" + entity.data.paddingLeft + "px;padding-right:" + entity.data.paddingRight + "px;padding-bottom:" + descStyle.bottom + 'px">' + entity.data.formList[i].description + '</div>' +
                    '</li>';
            }
            carouselHtml += '</ul>' +
                '</div>' +
                '<div class="glide__bullets" data-glide-el="controls[nav]" style="justify-content: center;display: flex;bottom: 10px;">';
            const nameList = [];
            for (let i = 0; i < entity.data.formList.length; i++) {
                nameList.push(entity.data.formList[i].title);
                carouselHtml += '<button class="glide__bullet" data-glide-dir="=' + i + '" />';
            }
            carouselHtml += ' </div >' +
                '</div>' +
                ' <script>' +
                'var ' + entity.data.id + ' = new Glide("#pre' + entity.data.id + '",{perView:1,type:"carousel",bound:true,rewind:false}).mount();' + entity.data.id + '.on("run",() => {const nameList = [' + nameList.map(name => `"${name}"`) + '];window.ReactNativeWebView.postMessage(JSON.stringify({ spotLightName: nameList[' + entity.data.id + '.index], spotLightIndex: ' + entity.data.id + '.index.toString(),spotLightTotal: ' + entity.data.formList.length + '}))});'
            if (!preview) {
                carouselHtml += 'if(document.getElementById("scroll' + entity.data.id + '")){' +
                    'document.getElementById("scroll' + entity.data.id + '").addEventListener("touchstart", function(event) {' +
                    'window.ReactNativeWebView.postMessage(JSON.stringify({ data: "touchstart" }));' +
                    'var touch = event.targetTouches[0];' +
                    'startPos = {x:touch.pageX,y:touch.pageY};' +
                    'isScrolling = 0;' +
                    '});' +
                    'document.getElementById("scroll' + entity.data.id + '").addEventListener("touchmove", function(ev) {' +
                    'var touch = ev.targetTouches[0];' +
                    'endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};' +
                    'isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;' +
                    'if(isScrolling === 0){' +
                    'ev = ev || event;' +
                    'ev.stopPropagation();' +
                    'ev.preventDefault();' +
                    'window.ReactNativeWebView.postMessage(JSON.stringify({ data: "touchmove" }));' +
                    '}else{' + entity.data.id + '.disable();}' +
                    '},{passive: false});' +
                    'document.getElementById("scroll' + entity.data.id + '").addEventListener("touchend", function(event) {' +
                    'window.ReactNativeWebView.postMessage(JSON.stringify({ data: "touchend" }));' + entity.data.id + '.enable();' +
                    '})' +
                    '}';
            }
            carouselHtml += '</script>';
            return carouselHtml;
        }
        if (entity.type === "HEADERIMAGE") {
            return '<div class="headerImage" style="text-align:center;width:100%;height:' + entity.data.height + ";background-image:url(" + entity.data.img + ');background-size:100% 100%">' +
                '<div style="box-sizing:border-box;padding:' + entity.data.name.top + "px " + entity.data.name.right + "px " + entity.data.name.bottom + "px " + entity.data.name.right + "px;letter-spacing:" + entity.data.name.letterSpacing + "px;font-size:" + entity.data.name.fontSize + "px;line-height:" + entity.data.name.lineHeight + "px;font-family:" + entity.data.name.fontFamily + ";color:" + entity.data.name.color + '">' + entity.data.name.data + '</div>' +
                '<div style="box-sizing:border-box;padding:' + entity.data.shortDesc.top + "px " + entity.data.shortDesc.right + "px " + entity.data.shortDesc.bottom + "px " + entity.data.shortDesc.right + "px;letter-spacing:" + entity.data.shortDesc.letterSpacing + "px;font-size:" + entity.data.shortDesc.fontSize + "px;line-height:" + entity.data.shortDesc.lineHeight + "px;font-family:" + entity.data.shortDesc.fontFamily + ";color:" + entity.data.shortDesc.color + '">' + entity.data.shortDesc.data + '</div>' +
                '</div>'
        }
        if (entity.type === "VIDEO") {
            return '<video style="position:relative;z-index:10;" alt="' + entity.data.alt + '" id="video" width="375" height="' + entity.data.height + '" controls loop src="' + entity.data.src + '"  x5-video player-type="h5" x-video-player-fullscreen="true" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true"></video > '
        }
        if (entity.type === "IMAGE") {
            // return '<section style="text-align: center' + ";width:375px" + ";background:"+ entity.data.background + '"><img src="' + entity.data.src + '" alt="' + entity.data.alt + '" style="float:' + (entity.data.alignment || "none") + ";height: " + entity.data.height + ";min-width: " + entity.data.width + ";background:"+ entity.data.background +'"/></section>';
            // return '<img src="' + entity.data.src + '" alt="' + entity.data.alt + '" style="float:' + (entity.data.alignment || "none") + ";height: " + entity.data.height + ";min-width: " + entity.data.width + ";background:"+ entity.data.background + ";padding:"+ entity.data.padding +'"/>';
            return '<img src="' + entity.data.src + '" alt="' + entity.data.alt + '" style="float:' + (entity.data.alignment || "none") + ";background:" + entity.data.background + ";height: " + entity.data.height + ";box-sizing: border-box;width:100%;padding:" + entity.data.padding + '"/>';
        }
        if (entity.type === "EMBEDDED_LINK") {
            return '<iframe width="' + entity.data.width + '" height="' + entity.data.height + '" src="' + entity.data.src + '" frameBorder="0"></iframe>';
        }
        return text;
    }

    /**
     * For a given section in a block the function will return a further list of sections,
     * with similar inline styles applicable to them.
     */
    function getInlineStyleSections(block, styles, start, end) {
        var styleSections = [];
        var text = block.text;

        if (text.length > 0) {
            var inlineStyles = getStyleArrayForBlock(block);
            var section = void 0;
            for (var i = start; i < end; i += 1) {
                if (i !== start && sameStyleAsPrevious(inlineStyles, styles, i)) {
                    section.text.push(text[i]);
                    section.end = i + 1;
                } else {
                    section = {
                        styles: getStylesAtOffset(inlineStyles, i),
                        text: [text[i]],
                        start: i,
                        end: i + 1,
                    };
                    styleSections.push(section);
                }
            }
        }
        return styleSections;
    }

    /**
     * Replace leading blank spaces by &nbsp;
     */
    function trimLeadingZeros(sectionText) {
        if (sectionText) {
            var replacedText = sectionText;
            for (var i = 0; i < replacedText.length; i += 1) {
                if (sectionText[i] === " ") {
                    replacedText = replacedText.replace(" ", "&nbsp;");
                } else {
                    break;
                }
            }
            return replacedText;
        }
        return sectionText;
    }

    /**
     * Replace trailing blank spaces by &nbsp;
     */
    function trimTrailingZeros(sectionText) {
        if (sectionText) {
            var replacedText = sectionText;
            for (var i = replacedText.length - 1; i >= 0; i -= 1) {
                if (replacedText[i] === " ") {
                    replacedText = replacedText.substring(0, i) + "&nbsp;" + replacedText.substring(i + 1);
                } else {
                    break;
                }
            }
            return replacedText;
        }
        return sectionText;
    }

    /**
     * The method returns markup for section to which inline styles
     * like BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE, SUPERSCRIPT, SUBSCRIPT are applicable.
     */
    function getStyleTagSectionMarkup(styleSection) {
        var styles = styleSection.styles,
            text = styleSection.text;

        var content = getSectionText(text);
        forEach(styles, function (style, value) {
            content = addInlineStyleMarkup(style, content, value);
        });
        return content;
    }

    /**
* The method returns markup for section to which inline styles
like color, background-color, font-size are applicable.
*/
    function getInlineStyleSectionMarkup(block, styleSection) {
        var styleTagSections = getInlineStyleSections(block, ["BOLD", "ITALIC", "UNDERLINE", "STRIKETHROUGH", "CODE", "SUPERSCRIPT", "SUBSCRIPT"], styleSection.start, styleSection.end);
        var styleSectionText = "";
        styleTagSections.forEach(function (stylePropertySection) {
            styleSectionText += getStyleTagSectionMarkup(stylePropertySection);
        });
        styleSectionText = addStylePropertyMarkup(styleSection.styles, styleSectionText);
        return styleSectionText;
    }

    /*
     * The method returns markup for an entity section.
     * An entity section is a continuous section in a block
     * to which same entity or no entity is applicable.
     */
    function getSectionMarkup(block, entityMap, section, customEntityTransform) {
        var entityInlineMarkup = [];
        var inlineStyleSections = getInlineStyleSections(block, ["COLOR", "BGCOLOR", "FONTSIZE", "FONTFAMILY"], section.start, section.end);
        inlineStyleSections.forEach(function (styleSection) {
            entityInlineMarkup.push(getInlineStyleSectionMarkup(block, styleSection));
        });
        var sectionText = entityInlineMarkup.join("");
        if (section.type === "ENTITY") {
            if (section.entityKey !== undefined && section.entityKey !== null) {
                sectionText = getEntityMarkup(entityMap, section.entityKey, sectionText, customEntityTransform); // eslint-disable-line max-len
            }
        } else if (section.type === "HASHTAG") {
            sectionText = '<a href="' + sectionText + '" class="wysiwyg-hashtag">' + sectionText + "</a>";
        }
        return sectionText;
    }

    /**
     * Function will return the markup for block preserving the inline styles and
     * special characters like newlines or blank spaces.
     */
    function getBlockInnerMarkup(block, entityMap, hashtagConfig, customEntityTransform) {
        var blockMarkup = [];
        var sections = getSections(block, hashtagConfig);
        sections.forEach(function (section, index) {
            var sectionText = getSectionMarkup(block, entityMap, section, customEntityTransform);
            if (index === 0) {
                sectionText = trimLeadingZeros(sectionText);
            }
            if (index === sections.length - 1) {
                sectionText = trimTrailingZeros(sectionText);
            }
            blockMarkup.push(sectionText);
        });
        return blockMarkup.join("");
    }

    /**
     * Function will return html for the block.
     */
    function getBlockMarkup(block, entityMap, hashtagConfig, directional, customEntityTransform, preview) {
        var blockHtml = [];
        if (isAtomicEntityBlock(block)) {
            blockHtml.push(getEntityMarkup(entityMap, block.entityRanges[0].key, undefined, customEntityTransform, preview));
        } else {
            var blockTag = getBlockTag(block.type);
            if (blockTag) {
                blockHtml.push("<" + blockTag);
                var blockStyle = getBlockStyle(block.data);
                if (blockStyle) {
                    blockHtml.push(' style="' + blockStyle + '"');
                }
                if (directional) {
                    blockHtml.push(' dir = "auto"');
                }
                blockHtml.push(">");
                blockHtml.push(getBlockInnerMarkup(block, entityMap, hashtagConfig, customEntityTransform));
                blockHtml.push("</" + blockTag + ">");
            }
        }
        blockHtml.push("\n");
        return blockHtml.join("");
    }

    /**
     * Function to check if a block is of type list.
     */
    function isList(blockType) {
        return blockType === "unordered-list-item" || blockType === "ordered-list-item";
    }

    /**
     * Function will return html markup for a list block.
     */
    function getListMarkup(listBlocks, entityMap, hashtagConfig, directional, customEntityTransform) {
        var listHtml = [];
        var nestedListBlock = [];
        var previousBlock = void 0;
        listBlocks.forEach(function (block) {
            var nestedBlock = false;
            if (!previousBlock) {
                listHtml.push("<" + getBlockTag(block.type) + ">\n");
            } else if (previousBlock.type !== block.type) {
                listHtml.push("</" + getBlockTag(previousBlock.type) + ">\n");
                listHtml.push("<" + getBlockTag(block.type) + ">\n");
            } else if (previousBlock.depth === block.depth) {
                if (nestedListBlock && nestedListBlock.length > 0) {
                    listHtml.push(getListMarkup(nestedListBlock, entityMap, hashtagConfig, directional, customEntityTransform));
                    nestedListBlock = [];
                }
            } else {
                nestedBlock = true;
                nestedListBlock.push(block);
            }
            if (!nestedBlock) {
                listHtml.push("<li");
                var blockStyle = getBlockStyle(block.data);
                if (blockStyle) {
                    listHtml.push(' style="' + blockStyle + '"');
                }
                if (directional) {
                    listHtml.push(' dir = "auto"');
                }
                listHtml.push(">");
                listHtml.push(getBlockInnerMarkup(block, entityMap, hashtagConfig, customEntityTransform));
                listHtml.push("</li>\n");
                previousBlock = block;
            }
        });
        if (nestedListBlock && nestedListBlock.length > 0) {
            listHtml.push(getListMarkup(nestedListBlock, entityMap, hashtagConfig, directional, customEntityTransform));
        }
        listHtml.push("</" + getBlockTag(previousBlock.type) + ">\n");
        return listHtml.join("");
    }

    /**
     * The function will generate html markup for given draftjs editorContent.
     */
    function draftToHtml(editorContent, preview, hashtagConfig, directional, customEntityTransform, ) {
        var html = [];
        if (editorContent) {
            var blocks = editorContent.blocks,
                entityMap = editorContent.entityMap;

            if (blocks && blocks.length > 0) {
                var listBlocks = [];
                blocks.forEach(function (block) {
                    if (isList(block.type)) {
                        listBlocks.push(block);
                    } else {
                        if (listBlocks.length > 0) {
                            var listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, customEntityTransform); // eslint-disable-line max-len
                            html.push(listHtml);
                            listBlocks = [];
                        }
                        var blockHtml = getBlockMarkup(block, entityMap, hashtagConfig, directional, customEntityTransform, preview);
                        html.push(blockHtml);
                    }
                });
                if (listBlocks.length > 0) {
                    var listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, directional, customEntityTransform); // eslint-disable-line max-len
                    html.push(listHtml);
                    listBlocks = [];
                }
            }
        }
        return html.join("");

    }

    return draftToHtml;
});
