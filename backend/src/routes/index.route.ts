import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, (req, res) => {
      res.status(200).send({ message: 'Welcome to the API!' });
    });
  }
}

export default IndexRoute;
