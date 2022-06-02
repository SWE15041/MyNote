export const px2vh = (n: number) => `${(n / 1024) * 100}vh`;
export const px2vw = (n: number) => `${(n / 1440) * 100}vw`;

export const mpx2vw = (n: number) => `${(n / 375) * 100}vw`;

export const textEllipsisOneLine = {overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"};
export const textEllipsisMultipleLine = (line: number) => {
    return {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: `${line}`,
        WebkitBoxOrient: "vertical",
    };
};
