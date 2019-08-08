import {Request, Response} from "express";
import {Route} from '../../core';
import {getPlacesByName} from "./SearchController";
import {checkSearchParams} from "../../middleware/checks";

export const routes: Route[] = [
  {
    path: "/search",
    method: "get",
    handler: [checkSearchParams,
      async ({query}: Request, res: Response) => {
        const result = await getPlacesByName(query.q);
        res.status(200).send(result);
      }
    ]
  }
];
