import statsRouter from './routes/stats.router';
import lessonsRouter from './routes/lessons.router';
import filesRouter from './routes/course-files.router';
import bodyParser from 'body-parser';

export const applyRoutes = (app) => {
  app.use(bodyParser.json());
  app.use('/stats', statsRouter);
  app.use('/lessons', lessonsRouter);
  app.use('/files', filesRouter);
}