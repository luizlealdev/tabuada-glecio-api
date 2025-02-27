import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.enableCors({
      origin: '*',
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
      allowedHeaders:
         'Origin, Authorization, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
   });

   await app.listen(3000);
}
bootstrap();
