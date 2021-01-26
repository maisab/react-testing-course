export const getBtnText = (page = null, pos) =>
  page.find(".btn").at(pos).text();

export const getText = (page, type) => page.find(type).text();

export const getTextAt = (page, type, pos) => page.find(type).at(pos).text();

export const getLength = (page, type) => page.find(type).length;

export function getMockServer(fakeServer, props, clues) {
  const server = fakeServer.create();
  server.respondWith(
    "GET",
    `http://jservice.io/api/clues?category=${props.category.id}`,
    [200, { "Content-Type": "application/json" }, JSON.stringify(clues)]
  );

  return server;
}
