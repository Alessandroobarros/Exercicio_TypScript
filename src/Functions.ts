
export const capitalize = (text: string) => {
    const words = text.split(' ')

    for (let i = 0; i < words.length; i++) {
        words[i] =
            words[i].substr(0, 1).toUpperCase() +
            words[i].substr(1).toLowerCase()
    }

    return words.join(' ')
}

export const trimAll = (text: string) => text.trim().replace(/\s+/g, ' ')


export const  slugify = (text: string) => {
let slug = text.replace(/ da /gi, ' da ')
.replace(/ de /gi, ' de ')
.replace(/ do /gi, ' do ')
.replace(/ das /gi, ' das ')
.replace(/ dos /gi, ' dos ')
.replace(/ e /gi, ' e ')
return slug
}
