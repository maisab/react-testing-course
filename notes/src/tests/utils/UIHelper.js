export async function getInnerText(page, toSelect) {
  return page.evaluate(function (item) {
    const selectedItem = document.querySelector(item);
    return selectedItem ? selectedItem.innerText : undefined;
  }, toSelect);
}

export async function getText(page, pos) {
    console.log(page)
  return page.find(".btn").at(pos).text();
}
