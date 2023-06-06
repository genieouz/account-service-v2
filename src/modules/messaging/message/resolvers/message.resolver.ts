import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SendMessageInput } from "../dto/create-message.input";
import { FetchMessageQuery } from "../dto/fetch-message.input";
import { Message, PaginatedFetchMessage } from "../schema/message.schema";
import { MessageService } from "../services/message.service";

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message, { name: "sendMessage" })
  sendMessage(@Args("input") input: SendMessageInput) {
    return this.messageService.sendMessage(input);
  }

  @Query(() => PaginatedFetchMessage, { name: "getAllMessages" })
  findAll(@Args("query", { nullable: true }) query: FetchMessageQuery) {
    return this.messageService.findAll(query || {});
  }

  @Query(() => Message, { name: "getMessage" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  removeMessage(@Args("id", { type: () => ID }) id: string) {
    return this.messageService.delete(id);
  }

  @Mutation(() => Message)
  resendMessage(@Args("uid", { type: () => ID }) uid: string) {
    return this.messageService.resendMessage(uid);
  }
}
