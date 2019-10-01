import {Router} from 'express';

export type Wrapper = (router: Router) => void;
