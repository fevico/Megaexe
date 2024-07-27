import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import formidable, { File, Files } from 'formidable';
import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      files: { [key: string]: File | File[] };
      fields: { [key: string]: any };
    }
  }
}

@Injectable()
export class FormidableMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const form = formidable({ keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      if (!req.body) req.body = {};
      for (const key in fields) {
        if (Array.isArray(fields[key])) {
          req.body[key] = fields[key][0]; // Take the first element if it's an array
        } else {
          req.body[key] = fields[key];
        }
      }
      req.files = files;

      next();
    });
  }
}
