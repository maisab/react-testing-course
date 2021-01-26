export const getText = (page, type) => page.find(type).text();

export const getTextAt = (page, type, pos) => page.find(type).at(pos).text();

export const getLength = (page, type) => page.find(type).length;

export const clickAt = (page, type, pos) => page.find(type).at(pos).simulate("click")

export const findAt = (page, type, pos) => page.find(type).at(pos)
