const base64HeaderReg = /data:image\/.{3,4};base64,/

export const getBase64 = (str: string) => {
    return str.replace(base64HeaderReg, "")
}

export const getImgTypeByBase64 = (str: string) => {
    const res = str.match(base64HeaderReg)
    if (res) {
        return res[0].replace("data:", "").replace(";base64,", "")
    } else {
        return ""
    }
}

export const getBlob = (str: string) => {
    str = getBase64(str)
    const bstr = atob(str)
    let len = bstr.length
    const u8 = new Uint8Array(len)
    while (len--) {
        u8[len] = bstr.charCodeAt(len)
    }
    const blob = new Blob([u8], { type: "png" })
    return URL.createObjectURL(blob)
}

export const getContainedImageSize = (container: HTMLElement, image: HTMLImageElement) => {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    const containerAspect = containerWidth / containerHeight;
    const imageAspect = imageWidth / imageHeight;

    if (containerAspect > imageAspect) {
        // 图片被包含在容器内，高度撑满，宽度计算
        return {
            width: containerHeight * imageAspect,
            height: containerHeight
        };
    } else {
        // 图片被包含在容器内，宽度撑满，高度计算
        return {
            width: containerWidth,
            height: containerWidth / imageAspect
        };
    }
}

export const getMaxContainSize = (width: number, height: number) => {
    if(width >= height) {
        return {
            width: width,
            height: width
        }
    } else {
        return {
            width: height,
            height: height
        }
    }
}