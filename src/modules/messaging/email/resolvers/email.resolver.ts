import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FetchEmailQuery } from "../dto/fetch-email.input";
import { SendEmailInput } from "../dto/send-email.input";
import { Email, FetchEmailResponse } from "../schema/email.schema";
import { EmailService } from "../services/email.service";

@Resolver(() => Email)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Email)
  sendEmail(@Args("input") input: SendEmailInput) {
    return this.emailService.sendEmail(input);
  }

  @Query(() => FetchEmailResponse, { name: "getAllEmails", nullable: true })
  findAll(@Args("query") query: FetchEmailQuery) {
    return this.emailService.findAll(query || {});
  }

  @Query(() => Email, { name: "getEmail" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.emailService.findOne(id);
  }

  @Mutation(() => Email)
  deleteEmail(@Args("id", { type: () => ID }) id: string) {
    return this.emailService.delete(id);
  }
  @Mutation(() => Email)
  resendEmail(@Args("uid") id: string) {
    return this.emailService.resendEmail(id);
  }
}
