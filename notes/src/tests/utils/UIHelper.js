export const getBtnText = (page = null, pos) => page.find(".btn").at(pos).text();
export const clickBtn = (page = null, pos) => page.find(".btn").at(pos).simulate("click");

export const getText = (page, type) => page.find(type).text();

