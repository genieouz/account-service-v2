import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { google } from "googleapis";
import { AnalyticsRepository } from "./repository";
import { AnalyticsController } from "./resolvers/analytics.resolver";
import { AnalyticsService, clientId, clientSecret, refreshToken } from "./services/analytics.service";

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsRepository])],
  providers: [
    AnalyticsController,
    AnalyticsService,
    {
      provide: "OAuthClient",
      useFactory: () => {
        const OAuthClient = new google.auth.OAuth2(clientId, clientSecret);
        OAuthClient.setCredentials({ refresh_token: refreshToken });
        return OAuthClient;
      }
    }
  ]
})
export class AnalyticsModule {}
