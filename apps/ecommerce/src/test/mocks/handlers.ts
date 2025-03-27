import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://restcountries.com/v3.1/region/americas",
    (req, res, ctx) => {
      return res(
        ctx.json([
          { name: { common: "Argentina" } },
          { name: { common: "Brasil" } },
          { name: { common: "Chile" } },
        ])
      );
    }
  ),
];
